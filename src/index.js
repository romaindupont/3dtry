import './styles/main.scss';
/* import { menu, menu1, triangle } from './js/menu.js'; */
import * as THREE from 'three';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/* import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'; */
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

const disparition = () => {
  const fenetreDisparition = document.querySelector('.disparition');
  fenetreDisparition.style.display = 'none';
}

const time = setTimeout(disparition, 8000);

const menuSite = () => {
	const clicMenu = document.querySelector('.menuWebsite');
	const menuCache = document.querySelector('.menuCache');
	const menuLink1 = document.querySelector('.link:nth-child(1)');
	const menuMark1 = document.querySelector('.menuMark1');
	const returnToMenu = document.querySelector('.returnToMenu');
	const upDown = document.querySelector('.upDown');
	const eyes = document.querySelector('.eyesHelmet');
	clicMenu.addEventListener('click', () => {
		menuCache.style.left = '0px';
	})
	const cross = document.querySelector('.cross');
	cross.addEventListener('click', () => {
		menuCache.style.left = '-20vw';
		menuMark1.style.left = '-30vw';
	})
	menuLink1.addEventListener('click', () => {
		menuMark1.style.left = '20vw';
	})
	returnToMenu.addEventListener('click', () => {
		menuMark1.style.left = '-30vw';
	})
	upDown.addEventListener('click', () => {
		const sdTabs = document.querySelector('.sd-tabs');
		const menuEtape = document.querySelector('.menuEtape');
		if(document.querySelector('.openChoiceMenu')) {
			sdTabs.classList.remove("openChoiceMenu")
			menuEtape.style.display = 'none'
		}
		else {
			sdTabs.classList.add("openChoiceMenu")
			/* menuEtape.style.display = 'flex' */
		}
	})
	eyes.addEventListener('click', () => {
		if(eyes.src.includes('oeil_on.svg')) {
			eyes.src='../src/images/oeil_off.svg';
		}
		else {
			eyes.src='../src/images/oeil_on.svg';
		}
	})
}

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
	const visor = document.querySelector('.pickerVisor');
	const shell = document.querySelector('.pickerShell');
	const chainguard = document.querySelector('.pickerChinguard');
	const screw = document.querySelector('.pickerScrew');
	const rubber = document.querySelector('.pickerRubber');
	switch (title.textContent) {
		case 'Visor':
			visor.style.display = 'block';
			shell.style.display = 'none';
			screw.style.display = 'none';
			chainguard.style.display = 'none';
			rubber.style.display = 'none';
			break;
		case 'Shell':
			shell.style.display = 'block';
			visor.style.display = 'none';
			screw.style.display = 'none';
			chainguard.style.display = 'none';
			rubber.style.display = 'none';
			break;
		case 'Chinguard':
			chainguard.style.display = 'block';
			visor.style.display = 'none';
			shell.style.display = 'none';
			screw.style.display = 'none';
			rubber.style.display = 'none';
			break;
		case 'Screw':
			screw.style.display = 'block';
			visor.style.display = 'none';
			shell.style.display = 'none';
			chainguard.style.display = 'none';
			rubber.style.display = 'none';
			break;
		case 'Rubber':
			rubber.style.display = 'block';
			visor.style.display = 'none';
			shell.style.display = 'none';
			chainguard.style.display = 'none';
			screw.style.display = 'none';
			break;	
		case 'Element':
			visor.style.display = 'none';
			shell.style.display = 'none';
			chainguard.style.display = 'none';
			screw.style.display = 'none';
			rubber.style.display = 'none';
			break;
		default:
			visor.style.display = 'none';
			shell.style.display = 'none';
			chainguard.style.display = 'none';
			screw.style.display = 'none';
			rubber.style.display = 'none';
			break;
	}
	
}
const veldt = () => {
	let effectController;
	let sceneController;
	let ambientLightController;
	let directionalLightController;
	let hemisphereLightController;
	let LightController;
	let pointLightController;
	let rectAreaLightLightController;
	let spotLightController;

	const container = document.getElementById('simulateur');
	const renderer = new THREE.WebGLRenderer( { antialias: true, powerPreference: 'high-performance', alpha: true } );
	renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(render);
  renderer.outputEncoding = THREE.RGBDEncoding;
/*   renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.2; */
	
  container.appendChild(renderer.domElement);
	THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1500);
	camera.position.set(50, -500, 300);
