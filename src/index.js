import * as THREE from "three";

var scene = new THREE.Scene();

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

// Camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, // bottom
  0, // near plane
  1000 // far plane
);
camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

const car = new THREE.Group();

const backWheel = createWheels();
backWheel.position.y = 6;
backWheel.position.x = -18;
car.add(backWheel);

const frontWheel = createWheels();
frontWheel.position.y = 6;
frontWheel.position.x = 18;
car.add(frontWheel);

const main = new THREE.Mesh(
  new THREE.BoxBufferGeometry(60, 15, 30),
  new THREE.MeshLambertMaterial({ color: 0xa52523 })
);
main.position.y = 12;
car.add(main);

const carFrontTexture = getCarFrontTexture();

const carBackTexture = getCarFrontTexture();

const carRightSide = getCarSideTexture(32);
const carRightSideTexture = new THREE.CanvasTexture(carRightSide);

const carLeftSide = getCarSideTexture(32);
const carLeftSideTexture = new THREE.CanvasTexture(carLeftSide);

carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5);
carLeftSideTexture.rotation = Math.PI;
carLeftSideTexture.flipY = false;

const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
  new THREE.MeshLambertMaterial({ map: carFrontTexture }),
  new THREE.MeshLambertMaterial({ map: carBackTexture }),
  new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
  new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
  new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
  new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
]);
cabin.position.x = -6;
cabin.position.y = 25.5;
car.add(cabin);

scene.add(car);

renderer.render(scene, camera);

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  if (keyCode === 37) {
    car.rotation.y -= 0.05;
  }
  if (keyCode === 38) {
    car.position.x -= 25;
  }
  if (keyCode === 39) {
    car.rotation.y += 0.05;
  }
  if (keyCode === 40) {
    car.position.x += 25;
  }
  if (keyCode === 37) {
    car.rotation.y -= 0.05;
  }

  renderer.render(scene, camera);
}

function createWheels() {
  const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 64, 32);

  context.fillStyle = "#666666";
  context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture(height) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = height;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 128, 32);

  context.fillStyle = "#666666";
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 50, 24);

  return canvas;
}
