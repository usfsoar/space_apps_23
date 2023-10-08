import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';


class Rendering {

    constructor(){
        

        // global variables
    this.scene;
    this.camera;    
    this.renderer;
    const canvas = document.querySelector('.webgl');
    this.points_data;
    this.load_points_json('nakamura.json');
    
    
    // scene setup
    this.scene = new THREE.Scene();

    // this.camera setup
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 100;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 2;
    this.scene.add(this.camera);

    // renderer setup
    this.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    this.renderer.autoClear = false;
    this.renderer.setClearColor(0x000000, 0.0);

    // orbit control setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // earth geometry
    const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

    // earth material
    this.earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: THREE.ImageUtils.loadTexture('texture/moonmap.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('texture/moonbump.png'),
        bumpScale: 0.1
    });

    // earth mesh
    this.earthMesh = new THREE.Mesh(earthGeometry, this.earthMaterial);
    this.scene.add(this.earthMesh);

    // galaxy geometry
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // galaxy material
    const starMaterial = new THREE.MeshBasicMaterial({
        map : THREE.ImageUtils.loadTexture('texture/galaxy.png'),
        side: THREE.BackSide
    });

    // galaxy mesh
    this.starMesh = new THREE.Mesh(starGeometry, starMaterial);
    this.scene.add(this.starMesh);

    // ambient light
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientlight);

    // point light
    const pointLight = new THREE.PointLight(0xffffff, 1)

    //change position of the this.camera, it always point towards the moon
    pointLight.position.set(-5, 3, 5);
    this.scene.add(pointLight);

    // point light helper
    const Helper = new THREE.PointLightHelper(pointLight);
    this.scene.add(Helper);

    // handling resizing
    window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }, false);


    //point 

    const axesHelper = new THREE.AxesHelper( 1 );
    this.scene.add( axesHelper );

 

    // current fps
    this.stats = Stats();

    }

    create_point2(py,px,colors){ 
        const pointGeo = new THREE.SphereGeometry(0.02, 20, 20);
        const pointMat = new THREE.MeshPhongMaterial({color:colors});
        this.pointMesh = new THREE.Mesh(pointGeo, pointMat);

        let lng = (py) * Math.PI / 180 ;
        let lat = (px) * Math.PI/ 180 ;

        let x;
        let y;
        let z;

        console.log(py,px)

            x = (1)*0.6*Math.cos(lng) * Math.sin(lat);
            y = (1)*0.6*Math.sin(lng);
            z = (1)*0.6*Math.cos(lat) * Math.cos(lng);


        console.log(x,y,z)
            
        this.pointMesh.position.set(x,y,z);
        

        this.scene.add(this.pointMesh);    
    };


    create_point3(px,py,colors){ 
        const pointGeo = new THREE.SphereGeometry(0.02, 20, 20);
        const pointMat = new THREE.MeshPhongMaterial({color:colors});
        this.pointMesh = new THREE.Mesh(pointGeo, pointMat);

        let lng = (py) * Math.PI / 180 ;
        let lat = (px) * Math.PI/ 180 ;


        console.log(py,px)

        // Flattening factor for a perfect sphere (assuming f = 0)
        const f = 0;

        // Calculate geocentric latitude (ls)
        const ls = Math.atan((1 - f)**2 * Math.tan(lat));

        // Calculate ECEF coordinates
        let x = 1 * Math.cos(ls) * Math.cos(lng) + 1 * Math.cos(lat) * Math.cos(lng);
        let y = 1 * Math.cos(ls) * Math.sin(lng) + 1 * Math.cos(lat) * Math.sin(lng);
        let z = 1 * Math.sin(ls) + 1 * Math.sin(lat);

        // Return the ECEF coordinates as an object

        console.log(x,y,z)
        
        this.pointMesh.position.set(x*0.3,y*0.3,z*0.3);
        

        this.scene.add(this.pointMesh);    
    };

    async load_points_json(filename){
        let res = await fetch(filename);
        if (!res.ok){
            throw new Error('Server didnt respond');
        }
        this.points_data = await res.json();
        console.log(this.points_data);
    }
    
    setRotation(x) {
        this.rotate_value = x;
    }
    
    change_texture(a,b) {
        a = "texture/" + a.toString()

        b = "texture/" + b.toString()
        console.log(a,b)
        this.earthMaterial.map = THREE.ImageUtils.loadTexture(a)    
        this.earthMaterial.bumpmap = THREE.ImageUtils.loadTexture(b);


    };


    /*
    create_point(a) {

        
        let pointGeo = new THREE.SphereGeometry(0.005, 20, 20)
        let pointMat = new THREE.MeshPhongMaterial({color:0xff0000});
        let pointMesh = new THREE.Mesh(pointGeo, pointMat);

        let lat = coordinates[a].x * Math.PI / 180 ;
        let lng = coordinates[a].y * Math.PI / 180 ;

        let x = 0.6*Math.cos(lng) * Math.sin(lat);
        let y = 0.6*Math.sin(lng) * Math.sin(lat);
        let z = 0.6*Math.cos(lat);
        
        pointMesh.position.set(x, y, z)
        
        this.scene.add(pointMesh);

    }
    
    */

    // spinning animation
    animate = () => {
        requestAnimationFrame(this.animate);
        //this.starMesh.rotation.y -= 0.002;
        //this.earthMesh.rotation.y += 0.0015;

        if (this.rotate_value != 0) {
            this.earthMesh.rotation.y += this.rotate_value; // Adjust the rotation speed as needed
        }


        this.controls.update();
        this.render();
        this.stats.update();
    };


    // rendering
    render = () => {
       
        this.renderer.render(this.scene, this.camera);
    }

    
};  




let rendering = new Rendering();
rendering.setRotation(0);
rendering.animate();

setTimeout(() => {
    //rendering.setRotation(-0.001);
    console.log("start rotation");
    let coordinates = rendering.points_data.map(x=>({x:x.Long, y:x.Lat}));
    console.log(coordinates)
    console.log(coordinates[1].x);
    
    rendering.create_point2(     
        90,90
        , "#7FFFD4"
        )

    rendering.create_point2(    
        0,90, "#FFA500"
        )
    
    rendering.create_point2(     
        0,0, "#0000FF"
        )
    
        
    // rendering.create_point2(     
    //    -33, 330, "#FFFFFF"
    //    )

    // rendering.create_point2(     
    //     24,146, "#FFFFFF"
    // )

    // rendering.create_point2(     
    //     -21.25, 130, "#FFFFFF"
    //     )

    // rendering.create_point2(     
    //     54, 290, "#FFFFFF"
    //     )
        
    
    

    for (let i = 0; i < coordinates.length; i++) {

        console.log(i);
        rendering.create_point2(coordinates[i].x,coordinates[i].y)
        
    }



    //rendering.create_point(coordinates)

    rendering.change_texture("moonmap.png","moonbump.png");
    //rendering.change_texture("earthmap1k2.jpg","earthbump.jpg");

    //console.log(capitals.CountryName)


}, 1000);

