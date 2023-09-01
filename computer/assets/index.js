console.log('index.js loaded')

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let controls

let objToRender = 'ASUS-Laptop'

const loader = new GLTFLoader();

var loadingElement = document.getElementById('loading');
var loadingSpin = document.getElementsByClassName('loading-spin');
var loadingText = document.getElementById('loading-text');
loader.load(
    // resource URL
    `assets/models/${objToRender}.glb`,

    // called when the resource is loaded
    function (gltf) {

        object = gltf.scene;
        object.scale.set(1.5, 1.5, 1.5)
        object.position.set(0, 0, 0)
        scene.add(object);

    },

    // called while loading is progressing
    function (xhr) {
        let percentComplete = xhr.loaded / xhr.total * 100;
        console.log( percentComplete + '% loaded');
        loadingSpin[0].innerHTML = percentComplete.toString().slice(0,4) + '%';

        if (percentComplete === 100) {
            loadingText.innerHTML = 'Loaded! Please wait!'; // Click and drag to move the object
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }
                , 3000)
        } else if (percentComplete === 'infinity') {
            loadingText.innerHTML = 'Error! Please click "X" to close loading or refresh the page and try again!';
        }



    },
    function (error) {

        console.log(error);

    }

);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha true for transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('container3D').appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
AmbientLight.position.set(0, 1, 0);
scene.add(AmbientLight);

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = -3
console.log(camera.position)

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 100;

controls.maxPolarAngle = Math.PI / 2;


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

const colorSelect = document.getElementById('color-select')

const colorOptions = ['white', 'red', 'black', 'blue']

colorOptions.forEach(color => {
    const option = document.createElement('div')
    option.value = color
    option.className = 'color-option'
    option.style.backgroundColor = color
    colorSelect.appendChild(option)
    option.addEventListener('click', () => {
        object.traverse(function (child) {
            if (document.getElementById('selecting-color').value === 'material') {
            if (child.isMesh) {
                child.material.color.set(color)
            }} else {
                document.getElementById('container3D').style.backgroundColor = color
            }
        })
    }
    )
}
)


var exitLoading = document.getElementsByClassName('exit-loading');

exitLoading[0].addEventListener('click', () => {
    loadingElement.style.display = 'none';
}
)