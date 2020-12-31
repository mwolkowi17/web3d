import _ from 'lodash';
import * as THREE from 'three';
//import * as OBJLoader from 'three-obj-loader';
import * as OrbitControls from 'three-orbitcontrols';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import {light} from './lightbase';
import {light2} from './lightdirect';
import {camera} from './camerabase';

//let mtlLoader = new MTLLoader();



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
    renderer.setClearColor(0x000000, 0);
    

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.enableZoom = false;
    //controls.maxPolarAngle=1.57;
    //controls.minPolarAngle=1.57;
    controls.enablePan = false;
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
    
        camera.add(light);
        scene.add(camera);
   
        scene.add(light2);
        scene.add(light2.target);
    

    {
        const loadingElem = document.querySelector('#loading');
        const progressBarElem = loadingElem.querySelector('.progressbar');
        const loadManager = new THREE.LoadingManager();

        const objLoader = new OBJLoader(loadManager);
        const mtlLoader = new MTLLoader();
        let tytul = 'carbon1.mtl'

        //loadingElem.style.display = 'none';
        mtlLoader.load(tytul, (materials) => {
            //materials.depthWrite = false;
            //materials.side = THREE.BackSide;
            //materials.side = THREE.FrontSide;
            materials.preload()
            objLoader.setMaterials(materials);
            objLoader.load('carbon1.obj', (object) => {

                scene.add(object);
            });
        });
        loadManager.onLoad = () => {
            loadingElem.style.display = 'none';
        }
        loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
            const progress = itemsLoaded / itemsTotal;
            progressBarElem.style.transform = `scaleX(${progress})`;
        };


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
