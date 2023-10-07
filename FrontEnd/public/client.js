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
    pointLight.position.set(5, 3, 5);
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

    // current fps
    this.stats = Stats();


    }

    
    setRotation(x) {
        this.rotate_value = x;
    }
    
    changetexture(x) {
        if (x == 0){
            this.earthMaterial.bumpMap = THREE.ImageUtils.loadTexture('texture/earthbump.png')
        }
        

    }

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
    rendering.setRotation(-0.001);
    console.log("start rotation");

}, 3000);