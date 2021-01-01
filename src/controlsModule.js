import * as OrbitControls from 'three-orbitcontrols';
import {camera} from './camerabase';

const controlRotation = true;
const canvas = document.querySelector('#c');
export const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.enableZoom = false;
    //controls.maxPolarAngle=1.57;
    //controls.minPolarAngle=1.57;
    controls.enablePan = false;
    controls.autoRotate = controlRotation; // autorotate control