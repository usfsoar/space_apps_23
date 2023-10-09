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
    this.earthMesh.layers.set(0);
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
    //const Helper = new THREE.PointLightHelper(pointLight);
    //this.scene.add(Helper);

    // handling resizing
    window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }, false);


    //point 

    // const axesHelper = new THREE.AxesHelper( 1 );
    // this.scene.add( axesHelper );

 
    const mainLayer = 0;  // default layer
    const overlayLayer = 1;  // special layer for non-occluded object

    this.camera.layers.set(mainLayer);  // view main layer
    this.camera.layers.enable(overlayLayer);  // also view overlay layer
    // current fps
    this.stats = Stats();

    }

    create_point2(py, px, colors, text="") {
    const pointGeo = new THREE.SphereGeometry(0.02, 20, 20);
    const pointMat = new THREE.MeshPhongMaterial({ color: colors });
    this.pointMesh = new THREE.Mesh(pointGeo, pointMat);

    let lng = (py) * Math.PI / 180;
    let lat = (px) * Math.PI / 180;
    let x = (1) * 0.6 * Math.cos(lng) * Math.sin(lat);
    let y = (1) * 0.6 * Math.sin(lng);
    let z = (1) * 0.6 * Math.cos(lat) * Math.cos(lng);

    this.pointMesh.position.set(x, y, z);

    this.scene.add(this.pointMesh);
    const loader = new THREE.FontLoader();
    if (text != ""){
    loader.load('Orbitron_Regular.json', (font) => {
        const geometry = new THREE.TextGeometry(text, {
            font: font,
            size: 0.015,
            height: 0.00001
        });


        // Create a bounding box for the text geometry to get its size
        const box = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
        const textSize = box.getSize(new THREE.Vector3());
        

        const textMaterial = [
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                emissive: 0xffffff  // Emitting a light
            }),
        ];
        const textMesh = new THREE.Mesh(geometry, textMaterial);
        // Adjust position based on the text's bounding box size
        textMesh.position.y = y + 0.02;
        textMesh.position.x = x + 0.03;
        textMesh.position.z = z;

        textMesh.layers.set(1);  // Display in overlay layer
        // Create a rectangle background based on the text size
        const backgroundGeometry = new THREE.PlaneGeometry(textSize.x + 0.1, textSize.y + 0.01);
        const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x000001 }); // Change color as needed
        const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
        backgroundMesh.position.y = y;
        backgroundMesh.position.x = textMesh.position.x + 0.05 + (textSize.x / 2);  // Adjust position based on the text's bounding box size
        backgroundMesh.position.z = z - 0.001; // Position it slightly behind the text
        backgroundMesh.layers.set(1);  // Display in overlay layer

        backgroundMesh.lookAt(this.camera.position)
        textMesh.lookAt(this.camera.position)

        backgroundMesh.quaternion.copy(this.camera.quaternion)
        this.scene.add(backgroundMesh);
        this.scene.add(textMesh);
    });
    }

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
    
    // change_texture(a,b) {
    //     a = "texture/" + a.toString()

    //     b = "texture/" + b.toString()
    //     console.log(a,b)
    //     this.earthMaterial.map = THREE.ImageUtils.loadTexture(a)    
    //     this.earthMaterial.bumpmap = THREE.ImageUtils.loadTexture(b);


    // };
    change_texture(a, b) {
    // Assuming a and b are base64 encoded data URLs
    let textureLoader = new THREE.TextureLoader();

    this.earthMaterial.map = textureLoader.load(a);
    this.earthMaterial.bumpmap = textureLoader.load(b);
}




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


export {Rendering};

//let rendering = new Rendering();
//rendering.setRotation(0);
//rendering.animate();
//
//setTimeout(() => {
//    //rendering.setRotation(-0.001);
//    console.log("start rotation");
//    let coordinates = rendering.points_data.map(x=>({x:x.Long, y:x.Lat}));
//    console.log(coordinates)
//    console.log(coordinates[1].x);
//    
//    rendering.create_point2(     
//        90,90
//        , "#7FFFD4"
//        )
//
//    rendering.create_point2(    
//        0,90, "#FFA500"
//        )
//    
//    rendering.create_point2(     
//        0,0, "#0000FF"
//        )
//    for (let i = 0; i < coordinates.length; i++) {
//
//        console.log(i);
//        rendering.create_point2(coordinates[i].x,coordinates[i].y)
//        
//    }
//    rendering.change_texture("moonmap.png","moonbump.png");
//
//}, 1000);

