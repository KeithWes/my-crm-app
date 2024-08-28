import * as THREE from 'three';

// Szene erstellen
const scene = new THREE.Scene();

// Kamera erstellen
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer erstellen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Einfache Box hinzufügen
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animationsfunktion
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();




import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // GLTFLoader importieren

// Szene erstellen
const scene = new THREE.Scene();

// Kamera erstellen
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer erstellen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLTF Loader verwenden
const loader = new GLTFLoader();
loader.load('path/to/your/model.glb', function (gltf) {
    scene.add(gltf.scene); // Das Modell zur Szene hinzufügen
}, undefined, function (error) {
    console.error('Ein Fehler ist beim Laden des Modells aufgetreten:', error);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('path/to/your/model.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    
    // Markiere das Modell als Upsell-Option
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.color.set(0xff0000); // Rot färben für Upsell
        }
    });
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
