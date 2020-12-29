import _ from 'lodash';
import * as THREE from 'three';
//import * as OBJLoader from 'three-obj-loader';
import * as OrbitControls from 'three-orbitcontrols';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader();
 


'use strict';

/* global THREE */
var controlRotation = true; // variable controling rotation



function main() {
    const canvas = document.querySelector('#c');
    const heightRatio = 1;
    canvas.height = canvas.width * heightRatio;
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
         alpha: true
    });
    renderer.setClearColor( 0x000000, 0 );
    const fov = 30;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 5, 28);
   

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.enableZoom=false;
    //controls.maxPolarAngle=1.57;
    //controls.minPolarAngle=1.57;
    controls.enablePan=false;
    controls.autoRotate = controlRotation; // autorotate control
    controls.update(true);

    const scene = new THREE.Scene();
    //scene.background = new THREE.Color(''); //background color
    // mouse down test;
    canvas.addEventListener('mousedown', onMouseDown);
    //option to start rotation
    //window.addEventListener('mouseup', onMouseUp);

    function onMouseDown() {
         controls.autoRotate = false;
        
    }

   
    {
        const planeSize = 0.01;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    {
        const skyColor = "whitesmoke"; // light blue
        const groundColor = "dimgrey"; // brownish orange
        const intensity = 3.5;

        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

        camera.add(light);
        scene.add(camera);
        
    }

    {
        const color = 0xFFFFFF;
        const intensity = 0.07;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }

    {
        const objLoader = new OBJLoader();
        const mtlLoader = new MTLLoader();
        let tytul = 'carbon1.mtl'
        mtlLoader.load(tytul,  (materials) => {
            //materials.depthWrite = false;
            //materials.side = THREE.BackSide;
            //materials.side = THREE.FrontSide;
            materials.preload()
            objLoader.setMaterials(materials);
            objLoader.load('carbon1.obj', (object) => {
               
                scene.add(object);
            });
        });


    }


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);

    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.sortObjects = false;
        
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
    animate();
}

main();