/* 	camera.lookAt(0, 0, 1) */
  const controls = new OrbitControls(camera, container);
  controls.target.set(50, 0, 0);
  controls.minDistance = 100;
	controls.maxDistance = 1100;
	controls.update();  
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
	RectAreaLightUniformsLib.init();
  scene.background = new THREE.Color(0xf1f1f2);
  scene.environment = pmremGenerator.fromScene(scene).texture;

	const directionalLight = new THREE.DirectionalLight(null, 0);
	directionalLight.position.set(0, 0, 0);
	scene.add( directionalLight );
	const ambientLight = new THREE.AmbientLight(null, 0);
	const hemisphereLight = new THREE.HemisphereLight(null,null,0);
	const Light = new THREE.Light();

	const PointLight = new THREE.PointLight(null, 0, 0);
	const width = 10000;
	const height = 4000;
	const intensity = 4;
	const RectAreaLight = new THREE.RectAreaLight(0x3d3d3d, intensity, width, height);
	const RectAreaLightDown = new THREE.RectAreaLight(0x3d3d3d, intensity, width, height);
	RectAreaLight.position.set(50, 1500, 2500);
	RectAreaLight.lookAt( 0, 0, 0 );
	RectAreaLightDown.position.set(50, 1500, 2500);
	RectAreaLightDown.lookAt( 0, 0, 0 );
	const SpotLight = new THREE.SpotLight(null, 0, 0, Math.PI/3, 0.0, 0);
	scene.add( ambientLight,hemisphereLight,Light,PointLight,	SpotLight );
	scene.add(RectAreaLight,RectAreaLightDown);
	const floorareaLight = new THREE.RectAreaLight(0x3d3d3d, 4, 10000, 4000);
	floorareaLight.position.set(50, 1500, -2500);
	floorareaLight.lookAt( 0, 0, 0 );
	scene.add(floorareaLight);
