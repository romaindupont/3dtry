import './styles/main.scss';
/* import { menu, menu1, triangle } from './js/menu.js'; */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const heading = document.createElement('h1');
heading.textContent = 'Essai';

const veldt = () => {
	const container = document.getElementById('container');
	const renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(render);

  renderer.outputEncoding = THREE.RGBDEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(500, window.innerWidth / window.innerHeight, 1, 1000);
	/* console.log(camera) */
	camera.focus = 110
	camera.updateProjectionMatrix()
  camera.position.set(5, 5, 500);

  const controls = new OrbitControls(camera, container);
  controls.target.set(0, 0.5, 0);
  controls.minDistance = 0.8;
  controls.minZoom = 0.5;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

	const grid = new THREE.GridHelper(10, 0, 0xeeeeee, 0xeeeeee);
  grid.material.opacity = 0.1;
  grid.material.depthWrite = true;
  grid.material.transparent = true;
  scene.add(grid);
	const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0, transmission: 0.9, transparent: true
  });
	const VisorInput = document.getElementById('casque');
	VisorInput.addEventListener('change', function (e) {
		/* console.log(e.target.value) */
    glassMaterial.color.set(e.target.value);

  })
/* 	let mesh = null;
	
	const mtlLoader = new MTLLoader();
	mtlLoader.setPath( "../src/assets/textures/" );
	let materialsToLoad = [
    'Suede_Noir.mtl',
    'Visiere_Transp.mtl',
    'Pivot.mtl'
];
	let loadedMaterials = [];
	for (var i = 0; i < materialsToLoad.length; i++) {
    mtlLoader.load(materialsToLoad[i], function(materials) {
        materials.preload();
        loadedMaterials.push(materials);
				const objLoader = new OBJLoader();
				objLoader.setMaterials( materials );
				objLoader.load( '../src/assets/3d/VELDT_full_helmet.obj', function ( object ) {
	
					mesh = object;
					scene.add( mesh );
			
				});
					
		})
  } */
/* 	let mesh = null;
	const mtlLoader = new MTLLoader();
	mtlLoader.setPath( "../src/assets/textures/" );
	mtlLoader.load( 'testOBJ.mtl', function( materials ) {

		materials.preload(); 
		const objLoader = new OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( "../src/assets/3d/" );
		objLoader.load( 'testOBJ.obj', function ( object ) {
	
			mesh = object;
			scene.add( mesh );
	
		});
		
	} ); */
/* 	const loader = new OBJLoader();
	loader.load(
		// resource URL
		'../src/assets/3d/testOBJ.obj',
		// called when resource is loaded
		function ( object ) {
	
			scene.add( object );
	
		},
		// called when loading is in progresses
		function ( xhr ) {
	
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
		},
		// called when loading has errors
		function ( error ) {
	
			console.log( 'An error happened' );
	
		}
	); */
	const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('../src/assets/3d/');
  loader.setDRACOLoader(dracoLoader);
  loader.load('../src/assets/3d/test2.glb', function (gltf) {
		/* console.log(gltf) */
    const carModel = gltf.scene.children[0];
/*     carModel.getObjectByName('Default').children[0].children[8].children[0].children[0].children[0].material = glassMaterial; */
		carModel.getObjectByName("Visor_short_2").material = glassMaterial;
		carModel.getObjectByName("Visor_short_3").material = glassMaterial;
    scene.add(carModel);
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  function (error) {
    console.log('An error happened = ', error);
  }
);
	function render() {
    renderer.render(scene, camera); }

}

// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(/* heading, */ veldt())
