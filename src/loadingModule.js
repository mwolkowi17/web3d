import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';

export const loadManager = new THREE.LoadingManager();

export const objLoader = new OBJLoader(loadManager);
export const mtlLoader = new MTLLoader();
