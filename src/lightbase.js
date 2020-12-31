import * as THREE from 'three';

const skyColor = "whitesmoke"; // light blue
const groundColor = "dimgrey"; // brownish orange
const intensity = 3.5;

export const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

//camera.add(light);
//scene.add(camera);