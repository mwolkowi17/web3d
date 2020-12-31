import * as THREE from 'three';

const fov = 30;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 100;
export const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 5, 28);