/* 	const geoFloor = new THREE.BoxGeometry( 2000, 2000, 2000 );
	const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
	const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
	mshStdFloor.position.set(0, 1, 0)
	scene.add( mshStdFloor ); */
	/* const rectLightHelper = new THREE.RectAreaLightHelper( RectAreaLight );
	rectLight.add( rectLightHelper );		 */

	const textureBody = new THREE.TextureLoader();
	const svgLoad = new SVGLoader();
	const carbonBaseColor = textureBody.load('../src/assets/textures/carbon_fibers_basecolor_1k.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 5;
		map.rotation = 70;
    map.repeat.set(10, 10);
  });
	const carbonNormal = textureBody.load('../src/assets/textures/carbon_fibers_normal_1k.jpg');
	const carbonHeight = textureBody.load('../src/assets/textures/carbon_fibers_height_1k.jpg');
	const carbonRouhness = textureBody.load('../src/assets/textures/carbon_fibers_roughness_1k.jpg');
	const carbonBump = textureBody.load('../src/assets/textures/carbon_fibers_bump_1k.jpg');
	const carbonanistroAngle = textureBody.load('../src/assets/textures/carbon_fibers_anistrophic_angle_1k.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 1;
		map.repeat.set(10, 10);
	});
	const carbonanistroLevel = textureBody.load('../src/assets/textures/carbon_fibers_anistrophic_level_1k.jpg');
	const glitterBody = textureBody.load('../src/assets/textures/glitter.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(10, 10);
  });
	const rubberMap = textureBody.load('../src/assets/textures/rubber/synth-rubber-albedo.png', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(60, 60);
	});
	const rubberMetalness = textureBody.load('../src/assets/textures/rubber/synth-rubber-metalness.png')
	const rubberNormal = textureBody.load('../src/assets/textures/rubber/synth-rubber-normal.png')
	const rubberRoughness = textureBody.load('../src/assets/textures/rubber/synth-rubber-roughness.png')
	const ScrewBaseColor = textureBody.load('../src/assets/textures/metalVis/Metal011_1K_Color.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(60, 60);
	})
	
	const screwBaseColor = textureBody.load('../src/assets/textures/titanium/Titanium_basecolor.png', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(1, 1);
	})
	const screwMetalness = textureBody.load('../src/assets/textures/titanium/Titanium_metallic.png', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(1, 1);
	})
	const screwNormal = textureBody.load('../src/assets/textures/titanium/Titanium_normal.png', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(1, 1);
	})
	const screwRoughness = textureBody.load('../src/assets/textures/titanium/Titanium_roughness.png', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 1;
    map.repeat.set(1, 1);
	})
	const carbonTryMap = textureBody.load('../src/assets/textures/carbon/Carbon.png', function (map) {
		map.encoding = THREE.sRGBEncoding;
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
		map.repeat.set(60, 30);
		map.rotation = 360;
		map.center.set(-0.2,-0.2)
  });
	const carbonNormalMap = textureBody.load('../src/assets/textures/carbon/Carbon_Normal.png', function (map) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
  });
		
	const checkerTexture = textureBody.load('../src/assets/images/checker.png', function (map) {
		map.repeat.set(1, 1);
		/* map.center.set(0.5, 0.5); */
	
	
	})
	const halfTexture = textureBody.load('../src/assets/images/halfTry.png', function (map) {
		map.repeat.set(1, 1);
		/* map.center.set(0.5, 0.5); */
	
	
	})

		const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0, transmission: 1, transparent: true, side: THREE.DoubleSide
	});
	const chainguardMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x121212, metalness: 1, roughness: 0, clearcoat: 0.1895, clearcoatRoughness: 0.0751, transparent: false, side: THREE.DoubleSide, reflectivity: 0.5325
	});
	const screwMaterialTop = new THREE.MeshPhysicalMaterial({
		side: THREE.DoubleSide,
		roughnessMap:screwRoughness,
		roughness:1,
		metalnessMap:screwMetalness,
		normalMap:screwNormal,
		map:screwBaseColor,
		reflectivity: 0.4,
		emissive: 0x0c0c0c
	});

	const screwMaterialDown1 = new THREE.MeshPhysicalMaterial({
		side: THREE.DoubleSide,
		roughnessMap:screwRoughness,
		roughness:1,
		metalnessMap:screwMetalness,
		normalMap:screwNormal,
		map:screwBaseColor,
		reflectivity: 0.4,
		emissive: 0x0c0c0c
 });
 const screwMaterialDown2 = new THREE.MeshPhysicalMaterial({
	side: THREE.DoubleSide,
	roughnessMap:screwRoughness,
	roughness:1,
	metalnessMap:screwMetalness,
	normalMap:screwNormal,
	map:screwBaseColor,
	reflectivity: 0.4,
	emissive: 0x0c0c0c
});

	const rubberMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x222222 ,side: THREE.DoubleSide, reflectivity: 0, map:rubberMap, roughnessMap:rubberRoughness,roughness:0.5, normalMap: rubberNormal, metalnessMap: rubberMetalness, metalness: 0.9
	});
	const rubberChinguardMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x222222 ,side: THREE.DoubleSide, reflectivity: 0, map:rubberMap, roughnessMap:rubberRoughness,roughness:0.5, normalMap: rubberNormal, metalnessMap: rubberMetalness, metalness: 0.9
	});
	const bodyMaterial = new THREE.MeshPhysicalMaterial({
		side: THREE.DoubleSide,
		color: 0x121212,
		metalness: 1,
		roughness: 0,
		clearcoat: 0.1895,
		clearcoatRoughness: 0.0751,
		reflectivity: 0.5325
		/* envMap: TextureBrillance, */
		/* roughnessMap: TextureRoughness, */
		/* normalMap: carbonNormalMap, */
	/* 	ior:1.39,
		lightMapIntensity: 1 */
	});
/* 	const bodyMaterial = new THREE.MeshPhysicalMaterial({
		clearcoat: 0.3,
		clearcoatRoughness: 0.6,
		side: THREE.DoubleSide,
		map:carbonBaseColor,
		bumpMap:carbonBump,
		normalMap:carbonNormal,
		roughnessMap:carbonRouhness,
		displacementMap:carbonHeight,
		clearcoatMap:carbonanistroAngle , 
		clearcoatNormalMap:carbonanistroLevel,
		ior:3
		
	}); */
	const AttachVisor = new THREE.MeshPhysicalMaterial({
		color: 0x222222, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.16, reflectivity: 0.148
	})
	const LogoVeldt = new THREE.MeshPhysicalMaterial({
		color: 0xffffff, side: THREE.DoubleSide, metalness: 1, roughness: 0, clearcoat: 0.5, clearcoatRoughness: 0.8, reflectivity: 0.5
	})
