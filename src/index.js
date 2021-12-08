import './styles/main.scss';
/* import { menu, menu1, triangle } from './js/menu.js'; */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const heading = document.createElement('h1');
heading.textContent = 'Essai';

const veldt = () => {
	const container = document.getElementById('container');
	const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(render);

  renderer.outputEncoding = THREE.RGBDEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.75;
  container.appendChild(renderer.domElement);
	THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1500);
/* 	const camera = new THREE.PerspectiveCamera(8000, window.innerWidth / window.innerHeight, 1, 2000); */
	/* const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 ); */
/* scene.add( camera ); */
	/* console.log(camera) */
/* 	camera.focus = 90 */
	/* camera.zoomm = 2
	camera.updateProjectionMatrix() */
	/* camera.position.set(1, 800, -50); */
	/* camera.position.set(-350, -600, 200 ); */
	camera.position.set(50, -800, 100 );
	/* camera.lookAt(0, 0, 0); */

  const controls = new OrbitControls(camera, container);
  controls.target.set(50, 0, 0);
  controls.minDistance = 0.8;
  controls.minZoom = 0.5;
/* 	controls.mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.DOLLY,
		RIGHT: THREE.MOUSE.PAN
	} */
	controls.update();  
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 1, 100 );
	directionalLight.position.set(30, -500, 300 );
	/* directionalLight.castShadow = true; */
	scene.add( directionalLight );
/* 	const textureBody = new THREE.TextureLoader().load('../src/assets/textures/CF_dark_arte-3d.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 5;
    map.repeat.set(35, 35);
  }); */
	const textureBody = new THREE.TextureLoader();
	const texture1 = textureBody.load('../src/assets/textures/CF_dark_arte-3d.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(50, 50);
  })
	const texture2 = textureBody.load('../src/assets/textures/CF_spec_arte-3d.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(40, 40);
  })
/* 	const myMesh = new THREE.Mesh(myGeometry, myMaterials); */
	//Or:
	/* myMesh.materials = myMaterials; */
	const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0, transmission: 0.9, transparent: true
  });
	/* const bodyMaterial = new THREE.MeshPhysicalMaterial({
		color: 0xd31426 , metalness: 0.237, roughness: 0.11, clearcoat: 0.07, clearcoatRoughness: 0.16, transparent: false, side: THREE.DoubleSide, reflectivity: 0.148, map:textureBody
	}); */
	const bodyMaterial = new THREE.MeshPhysicalMaterial({
		/* color: 0x4f4f4f, */ metalness: 1, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.8, transparent: false, side: THREE.DoubleSide, reflectivity: 0.2, map:texture1, bumpMap:texture2
	});

	const bodyMaterialTry = new THREE.MeshPhysicalMaterial({color: 0x32a852, metalness: 1, roughness: 1, clearcoat: 0.6, clearcoatRoughness: 0.5, transparent: false, side: THREE.DoubleSide});
	const VisorInput = document.getElementById('casque');
	VisorInput.addEventListener('change', function (e) {
    bodyMaterial.color.set(e.target.value);

  })
	/* const topBox = new THREE.Mesh(geometry, bodyMaterial); */
/* topBox.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 8));
topBox.applyMatrix(new THREE.Matrix4().makeTranslation(0.5, 1, -0.5));
scene.add(topBox); */
/* 	const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('../src/assets/gltf/');
  loader.setDRACOLoader(dracoLoader);
  loader.load('../src/assets/3d/test4.glb', function (gltf) */
	const loader = new Rhino3dmLoader();
	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );
  loader.load('../src/assets/3d/test_full4.3dm', function (gltf) {
		console.log(gltf)
		const carModel = gltf;
 	/* 	for (let i = 0; i = 0; i++) { */
		carModel.children[0].material = bodyMaterial;
		/* carModel.children[0].material = bodyMaterial2; */
			/* carModel.children[0].texture = textureBody; */
	/* 	}  */
	carModel.children[9].material = glassMaterial;
	carModel.children[25].material = bodyMaterialTry;
	/* carModel.applyMatrix4( new THREE.Matrix4().makeTranslation( -5, 50, 0 ) ); */
	carModel.rotation.z += 1
/* 	carModel.scale.set(0.5,0.5,0.5); */
	carModel.rotation.x += 0.5
	/* carModel.children[1].material = bodyMaterial;
		carModel.children[2].material = bodyMaterial; */
  /* carModel.getObjectByName("Visor_short_2").material = glassMaterial;
		carModel.getObjectByName("Visor_short_3").material = glassMaterial; */
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