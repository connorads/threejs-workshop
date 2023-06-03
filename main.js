import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load("missing_textures.png");
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create some lights
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Add some lines
const materialLine = new THREE.LineBasicMaterial({ color: 0xffffff });
const points = [];
points.push(new THREE.Vector3(-3, 0, 0));
points.push(new THREE.Vector3(0, 3, 0));
points.push(new THREE.Vector3(3, 0, 0));
points.push(new THREE.Vector3(0, -3, 0));
points.push(new THREE.Vector3(-3, 0, 0));
const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometryLine, materialLine);
scene.add(line);

// Add star background
const starsGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(10000 * 3);
for (let i = 0; i < 10000; i++) {
    starPositions[i * 3] = THREE.MathUtils.randFloatSpread(1500);
    starPositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(1500);
    starPositions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(1500);
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Add cone
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
const cone2 = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.x = -5;
cone2.position.x = 5;
scene.add(cone);
scene.add(cone2);

camera.position.z = 5;

let phase = 0;

function animate() {
    requestAnimationFrame(animate);

    camera.position.y = 0 + Math.sin(phase);
    camera.position.x = 0 + Math.sin(phase * 0.5);
    phase += 0.05;
    cube.rotation.x += 0.06;
    cube.rotation.y += 0.02;

    cone.rotation.x += 0.03;
    cone2.rotation.x += 0.03;

    renderer.render(scene, camera);
}

animate();