/* 	const Racing = new THREE.MeshPhysicalMaterial({
		 side: THREE.DoubleSide, map:numberSvg
	}) */
	const visorPickerDisplayWithout = document.querySelector('.pickerVisorWithout');
	const visorPickerDisplay = document.querySelector('.pickerVisorWith');
	const VisorTransparent = document.querySelector('.pickerVisorColor--transp');
	const VisorSmoked = document.querySelector('.pickerVisorColor--smoked');
	const VisorBlack = document.querySelector('.pickerVisorColor--black');
	visorPickerDisplayWithout.addEventListener('click', () => {
		glassMaterial.visible = false;
		AttachVisor.visible = false;
		visorPickerDisplayWithout.style.background = "#183679";
		visorPickerDisplayWithout.style.color = "#ffffff";
		visorPickerDisplay.style.background = "#ffffff";
		visorPickerDisplay.style.color = "#183679";
  })
	visorPickerDisplay.addEventListener('click', () => {
		glassMaterial.visible = true;
		AttachVisor.visible = true;
		visorPickerDisplay.style.background = "#183679";
		visorPickerDisplay.style.color = "#ffffff";
		visorPickerDisplayWithout.style.background = "#ffffff";
		visorPickerDisplayWithout.style.color = "#183679";
  })
	VisorTransparent.addEventListener('click', () => {
		glassMaterial.color.set('#ffffff');
		VisorTransparent.style.background = "#183679";
		VisorTransparent.style.color = "#ffffff";
		VisorSmoked.style.background = "#ffffff";
		VisorSmoked.style.color = "#183679";
		VisorBlack.style.background = "#ffffff";
		VisorBlack.style.color = "#183679";
  })
	VisorSmoked.addEventListener('click', () => {
		glassMaterial.color.set('#4c4d4e');
		VisorSmoked.style.background = "#183679";
		VisorSmoked.style.color = "#ffffff";
		VisorTransparent.style.background = "#ffffff";
		VisorTransparent.style.color = "#183679";
		VisorBlack.style.background = "#ffffff";
		VisorBlack.style.color = "#183679";
  })
	VisorBlack.addEventListener('click', () => {
		glassMaterial.color.set('#1a1a1b');
		VisorBlack.style.background = "#183679";
		VisorBlack.style.color = "#ffffff";
		VisorSmoked.style.background = "#ffffff";
		VisorSmoked.style.color = "#183679";
		VisorTransparent.style.background = "#ffffff";
		VisorTransparent.style.color = "#183679";
  })
	const shellCarbon = document.querySelector('.carbon');
	const shellBrillant = document.querySelector('.brillant');
	const shellMatt = document.querySelector('.matt');
	const shellGlitter = document.querySelector('.glitter');
	shellCarbon.addEventListener('click', () => {
		bodyMaterial.map = carbonBaseColor;
		bodyMaterial.bumpMap= carbonBump;
		bodyMaterial.normalMap= carbonNormal;
		bodyMaterial.roughnessMap= carbonRouhness;
		bodyMaterial.displacementMap= carbonHeight;
		bodyMaterial.clearcoatMap= carbonanistroAngle;
		bodyMaterial.clearcoatNormalMap= carbonanistroLevel;
		bodyMaterial.metalness=0;
		bodyMaterial.roughness=1;
		bodyMaterial.clearcoat=0.3;
		bodyMaterial.clearcoatRoughness=0.6;
		bodyMaterial.reflectivity=0;
		shellCarbon.style.background = "#183679";
		shellCarbon.style.color = "#ffffff";
		shellBrillant.style.background = "#ffffff";
		shellBrillant.style.color = "#183679";
		shellMatt.style.background = "#ffffff";
		shellMatt.style.color = "#183679";
		shellGlitter.style.background = "#ffffff";
		shellGlitter.style.color = "#183679";
  })
	shellBrillant.addEventListener('click', () => {
		bodyMaterial.map = null;
		bodyMaterial.bumpMap= null;
		bodyMaterial.normalMap= null;
		bodyMaterial.roughnessMap= null;
		bodyMaterial.displacementMap= null;
		bodyMaterial.clearcoatMap= null;
		bodyMaterial.clearcoatNormalMap= null;
		bodyMaterial.metalness= 1;
		bodyMaterial.roughness= 0;
		bodyMaterial.clearcoat= 0.1895;
		bodyMaterial.clearcoatRoughness= 0.0751;
		bodyMaterial.reflectivity= 0.5325;
		/* bodyMaterial.metalness=0.3;
		bodyMaterial.roughness=0.2;
		bodyMaterial.clearcoat=0.8;
		bodyMaterial.clearcoatRoughness=0.8;
		bodyMaterial.reflectivity=0.6; */
		shellCarbon.style.background = "#ffffff";
		shellCarbon.style.color = "#183679";
		shellBrillant.style.background = "#183679";
		shellBrillant.style.color = "#ffffff";
		shellMatt.style.background = "#ffffff";
		shellMatt.style.color = "#183679";
		shellGlitter.style.background = "#ffffff";
		shellGlitter.style.color = "#183679";
  })
	shellMatt.addEventListener('click', () => {
		bodyMaterial.map = null;
		bodyMaterial.bumpMap= null;
		bodyMaterial.normalMap= null;
		bodyMaterial.roughnessMap= null;
		bodyMaterial.displacementMap= null;
		bodyMaterial.clearcoatMap= null;
		bodyMaterial.clearcoatNormalMap= null;
		bodyMaterial.metalness=0.3;
		bodyMaterial.roughness=0.2;
		bodyMaterial.clearcoat=0.8;
		bodyMaterial.clearcoatRoughness=0.8;
		bodyMaterial.reflectivity=0.6;
		/* bodyMaterial.metalness=0;
		bodyMaterial.roughness=1;
		bodyMaterial.clearcoat=0.3;
		bodyMaterial.clearcoatRoughness=0.6;
		bodyMaterial.reflectivity=0; */
		shellCarbon.style.background ="#ffffff" ;
		shellCarbon.style.color = "#183679";
		shellBrillant.style.background = "#ffffff";
		shellBrillant.style.color = "#183679";
		shellMatt.style.background = "#183679";
		shellMatt.style.color = "#ffffff";
		shellGlitter.style.background = "#ffffff";
		shellGlitter.style.color = "#183679";
  })
	shellGlitter.addEventListener('click', () => {
		bodyMaterial.map = glitterBody;
		bodyMaterial.bumpMap= null;
		bodyMaterial.normalMap= null;
		bodyMaterial.roughnessMap= null;
		bodyMaterial.displacementMap= null;
		bodyMaterial.clearcoatMap= null;
		bodyMaterial.clearcoatNormalMap= null;
		bodyMaterial.metalness=0.7;
		bodyMaterial.roughness=0.2;
		bodyMaterial.clearcoat=0.6;
		bodyMaterial.clearcoatRoughness=0.2;
		bodyMaterial.reflectivity=0.4;
		shellCarbon.style.background = "#ffffff" ;
		shellCarbon.style.color ="#183679";
		shellBrillant.style.background = "#ffffff";
		shellBrillant.style.color = "#183679";
		shellMatt.style.background = "#ffffff";
		shellMatt.style.color = "#183679";
		shellGlitter.style.background = "#183679";
		shellGlitter.style.color = "#ffffff";
  })
	const chinguardWithout = document.querySelector('.ChinguardWithout');
	const chinguardWith = document.querySelector('.ChinguardWith');
	chinguardWithout.addEventListener('click', () => {
		chainguardMaterial.visible = false;
		chinguardWithout.style.background = "#183679" ;
		chinguardWithout.style.color ="#ffffff";
		chinguardWith.style.background = "#ffffff";
		chinguardWith.style.color = "#183679";
		rubberChinguardMaterial.visible = false;

  })
	chinguardWith.addEventListener('click', () => {
		chainguardMaterial.visible = true;
		chinguardWith.style.background = "#183679" ;
		chinguardWith.style.color ="#ffffff";
		chinguardWithout.style.background = "#ffffff";
		chinguardWithout.style.color = "#183679";
		rubberChinguardMaterial.visible = true;
  })

	const shellRed = document.querySelector('.shellColor--red');
	shellRed.addEventListener('click', () => {
		bodyMaterial.color.set('#e72a2a');
  })
	const shellBlue = document.querySelector('.shellColor--blue');
	shellBlue.addEventListener('click', () => {
		bodyMaterial.color.set('#5288ff');
  })
	const shellGreen = document.querySelector('.shellColor--green');
	shellGreen.addEventListener('click', () => {
		bodyMaterial.color.set('#26892e');
  })
	const shellYellow = document.querySelector('.shellColor--yellow');
	shellYellow.addEventListener('click', () => {
		bodyMaterial.color.set('#f4f74e');
  })
	const shellBlack = document.querySelector('.shellColor--black');
	shellBlack.addEventListener('click', () => {
		bodyMaterial.color.set('#000000');
  })
	const shellWhite = document.querySelector('.shellColor--white');
	shellWhite.addEventListener('click', () => {
		bodyMaterial.color.set('#ffffff');
  })
	const shellGold = document.querySelector('.shellColor--gold');
	shellGold.addEventListener('click', () => {
		bodyMaterial.color.set('#FFD700');
  })
	const shellSilver = document.querySelector('.shellColor--silver');
	shellSilver.addEventListener('click', () => {
		bodyMaterial.color.set('#C0C0C0');
  })
	const chinguardRed = document.querySelector('.chinguardColor--red');
	chinguardRed.addEventListener('click', () => {
		chainguardMaterial.color.set('#e72a2a');
  })
	const chinguardBlue = document.querySelector('.chinguardColor--blue');
	chinguardBlue.addEventListener('click', () => {
		chainguardMaterial.color.set('#5288ff');
  })
	const chinguardGreen = document.querySelector('.chinguardColor--green');
	chinguardGreen.addEventListener('click', () => {
		chainguardMaterial.color.set('#26892e');
  })
	const chinguardYellow = document.querySelector('.chinguardColor--yellow');
	chinguardYellow.addEventListener('click', () => {
		chainguardMaterial.color.set('#f4f74e');
  })
	const chinguardBlack = document.querySelector('.chinguardColor--black');
	chinguardBlack.addEventListener('click', () => {
		chainguardMaterial.color.set('#000000');
  })
	const chinguardWhite = document.querySelector('.chinguardColor--white');
	chinguardWhite.addEventListener('click', () => {
		chainguardMaterial.color.set('#ffffff');
  })
	const chinguardGold = document.querySelector('.chinguardColor--gold');
	chinguardGold.addEventListener('click', () => {
		chainguardMaterial.color.set('#FFD700');
  })
	const chinguardSilver = document.querySelector('.chinguardColor--silver');
	chinguardSilver.addEventListener('click', () => {
		chainguardMaterial.color.set('#C0C0C0');
  })

	const shellDesignNormal = document.querySelector('.shellDesign--normal');
	const shellDesignHalf = document.querySelector('.shellDesign--half');
	shellDesignHalf.addEventListener('click', () => {
		bodyMaterial.map = halfTexture;

  })
	const shellDesignBand = document.querySelector('.shellDesign--band');
	const shellDesignVertical = document.querySelector('.shellDesign--vertical');
	const shellDesignHorizontal = document.querySelector('.shellDesign--horizontal');
	const shellDesignGradient = document.querySelector('.shellDesign--gradient');
	const shellDesignContour = document.querySelector('.shellDesign--contour');
	const shellDesignOutline = document.querySelector('.shellDesign--outline');
	const shellDesignExtend = document.querySelector('.shellDesign--extend');
	const shellDesignChecker = document.querySelector('.shellDesign--checker');
	shellDesignChecker.addEventListener('click', () => {
		bodyMaterial.map = checkerTexture;
		/* bodyMaterial.toneMapped = THREE.ReinhardToneMapping; */
		/* bodyMaterial.depthTest = false; */
		/* numberSvg.visible = true;
		numberSvg.rotation.z = 2 */
 		/* bodyMaterial.map=numberSvg */
		/*numberSvg.position.x = 10;
		numberSvg.position.y =50;
		numberSvg.position.z = -90; */
		/* bodyMaterial.needsUpdate = true; */
  })

	const screwAll = document.querySelector('.screw--all');
	screwAll.addEventListener('click', () => {
		screwMaterialDown1.visible = true;
		screwMaterialTop.visible = true;
		screwMaterialDown2.visible = true;
  })
	const screwBott = document.querySelector('.screw--bottom');
	screwBott.addEventListener('click', (e) => {
		screwMaterialDown1.visible = true;
		screwMaterialTop.visible = false;
		screwMaterialDown2.visible = true;
  })
	const screwTop = document.querySelector('.screw--top');
	screwTop.addEventListener('click', () => {
		screwMaterialTop.visible = true;
		screwMaterialDown2.visible = false;
		screwMaterialDown1.visible = false;
  })
	const screwNone = document.querySelector('.screw--none');
	screwNone.addEventListener('click', () => {
		screwMaterialDown2.visible = false;
		screwMaterialTop.visible = false;
		screwMaterialDown1.visible = false;
  })

	const rubberColorBlack = document.querySelector('.rubberColor--black');
	rubberColorBlack.addEventListener('click', () => {
		rubberMaterial.color.set('#222222');
  })
	const rubberColorNaturel = document.querySelector('.rubberColor--naturel');
	rubberColorNaturel.addEventListener('click', () => {
		rubberMaterial.color.set('#ffffff');
  })

	const loader = new Rhino3dmLoader();
	loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );
	/* loader.load('../src/assets/3d/test_full4.3dm', function (gltf) {
		console.log(gltf)
		const carModel = gltf;

		//shell
		carModel.children[0].material = bodyMaterial;
		// visor
		carModel.children[9].material = glassMaterial;
		//attacheVisor
		carModel.children[4].material = AttachVisor;//attache visior
		carModel.children[33].material = AttachVisor;//protection visor droit
		carModel.children[34].material = AttachVisor;//protection visor gauche
		//chinguard
		carModel.children[18].material = chainguardMaterial;
		carModel.children[18].position.set(0,0,1);
		carModel.children[18].scale.x = 1.05;
		carModel.children[18].scale.y = 1.01;
		carModel.children[18].scale.z = 1;
		//rubber
		carModel.children[2].material = rubberChinguardMaterial;//rubber chainguard haut
		carModel.children[2].scale.x =1.05;
		carModel.children[2].scale.y =1.05;
		carModel.children[2].scale.z =1;
		carModel.children[3].material = rubberChinguardMaterial;//rubber chainguard bas
		carModel.children[3].scale.x =1.05;
		carModel.children[3].scale.y =1;
		carModel.children[3].scale.z =1;
		carModel.children[13].material = rubberMaterial;//rubber shell
		//screw
		carModel.children[1].material = screwMaterialTop;//vis gauche visior
		carModel.children[14].material = screwMaterialTop;//vis droit visior
		carModel.children[29].material = screwMaterialTop;//rondelle haut droit
		carModel.children[15].material = screwMaterialTop;//vis haut casque
		carModel.children[16].material = screwMaterialTop;//vis centre casque
		carModel.children[30].material = screwMaterialTop;//rondelle haut centre
		carModel.children[17].material = screwMaterialTop;//vis gauche casque
		carModel.children[28].material = screwMaterialTop;//rondelle haut gauche
		carModel.children[21].material = screwMaterialDown1;//vis gauche chainguard
		carModel.children[22].material = screwMaterialDown2;//vis gauche chainguard
		carModel.children[27].material = screwMaterialDown1;//rondelle gauche chainguard
		carModel.children[23].material = screwMaterialDown1;//vis droit chainguard
		carModel.children[24].material = screwMaterialDown2;//vis droit chainguard
		carModel.children[26].material = screwMaterialDown2;//rondelle droit chainguard
		carModel.children[31].material = screwMaterialDown1;//rondelle bas chainguard gauche
		carModel.children[32].material = screwMaterialDown1;//rondelle bas chainguard droit
		carModel.children[35].material = screwMaterialDown1;//rondelle bas droit
		carModel.children[36].material = screwMaterialDown2;//rondelle bas droit
		carModel.children[37].material = screwMaterialDown1;//rondelle bas gauche
		carModel.children[38].material = screwMaterialDown2;//rondelle bas gauche
		//Logo
		carModel.children[12].material = LogoVeldt;	
		carModel.children[12].position.set(0,0,1);
		carModel.children[10].material = screwMaterialTop;//trou gauche visiere
		carModel.children[11].material = screwMaterialTop;//trou gauche visiere
		carModel.children[19].visible = false;
		carModel.children[20].visible = false;
		carModel.rotation.z += 1
		scene.add(carModel);
		rotateObject(carModel)
		
	},
	
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  }, 

  function (error) {
    console.log('An error happened = ', error);
  }
); */

function rotateObject(carModel) {
	/* setInterval(()=>carModel.rotation.z += 0.001, 10)	 */
	animate()
}
	function animate() {
		requestAnimationFrame( animate );
		
		render();
	}
	function render() {
    renderer.render(scene, camera);
	}
	
	/* if(ambientLightController.openclose === true ){
		scene.fog = new Fog(sceneController.fogColor,sceneController.fogNear,sceneController.fogFar)}
	else {
		scene.fog =null;
	} */
	/* console.log(scene) */
/* 	renderer.render(scene, camera);
} */


}

// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(/* time ,*//* veldtOBJ(), */ veldt(),menuOpen(),menuElement(), menuSite())