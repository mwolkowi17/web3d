import * as THREE from 'three';

const color = 0xFFFFFF;
const intensity = 0.07;
export const light2 = new THREE.DirectionalLight(color, intensity);
light2.position.set(0, 10, 0);
light2.target.position.set(-5, 0, 0);