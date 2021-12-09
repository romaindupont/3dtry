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

/* const heading = document.createElement('h1');
heading.textContent = 'Essai'; */
const menuOpen = () => {
	const menuClick = document.querySelector('.barreElement');
	menuClick.addEventListener('click', () => {
    const menu = document.querySelector('#info');
    menu.classList.toggle('menu--open');
  })
}
const menuElement = () => {
	let arrayElement = [
		'Visor',
		'Shell',
		'Chinguard',
		'Screw',
		'Rubber'
	]
	const clicGauche = document.querySelector('.arrow--left');
	const clicDroit = document.querySelector('.arrow--right');
	let i = 0;

	clicGauche.addEventListener('click', () => {
    const title = document.querySelector('.elementPicker');
		i -= 1;
		if (i === -1) {
			i = 4;
			return title.textContent = arrayElement[i] , VisorPicker()
		}
		else {
			return title.textContent = arrayElement[i] , VisorPicker()
		}
  })
	clicDroit.addEventListener('click', () => {
    const title = document.querySelector('.elementPicker');
		i += 1;
		if (i === 5) {
			i = 0;
			return title.textContent = arrayElement[i] , VisorPicker()
		}
		else {
			return title.textContent = arrayElement[i] , VisorPicker()
		}
  })
}
const VisorPicker = () => {
	const title = document.querySelector('.elementPicker');
	const Visor = document.querySelector('.pickerVisor');
	switch (title.textContent) {
		case 'Visor':
			Visor.style.display = 'block';
			break;
		case 'Shell':
			Visor.style.display = 'none';
			console.log('Shell')
			break;
		case 'Chinguard':
			Visor.style.display = 'none';
			console.log('Chinguard')
			break;
		case 'Screw':
			Visor.style.display = 'none';
			console.log('Screw')
			break;
		case 'Rubber':
			Visor.style.display = 'none';
			console.log('Rubber')
			break;	
		default:
			Visor.style.display = 'none';
			break;
	}
	
}
const veldt = () => {
	const container = document.getElementById('simulateur');
	const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setAnimationLoop(render);

  renderer.outputEncoding = THREE.RGBDEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  /* renderer.toneMappingExposure = 0.85; */
  container.appendChild(renderer.domElement);
	THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1500);
	
	camera.position.set(50, -800, 100 );

  const controls = new OrbitControls(camera, container);
  controls.target.set(50, 0, 0);
  controls.minDistance = 100;
	controls.maxDistance = 1100;
	controls.update();  
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f7f7);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
/* 	const light = new THREE.AmbientLight( 0x404040, 0.1); // soft white light
	scene.add( light ); */
	const directionalLight = new THREE.DirectionalLight( 0x404040, 2);
	/* directionalLight.position.set(50, -800, 100); */
	directionalLight.position.set(0, 1, 0);
	
	scene.add( directionalLight );
	/* const geometry = new THREE.CircleGeometry( 150, 150 );
	const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, depthWrite: false, depthTest: false} );
	
	const plane = new THREE.Mesh( geometry, material );
	plane.position.z = -100;
	plane.receiveShadow = true;
	scene.add( plane ); */

	const textureBody = new THREE.TextureLoader();
	/* const texture1 = textureBody.load('../src/assets/textures/CF_dark_arte-3d.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(30, 30);
  })
	const texture2 = textureBody.load('../src/assets/textures/CF_spec_arte-3d.jpg', function (map) {
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(40, 40);
  }) */
	const carbonBaseColor = textureBody.load('../src/assets/textures/carbon_fibers_basecolor_1k.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 5;
    map.repeat.set(10, 10);
  })
	const carbonNormal = textureBody.load('../src/assets/textures/carbon_fibers_normal_1k.jpg')
	const carbonHeight = textureBody.load('../src/assets/textures/carbon_fibers_height_1k.jpg')
	const carbonRouhness = textureBody.load('../src/assets/textures/carbon_fibers_roughness_1k.jpg')
	const carbonBump = textureBody.load('../src/assets/textures/carbon_fibers_bump_1k.jpg')
	const carbonanistroAngle = textureBody.load('../src/assets/textures/carbon_fibers_anistrophic_angle_1k.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 1;
		map.repeat.set(10, 10);
	})
	const carbonanistroLevel = textureBody.load('../src/assets/textures/carbon_fibers_anistrophic_level_1k.jpg')
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
		/* color: 0xffffff, */ /* metalness: 0.8, */ /* roughness: 0.5, */ clearcoat: 0.3, clearcoatRoughness: 0.6, side: THREE.DoubleSide, /* reflectivity: 0.8, */ map:carbonBaseColor, bumpMap:carbonBump, normalMap:carbonNormal, roughnessMap:carbonRouhness, displacementMap:carbonHeight, clearcoatMap:carbonanistroAngle , clearcoatNormalMap:carbonanistroLevel, /* refractionRatio: 0.8 */ior:3
		/* envMapIntensity: 10, emissiveIntensity: 0.5 */
	});

	const bodyMaterialTry = new THREE.MeshPhysicalMaterial({color: 0x32a852, metalness: 1, roughness: 1, clearcoat: 0.6, clearcoatRoughness: 0.5, transparent: false, side: THREE.DoubleSide});
	const VisorInput = document.getElementById('casque');
/* 	VisorInput.addEventListener('change', function (e) {
    bodyMaterial.color.set(e.target.value);
		/* glassMaterial.visible = false; */
  /* }) */ 
	
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
	/* carModel.children[9].visible = false */
	/* carModel.children[9].rotation.z += -0.3
	carModel.children[9].rotation.x += 0.3 */
	carModel.rotation.z += 1
/* 	carModel.scale.set(0.5,0.5,0.5); */

	carModel.rotation.x += 0.5
	carModel.visible = false
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
app.append(/* heading, */ veldt(),menuOpen(),menuElement()/* ,VisorPicker() */)