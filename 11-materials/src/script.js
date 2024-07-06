import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Debug
const gui = new GUI();
const standardMaterialGUI = gui.addFolder("Properties");
const physicalMaterialGUI = gui.addFolder("Extra Properties");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/7.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Objects
// // MeshBasicMaterial
// // const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture;
// // material.color = new THREE.Color(0xff0000);
// // material.wireframe = true;
// // material.transparent = true;
// // material.opacity = 0.5;
// // material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide; // THREE.FrontSide or THREE.BackSide. THREE.DoubleSide uses more GPU

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// // material.wireframe = true;
// material.flatShading = true;

// // MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// // MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial(); // This material needs light to be visible

// // // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100; // Default is 30
// material.specular = new THREE.Color(0x1188ff);

// // MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.side = THREE.DoubleSide;
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;


// gui.add(material, "metalness").min(0).max(1).step(0.01); // Add a slider to the GUI
// gui.add(material, "roughness").min(0).max(1).step(0.01); // Add a slider to the GUI
// gui.add(material, "wireframe"); // Add a checkbox to the GUI


// MeshPhysicalMaterial   This material is more advanced than MeshStandardMaterial, extends MeshStandardMaterial
const material = new THREE.MeshPhysicalMaterial();
material.side = THREE.DoubleSide;
material.metalness = 0;
material.roughness = 0;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

standardMaterialGUI.add(material, "metalness").min(0).max(1).step(0.01); // Add a slider to the GUI
standardMaterialGUI.add(material, "roughness").min(0).max(1).step(0.01); // Add a slider to the GUI
standardMaterialGUI.add(material, "wireframe"); // Add a checkbox to the GUI

// Extra properties of MeshPhysicalMaterial

// // -- Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;
// physicalMaterialGUI.add(material, "clearcoat").min(0).max(1).step(0.01); // Add a slider to the GUI
// physicalMaterialGUI.add(material, "clearcoatRoughness").min(0).max(1).step(0.01); // Add a slider to the GUI

// // --Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)
// physicalMaterialGUI.add(material, "sheen").min(0).max(1).step(0.01); // Add a slider to the GUI
// physicalMaterialGUI.add(material, "sheenRoughness").min(0).max(1).step(0.01); // Add a slider to the GUI    
// physicalMaterialGUI.addColor(material, "sheenColor"); // Add a color picker to the GUI

// // --Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThickness = [100, 800]

// physicalMaterialGUI.add(material, "iridescence").min(0).max(1).step(0.0001); // Add a slider to the GUI
// physicalMaterialGUI.add(material, "iridescenceIOR").min(1).max(2.333).step(0.001); // Add a slider to the GUI
// physicalMaterialGUI.add(material.iridescenceThicknessRange, "0").min(0).max(1000).step(1); // Add a slider to the GUI
// physicalMaterialGUI.add(material.iridescenceThicknessRange, "1").min(0).max(1000).step(1); // Add a slider to the GUI

// --Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, "transmission").min(0).max(1).step(0.01); // Add a slider to the GUI
gui.add(material, "ior").min(1).max(10).step(0.001); // Add a slider to the GUI
gui.add(material, "thickness").min(0).max(1).step(0.01); // Add a slider to the GUI





const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);

sphere.position.x = -1.5;
plane.position.x = 0;
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// // Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 40);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// Environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  //   console.log(environmentMap);
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
