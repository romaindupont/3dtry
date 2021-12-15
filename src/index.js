import './styles/main.scss';
/* import { menu, menu1, triangle } from './js/menu.js'; */
import * as THREE from 'three';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Vector2 } from 'three';
import { Fog } from 'three';

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
	const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(render);
  renderer.outputEncoding = THREE.RGBDEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);
	THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 0, 1 );
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1500);
	
	camera.position.set(50, -800, 100 );
	camera.lookAt(0, 0, 1)
  const controls = new OrbitControls(camera, container);
  controls.target.set(50, 0, 0);
  controls.minDistance = 100;
	controls.maxDistance = 1100;
	controls.update();  
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f7f7);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
	
	const directionalLight = new THREE.DirectionalLight( 0x0c0c0c, 3);
	directionalLight.position.set(0, 1, 0);
	scene.add( directionalLight );
	const ambientLight = new THREE.AmbientLight(null, 0);
	const hemisphereLight = new THREE.HemisphereLight(null,null,0);
	const Light = new THREE.Light();

	const PointLight = new THREE.PointLight(null, 0, 0);
	const RectAreaLight = new THREE.RectAreaLight(null, 0,0,0,0);
	const SpotLight = new THREE.SpotLight(null, 0, 0, Math.PI/3, 0.0, 0);
	scene.add( ambientLight,hemisphereLight,Light,PointLight,	RectAreaLight, SpotLight );


	const textureBody = new THREE.TextureLoader();
	const svgLoad = new SVGLoader();
	const carbonBaseColor = textureBody.load('../src/assets/textures/carbon_fibers_basecolor_1k.jpg', function (map) {
		map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 5;
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
    map.repeat.set(60, 60);})
	const screwDiplacement = textureBody.load('../src/assets/textures/metalVis/Metal011_1K_Displacement.jpg')
	const screwMetalness = textureBody.load('../src/assets/textures/metalVis/Metal011_1K_Metalness.jpg')
	const screwNormalDX = textureBody.load('../src/assets/textures/metalVis/Metal011_1K_NormalDX.jpg')
	const screwRoughness = textureBody.load('../src/assets/textures/metalVis/Metal011_1K_Roughness.jpg')
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
	
	/* const racing = svgLoad.load('../src/assets/images/racing.svg', function (map) {
		const paths = map.paths;
		const group = new THREE.Group();
		group.position.set(100,0,-50)
		for ( let i = 0; i < paths.length; i ++ ) {
			const path = paths[ i ];
			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			})
			const shapes = SVGLoader.createShapes( path );
			for ( let j = 0; j < shapes.length; j ++ ) {
				const shape = shapes[ j ];
				const geometry = new THREE.ShapeGeometry( shape );
				const mesh = new THREE.Mesh( geometry, material );
				group.add( mesh );
			}
		}
		scene.add( group );
	}) */

	const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0, transmission: 0.9, transparent: true
  });
	const chainguardMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x183679 , metalness: 0.6, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.16, transparent: false, side: THREE.DoubleSide, reflectivity: 0.148
	});
	const screwMaterialTop = new THREE.MeshPhysicalMaterial({
		 side: THREE.DoubleSide, map:ScrewBaseColor,displacementMap:screwDiplacement,roughnessMap:screwRoughness,metalnessMap:screwMetalness, normalMap:screwNormalDX
	});

	const screwMaterialDown1 = new THREE.MeshPhysicalMaterial({
		side: THREE.DoubleSide, map:ScrewBaseColor,displacementMap:screwDiplacement,roughnessMap:screwRoughness,metalnessMap:screwMetalness, normalMap:screwNormalDX
 });
 const screwMaterialDown2 = new THREE.MeshPhysicalMaterial({
	side: THREE.DoubleSide, map:ScrewBaseColor,displacementMap:screwDiplacement,roughnessMap:screwRoughness,metalnessMap:screwMetalness, normalMap:screwNormalDX
});

	const rubberMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x222222 ,side: THREE.DoubleSide, reflectivity: 0, map:rubberMap, roughnessMap:rubberRoughness,roughness:0.5, normalMap: rubberNormal, metalnessMap: rubberMetalness, metalness: 0.9
	});
	const rubberChinguardMaterial = new THREE.MeshPhysicalMaterial({
		color: 0x222222 ,side: THREE.DoubleSide, reflectivity: 0, map:rubberMap, roughnessMap:rubberRoughness,roughness:0.5, normalMap: rubberNormal, metalnessMap: rubberMetalness, metalness: 0.9
	});
	const bodyMaterial = new THREE.MeshPhysicalMaterial({
		/* clearcoat: 0.3, clearcoatRoughness: 0.6, */ side: THREE.DoubleSide,/* , map:carbonBaseColor, bumpMap:carbonBump, normalMap:carbonNormal, roughnessMap:carbonRouhness, displacementMap:carbonHeight, clearcoatMap:carbonanistroAngle , 
		clearcoatNormalMap:carbonanistroLevel, ior:3 */
		color: 0xffffff,
		metalness: 0.2,
		roughness: 0.5,
		clearcoat: 0.3,
		clearcoatRoughness: 0.1,
		map: carbonTryMap,
		normalMap: carbonNormalMap,
		ior:1.39,
		lightMapIntensity: 1
	});
	const AttachVisor = new THREE.MeshPhysicalMaterial({
		color: 0x222222, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.16, reflectivity: 0.148
	})
	const LogoVeldt = new THREE.MeshPhysicalMaterial({
		color: 0xcccccc, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.16, reflectivity: 0.148
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
		bodyMaterial.metalness=0.3;
		bodyMaterial.roughness=0.2;
		bodyMaterial.clearcoat=0.8;
		bodyMaterial.clearcoatRoughness=0.8;
		bodyMaterial.reflectivity=0.6;
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
		bodyMaterial.metalness=0;
		bodyMaterial.roughness=1;
		bodyMaterial.clearcoat=0.3;
		bodyMaterial.clearcoatRoughness=0.6;
		bodyMaterial.reflectivity=0;
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
		bodyMaterial.metalness=0.8;
		bodyMaterial.roughness=0.2;
		bodyMaterial.clearcoat=0.8;
		bodyMaterial.clearcoatRoughness=0.2;
		bodyMaterial.reflectivity=0.6;
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
  loader.load('../src/assets/3d/test_full4.3dm', function (gltf) {
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
	/* carModel.children[25].material = bodyMaterialTry; */
		//chinguard
		carModel.children[18].material = chainguardMaterial;
		//rubber
		carModel.children[2].material = rubberChinguardMaterial;//rubber chainguard haut
		carModel.children[3].material = rubberChinguardMaterial;//rubber chainguard bas
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
		carModel.children[10].material = screwMaterialTop;//trou gauche visiere
		carModel.children[11].material = screwMaterialTop;//trou gauche visiere
		carModel.children[19].visible = false;
		carModel.children[20].visible = false;
		/* 
		carModel.children[5].visible = false;//
		carModel.children[6].visible = false;//
		carModel.children[7].visible = false;//
		carModel.children[8].visible = false;//
		carModel.children[11].visible = false;//
		carModel.children[19].visible = false;//
		carModel.children[20].visible = false;//
		*/
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
);
function setupGui() {
	sceneController = {
		sceneBg: '#f4f7f7',
		fog: null,
		fogColor: '#FFFFFF',
		fogNear: 0,
		fogFar: 2500,
		environment: null,
		fogYN: false,
	};
	effectController = {
		color: 0xffffff,
		metalness: 0.2,
		roughness: 0.5,
		clearcoat: 0.3,
		clearcoatRoughness: 0.1,
		ior: 1.39,
		lightMapIntensity: 1,
		reflectivity: 0.5,
		sheen: 0.0,
		sheenRoughness: 1.0,
		sheenColor:'#ffffff',
		transmission: 0.0,
		alphaTest: 0.0,
		opacity: 1.0,
		bumpScale: 1.0,
		emissive:'#000000',
		blendDst : THREE.OneMinusSrcAlphaFactor,
		blendEquation: THREE.AddEquation,
		blendSrc:THREE.SrcAlphaFactor,
		blending: THREE.NormalBlending,
		clipIntersection: false,
		clipShadows: false,
		clippingPlanes: [],
		colorWrite: true,
		depthTest: true,
		depthWrite: true,
		depthFunc: THREE.LessEqualDepth,
		format: THREE.RGBAFormat,
		stencilWrite: false,
		stencilWriteMask: 0xFF,
		stencilFunc: THREE.AlwaysStencilFunc,
		stencilRef: 0,
		stencilFuncMask: 0xFF,
		stencilFail: THREE.KeepStencilOp,
		stencilZFail: THREE.KeepStencilOp,
		stencilZPass: THREE.KeepStencilOp,
		fog: true,
		polygonOffset: false,
		polygonOffsetFactor: 0,
		polygonOffsetUnits: 0,
		precision: null,
		premultipliedAlpha: false,
		dithering: false,
		shadowSide: null,
		side: THREE.DoubleSide,
		toneMapped: true,
		transparent: false,
		wrapS: THREE.ClampToEdgeWrapping,
		wrapT: THREE.ClampToEdgeWrapping,
		mapping: THREE.UVMapping,
		magFilter: THREE.LinearFilter,
		minFilter: THREE.LinearFilter,
		type: THREE.UnsignedByteType,
		offsetx: 0,
		offsety: 0,
		formatMap: THREE.RGBAFormat,
		anisotropy: 0,
		repeatx: 60,
		repeaty: 30,
		rotation: 360,
		centerx: -0.2,
		centery: -0.2,
		generateMipmaps: true,
		premultiplyAlpha: false,
		flipY: true,
		unpackAlignment: 4,
		encoding: THREE.LinearEncoding,
		clearcoatMap: null,
		clearcoatNormalMap: null,
		clearcoatNormalScaleX: 1,
		clearcoatNormalScaleY: 1,
		clearcoatRoughnessMap: null,
		sheenColorMap: null,
		transmissionMap: null,
		alphaMap: null,
		aoMap: null,
		aoMapIntensity: 1,
		bumMap: null,
		sheenRoughnessMap: null,
		displacementMap: null,
		displacementScale: 1,
		displacementBias: 0,
		emissiveMap: null,
		emissiveIntensity: 1,
		envMap: null,
		envMapIntensity: 0,
		flatShading: false,
		lightMap: null,
		map: null,
		metalnessMap: null,
		normalMap: null,
		normalMapType: THREE.TangentSpaceNormalMap,
		normalScaleX: 1,
		normalScaleY: 1,
		refractionRatio: 0.98,
		roughnessMap: null,
		wireframe: false,
		wireframeLinecap: 'round',
		wireframeLinejoin: 'round',
		wireframeLinewidth: 1,
	};
	ambientLightController = {
		color: 0xffffff,
		intensity: 0,
		openclose: false,
	};
	directionalLightController = {
		color: '#0c0c0c',
		intensity: 3,
		castShadow: false,
		positionX: 0,
		positionY: 1,
		positionZ: 0,
		targetX: 0,
		targetY: 0,
		targetZ: 0,
		openclose: true,
	};
	hemisphereLightController = {
		skyColor: 0xffffff,
		groundColor: 0xffffff,
		intensity: 0,
		positionX: 0,
		positionY: 1,
		positionZ: 0,
		openclose: false,
	};
	LightController = {
		color: 0xffffff,
		intensity: 0,
		openclose: false,
	};
	pointLightController = {
		color: 0xffffff,
		intensity: 0,
		distance:0.0,
		decay:0,
		power: 0,
		openclose: false,

	};
	rectAreaLightLightController = {
		color: 0xffffff,
		intensity: 0,
		width: 0,
		height: 0,
		power: 0,
		openclose: false,
	};
	spotLightController = {
		color: 0xffffff,
		intensity: 0,
		distance:0.0,
		decay:0,
		angle: Math.PI/3,
		penumbra: 0,
		positionX: 0,
		positionY: 1,
		positionZ: 0,
		targetX: 0,
		targetY: 0,
		targetZ: 0,
		openclose: false,

	};

	let h;
	let blend;
	let clip;
	let depth;
	let format;
	let stencil;
	let materialProperties;
	let textureImpact;
	let textureMap;
	let toConnect;
	let sceneChange;
	let lightFolder;
	let ambientLightFolder;
	let directionalLightFolder;
	let hemisphereLightFolder;
	let LightFolder;
	let pointLightFolder;
	let rectAreaLightFolder;
	let spotLightFolder;

	//Blend
	const blenDstType = { OneMinusSrcAlphaFactor: THREE.OneMinusSrcAlphaFactor, ZeroFactor: THREE.ZeroFactor, OneFactor: THREE.OneFactor, SrcColorFactor: THREE.SrcColorFactor, OneMinusSrcColorFactor: THREE.OneMinusSrcColorFactor, SrcAlphaFactor: THREE.SrcAlphaFactor, DstAlphaFactor: THREE.DstAlphaFactor, OneMinusDstAlphaFactor: THREE.OneMinusDstAlphaFactor, DstColorFactor: THREE.DstColorFactor, OneMinusDstColorFactor: THREE.OneMinusDstColorFactor, SrcAlphaSaturateFactor: THREE.SrcAlphaSaturateFactor };
	const blendEquation = { AddEquation: THREE.AddEquation, SubtractEquation: THREE.SubtractEquation, ReverseSubtractEquation: THREE.ReverseSubtractEquation, MinEquation: THREE.MinEquation, MaxEquation: THREE.MaxEquation }
	const blending = { NoBlending: THREE.NoBlending, NormalBlending: THREE.NormalBlending, AdditiveBlending: THREE.AdditiveBlending, SubtractiveBlending: THREE.SubtractiveBlending, MultiplyBlending: THREE.MultiplyBlending, CustomBlending: THREE.CustomBlending }
	const blendSrc = { OneMinusSrcAlphaFactor: THREE.OneMinusSrcAlphaFactor, ZeroFactor: THREE.ZeroFactor, OneFactor: THREE.OneFactor, SrcColorFactor: THREE.SrcColorFactor, OneMinusSrcColorFactor: THREE.OneMinusSrcColorFactor, SrcAlphaFactor: THREE.SrcAlphaFactor, DstAlphaFactor: THREE.DstAlphaFactor, OneMinusDstAlphaFactor: THREE.OneMinusDstAlphaFactor, DstColorFactor: THREE.DstColorFactor, OneMinusDstColorFactor: THREE.OneMinusDstColorFactor, SrcAlphaSaturateFactor: THREE.SrcAlphaSaturateFactor };
	const depthFunc = { NeverDepth: THREE.NeverDepth, AlwaysDepth: THREE.AlwaysDepth, EqualDepth: THREE.EqualDepth, LessDepth: THREE.LessDepth, LessEqualDepth: THREE.LessEqualDepth,GreaterEqualDepth: THREE.GreaterEqualDepth,GreaterDepth: THREE.GreaterDepth,NotEqualDepth: THREE.NotEqualDepth }
	const formatList = { AlphaFormat: THREE.AlphaFormat, RedFormat: THREE.RedFormat, RedIntegerFormat: THREE.RedIntegerFormat, RGFormat: THREE.RGFormat, RGIntegerFormat: THREE.RGIntegerFormat, RGBFormat: THREE.RGBFormat, RGBIntegerFormat: THREE.RGBIntegerFormat, RGBAFormat: THREE.RGBAFormat, RGBAIntegerFormat: THREE.RGBAIntegerFormat, LuminanceFormat: THREE.LuminanceFormat, LuminanceAlphaFormat: THREE.LuminanceAlphaFormat, RGBEFormat: THREE.RGBEFormat, DepthFormat: THREE.DepthFormat, DepthStencilFormat: THREE.DepthStencilFormat }
	const stencilFuncList = { NeverStencilFunc: THREE.NeverStencilFunc, LessStencilFunc: THREE.LessStencilFunc, EqualStencilFunc: THREE.EqualStencilFunc, LessEqualStencilFunc: THREE.LessEqualStencilFunc, GreaterStencilFunc: THREE.GreaterStencilFunc, NotEqualStencilFunc: THREE.NotEqualStencilFunc, GreaterEqualStencilFunc: THREE.GreaterEqualStencilFunc, AlwaysStencilFunc: THREE.AlwaysStencilFunc }
	const stencilFail = { ZeroStencilOp: THREE.ZeroStencilOp, KeepStencilOp: THREE.KeepStencilOp, ReplaceStencilOp: THREE.ReplaceStencilOp, IncrementStencilOp: THREE.IncrementStencilOp, DecrementStencilOp: THREE.DecrementStencilOp, IncrementWrapStencilOp: THREE.IncrementWrapStencilOp, DecrementWrapStencilOp: THREE.DecrementWrapStencilOp, InvertStencilOp: THREE.InvertStencilOp }
	const precision = { null: null, highp: 'highp', mediump: 'mediump', lowp: 'lowp' }
	const shadowSide = { null: null, FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide }
	const side = { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide }
	const wrapSTList = { RepeatWrapping: THREE.RepeatWrapping, ClampToEdgeWrapping: THREE.ClampToEdgeWrapping, MirroredRepeatWrapping: THREE.MirroredRepeatWrapping }
	const mapping = { UVMapping: THREE.UVMapping, CubeReflectionMapping: THREE.CubeReflectionMapping, CubeRefractionMapping: THREE.CubeRefractionMapping, EquirectangularReflectionMapping: THREE.EquirectangularReflectionMapping,EquirectangularRefractionMapping: THREE.EquirectangularRefractionMapping, CubeUVReflectionMapping: THREE.CubeUVReflectionMapping, CubeUVRefractionMapping: THREE.CubeUVRefractionMapping }
	const magFilter = { LinearFilter: THREE.LinearFilter, NearestFilter: THREE.NearestFilter }
	const minFilter = { LinearFilter: THREE.LinearFilter, NearestFilter: THREE.NearestFilter, NearestMipmapNearestFilter: THREE.NearestMipmapNearestFilter, NearestMipmapLinearFilter: THREE.NearestMipmapLinearFilter, LinearFilter: THREE.LinearFilter, LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter, LinearMipmapLinearFilter: THREE.LinearMipmapLinearFilter }
	const type = { UnsignedShortType: THREE.UnsignedShortType, UnsignedIntType: THREE.UnsignedIntType, UnsignedInt248Type: THREE.UnsignedInt248Type };
	const unpackAlignment = { byteAlignment: 1, rowsAlignedToEvenNumberedBytes : 2, wordAlignment : 4, rowsStartOnDoubleWordBoundaries: 8 }
	const encoding = { LinearEncoding: THREE.LinearEncoding, RGBEEncoding: THREE.RGBEEncoding, GammaEncoding: THREE.GammaEncoding, RGBEEncoding: THREE.RGBEEncoding, RGBM7Encoding: THREE.RGBM7Encoding, RGBM16Encoding: THREE.RGBM16Encoding, RGBDEncoding: THREE.RGBDEncoding, BasicDepthPacking: THREE.BasicDepthPacking, RGBADepthPacking: THREE.RGBADepthPacking }
	const normalMapType = { TangentSpaceNormalMap: THREE.TangentSpaceNormalMap, ObjectSpaceNormalMap: THREE.ObjectSpaceNormalMap }
	const wireframeLinecap = { butt: 'butt', round: 'round', square: 'square' }
	const wireframeLinejoin = { round: 'round', bevel: 'bevel', miter: 'miter' }
	const bulbLuminousPowers = {
		"110000 lm (1000W)": 110000,
		"3500 lm (300W)": 3500,
		"1700 lm (100W)": 1700,
		"800 lm (60W)": 800,
		"400 lm (40W)": 400,
		"180 lm (25W)": 180,
		"20 lm (4W)": 20,
		"Off": 0
	};
	const gui = new GUI();
	
	h = gui.addFolder( 'Material shell control' ).close();
	h.addColor(effectController, 'color').onChange( render )
	h.add( effectController, 'metalness', 0.0, 1.0, 0.05 ).name( 'metalness' ).onChange( render );
	h.add( effectController, 'roughness', 0.0, 1.0, 0.025 ).name( 'roughness' ).onChange( render );
	h.add( effectController, 'clearcoat', 0.0, 1.0, 0.025 ).name( 'clearcoat' ).onChange( render );
	h.add( effectController, 'clearcoatRoughness', 0.0, 1.0, 0.025 ).name( 'clearcoatRoughness' ).onChange( render );
	h.add( effectController, 'ior', 1.0, 2.333, 0.025 ).name( 'ior' ).onChange( render );
	h.add( effectController, 'lightMapIntensity', 0.0, 1000, 10 ).name( 'lightMapIntensity' ).onChange( render );
	h.add( effectController, 'reflectivity', 0.0, 1.0, 0.025 ).name( 'reflectivity' ).onChange( render );
	h.addColor(effectController, 'sheenColor').onChange( render )
	h.add( effectController, 'sheen', 0.0, 1.0, 0.025 ).name( 'sheen' ).onChange( render );
	h.add( effectController, 'sheenRoughness', 0.0, 1.0, 0.025 ).name( 'sheenRoughness' ).onChange( render );
	h.add( effectController, 'transmission', 0.0, 1.0, 0.025 ).name( 'transmission' ).onChange( render );
	h.add( effectController, 'alphaTest', 0.0, 1.0, 0.025 ).name( 'alphaTest' ).onChange( render );
	h.add( effectController, 'bumpScale', 0.0, 1.0, 0.025 ).name( 'bumpScale' ).onChange( render );
	h.addColor( effectController, 'emissive').onChange( render );
	
	blend = gui.addFolder( 'Blending' ).close();
	const objBlend = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/materials/Material.blendDst',
		'_blank'
	);}};
	blend.add(objBlend,'add').name( 'Documentation' );
	blend.add( effectController,'blendDst',blenDstType).onChange( render ); 
	blend.add( effectController,'blendEquation',blendEquation).onChange( render ); 
	blend.add( effectController,'blending',blending).onChange( render ); 
	blend.add( effectController,'blendSrc',blendSrc).onChange( render ); 
	clip = gui.addFolder( 'Clip' ).close();
	const objClip = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/materials/Material.clipIntersection',
		'_blank'
	);}};
	clip.add(objClip,'add').name( 'Documentation' );
	clip.add( effectController,'clipIntersection',[true, false]).onChange( render ); 
	clip.add( effectController,'clipShadows',[true, false]).onChange( render ); 
	clip.add( effectController,'clippingPlanes',[]).onChange( render );
	depth = gui.addFolder( 'Depth' ).close();
	const objDepth = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/materials/Material.depthFunc',
		'_blank'
	);}};
	depth.add(objDepth,'add').name( 'Documentation' );
	depth.add( effectController,'colorWrite',[true, false]).onChange( render ); 
	depth.add( effectController,'depthTest',[true, false]).onChange( render ); 
	depth.add( effectController,'depthWrite',[true, false]).onChange( render ); 
	depth.add( effectController,'depthFunc',depthFunc).onChange( render ); 
	format = gui.addFolder( 'Format' ).close();
	const objFormat = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/constants/Textures',
		'_blank'
	);}};
	format.add(objFormat, 'add').name( 'Documentation' );
	format.add( effectController, 'format', formatList).onChange( render ); 
	stencil = gui.addFolder( 'Stencil' ).close();
	const objStencil = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/materials/Material.stencilWrite',
		'_blank'
	);}};
	stencil.add(objStencil,'add').name( 'Documentation' );
	stencil.add( effectController,'stencilWrite',[true, false]).onChange( render ); 
	stencil.add(effectController, 'stencilWriteMask').onChange( render )
	stencil.add( effectController,'stencilFunc',stencilFuncList).onChange( render ); 
	stencil.add( effectController, 'stencilRef', 0, 1, 1 ).name( 'stencilRef' ).onChange( render );
	stencil.add(effectController, 'stencilFuncMask').onChange( render );
	stencil.add( effectController,'stencilFail',stencilFail).onChange( render ); 
	stencil.add( effectController,'stencilZFail',stencilFail).onChange( render ); 
	stencil.add( effectController,'stancilZPass',stencilFail).onChange( render ); 
	materialProperties = gui.addFolder( 'Material Properties' ).close();
	const objMatProp = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/materials/Material.fog',
		'_blank'
	);}};
	materialProperties.add(objMatProp, 'add').name( 'Documentation' );
	materialProperties.add( effectController, 'opacity', 0.0, 1.0, 0.025 ).name( 'opacity' ).onChange( render );
	materialProperties.add( effectController,'fog',[true, false]).onChange( render ); 
	materialProperties.add( effectController,'polygonOffset',[true, false]).onChange( render );
	materialProperties.add( effectController, 'polygonOffsetFactor', 0, 100, 1 ).onChange( render );
	materialProperties.add( effectController, 'polygonOffsetUnits', 0, 100, 1 ).onChange( render );
	materialProperties.add( effectController,'precision',precision).onChange( render ); 
	materialProperties.add( effectController,'premultipliedAlpha',[true, false]).onChange( render );
	materialProperties.add( effectController,'dithering',[true, false]).onChange( render );
	materialProperties.add( effectController,'shadowSide',shadowSide).onChange( render ); 
	materialProperties.add( effectController,'side',side).onChange( render ); 
	materialProperties.add( effectController,'toneMapped',[true, false]).onChange( render );
	materialProperties.add( effectController,'transparent',[true, false]).onChange( render );
	textureImpact = gui.addFolder( 'Textures Impact' ).close();
	const objtextImp = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/textures/Texture',
		'_blank'
	);}};
	textureImpact.add(objtextImp, 'add').name( 'Documentation' );
	textureImpact.add( effectController,'wrapS',wrapSTList).onChange( render ); 
 	textureImpact.add( effectController,'wrapT',wrapSTList).onChange( render );
	textureImpact.add( effectController,'mapping',mapping).onChange( render );
	textureImpact.add( effectController,'magFilter',magFilter).onChange( render );
	textureImpact.add( effectController,'minFilter',minFilter).onChange( render );
	textureImpact.add( effectController,'type',type).onChange( render );
	textureImpact.add( effectController, 'offsetx', 0.0, 1.0, 0.025 ).name( 'offset.x' ).onChange( render );
	textureImpact.add( effectController, 'offsety', 0.0, 1.0, 0.025 ).name( 'offset.y' ).onChange( render );
	textureImpact.add( effectController,'formatMap',format).onChange( render );
	textureImpact.add( effectController, 'anisotropy', 0, 100, 1 ).name( 'anisotropy' ).onChange( render );
	textureImpact.add( effectController, 'repeatx', 0, 200, 1 ).name( 'repeatx' ).onChange( render );
	textureImpact.add( effectController, 'repeaty', 0, 200, 1 ).name( 'repeaty' ).onChange( render );
	textureImpact.add( effectController, 'rotation', 0, 360, 1 ).name( 'rotation' ).onChange( render );
	textureImpact.add( effectController, 'centerx', 0.0, 1.0, 0.025 ).name( 'centerx' ).onChange( render );
	textureImpact.add( effectController, 'centery', 0.0, 1.0, 0.025 ).name( 'centery' ).onChange( render );
	textureImpact.add( effectController,'generateMipmaps',[true, false]).onChange( render );
	textureImpact.add( effectController,'premultiplyAlpha',[true, false]).onChange( render );
	textureImpact.add( effectController,'flipY',[true, false]).onChange( render );
	textureImpact.add( effectController,'unpackAlignment',unpackAlignment).onChange( render );
	textureImpact.add( effectController,'encoding',encoding).onChange( render );

	textureMap = gui.addFolder( 'Textures Map' ).close();
	textureMap.add( effectController, 'clearcoatNormalScaleX', 0.0, 1.0, 0.1 ).name( 'clearcoatNormalScale.x' ).onChange( render );
	textureMap.add( effectController, 'clearcoatNormalScaleY', 0.0, 1.0, 0.1 ).name( 'clearcoatNormalScale.y' ).onChange( render );
	textureMap.add( effectController, 'aoMapIntensity', 0.0, 1.0, 0.1 ).name( 'aoMapIntensity' ).onChange( render );
	textureMap.add( effectController, 'displacementScale', 0.0, 1.0, 0.1 ).name( 'displacementScale' ).onChange( render );
	textureMap.add( effectController, 'displacementBias', 0.0, 1.0, 0.1 ).name( 'displacementBias' ).onChange( render );
	textureMap.add( effectController, 'emissiveIntensity', 0, 100, 1 ).name( 'emissiveIntensity' ).onChange( render );
	textureMap.add( effectController, 'envMapIntensity', 0, 100, 1 ).name( 'envMapIntensity' ).onChange( render );
	textureMap.add( effectController,'flatShading',[true, false]).onChange( render );
	textureMap.add( effectController,'normalMapType',normalMapType).onChange( render );
	textureMap.add( effectController, 'normalScaleX', 0.0, 1.0, 0.1 ).name( 'normalScale.x' ).onChange( render );
	textureMap.add( effectController, 'normalScaleY', 0.0, 1.0, 0.1 ).name( 'normalScale.y' ).onChange( render );
	textureMap.add( effectController, 'refractionRatio', 0, 3, 0.01 ).name( 'refractionRatio' ).onChange( render );
	textureMap.add( effectController,'wireframe',[true, false]).onChange( render );
	textureMap.add( effectController, 'wireframeLinewidth', 0, 100, 1 ).name( 'wireframeLinewidth' ).onChange( render );
	textureMap.add( effectController,'wireframeLinecap',wireframeLinecap).onChange( render );
	textureMap.add( effectController,'wireframeLinejoin',wireframeLinejoin).onChange( render );

	toConnect = gui.addFolder( 'A connecter aucun impact' ).close();
	toConnect.add( effectController,'clearcoatMap',[true, false]).onChange( render );
	toConnect.add( effectController,'clearcoatNormalMap',[true, false]).onChange( render )
	toConnect.add( effectController,'clearcoatRoughnessMap',[true, false]).onChange( render );
	toConnect.add( effectController,'sheenRoughnessMap',[true, false]).onChange( render );
	toConnect.add( effectController,'sheenColorMap',[true, false]).onChange( render );
	toConnect.add( effectController,'transmissionMap',[true, false]).onChange( render );
	toConnect.add( effectController,'alphaMap',[true, false]).onChange( render );
	toConnect.add( effectController,'aoMap',[true, false]).onChange( render );
	toConnect.add( effectController,'bumpMap',[true, false]).onChange( render );
	toConnect.add( effectController,'displacementMap',[true, false]).onChange( render );
	toConnect.add( effectController,'emissiveMap',[true, false]).onChange( render );
	toConnect.add( effectController,'lightMap',[true, false]).onChange( render );
	toConnect.add( effectController,'envMap',[true, false]).onChange( render );
	toConnect.add( effectController,'map',[true, false]).onChange( render );
	toConnect.add( effectController,'metalnessMap',[true, false]).onChange( render );
	toConnect.add( effectController,'normalMap',[true, false]).onChange( render );
	toConnect.add( effectController,'roughnessMap',[true, false]).onChange( render );
	

	sceneChange = gui.addFolder( 'Scene Change' ).close();
	const objScene = { add:function(){ window.open(
		'https://threejs.org/docs/#api/en/scenes/Scene.environment',
		'_blank'
	);}};
	sceneChange.add(objScene,'add').name( 'Documentation' );
	sceneChange.addColor(sceneController, 'sceneBg').onChange( render );
	sceneChange.add( sceneController,'fogYN',[true, false]).onChange( render );
	sceneChange.addColor(sceneController, 'fogColor').onChange( render );
	sceneChange.add( sceneController, 'fogNear', -100, 100, 5 ).name( 'fogNear' ).onChange( render );
	sceneChange.add( sceneController, 'fogFar', -1000, 3000, 10 ).name( 'fogFar' ).onChange( render );
	sceneChange.add( sceneController,'environment',[true, false]).onChange( render );

	lightFolder = gui.addFolder( 'Light' ).close();
	ambientLightFolder = lightFolder.addFolder( 'Ambient Light' ).close()
	ambientLightFolder.add( ambientLightController,'openclose',[true, false]).onChange( render );
	ambientLightFolder.addColor(ambientLightController, 'color').onChange( render );
	ambientLightFolder.add( ambientLightController, 'intensity', 0, 100, 1 ).onChange( render );
	directionalLightFolder = lightFolder.addFolder( 'Directional Light' ).close()
	directionalLightFolder.add( directionalLightController,'openclose',[true, false]).onChange( render );
	directionalLightFolder.addColor(directionalLightController, 'color').onChange( render );
	directionalLightFolder.add( directionalLightController, 'intensity', 0, 100, 1 ).onChange( render );
	directionalLightFolder.add( directionalLightController,'castShadow',[true, false]).onChange( render );
	directionalLightFolder.add( directionalLightController, 'positionX', 0.0, 1.0, 0.025 ).onChange( render );
	directionalLightFolder.add( directionalLightController, 'positionY', 0.0, 1.0, 0.025 ).onChange( render );
	directionalLightFolder.add( directionalLightController, 'positionZ', 0.0, 1.0, 0.025 ).onChange( render );
	directionalLightFolder.add( directionalLightController, 'targetX', 0.0, 1.0, 0.025 ).onChange( render );
	directionalLightFolder.add( directionalLightController, 'targetY', 0.0, 1.0, 0.025 ).onChange( render );
	directionalLightFolder.add( directionalLightController, 'targetZ', 0.0, 1.0, 0.025 ).onChange( render );

	hemisphereLightFolder = lightFolder.addFolder( 'Hemisphere Light' ).close();
	hemisphereLightFolder.add( hemisphereLightController,'openclose',[true, false]).onChange( render );
	hemisphereLightFolder.addColor(hemisphereLightController, 'skyColor').onChange( render );
	hemisphereLightFolder.addColor(hemisphereLightController, 'groundColor').onChange( render );
	hemisphereLightFolder.add( hemisphereLightController, 'intensity', 0, 100, 1 ).onChange( render );
	hemisphereLightFolder.add( hemisphereLightController, 'positionX', 0.0, 1.0, 0.025 ).onChange( render );
	hemisphereLightFolder.add( hemisphereLightController, 'positionY', 0.0, 1.0, 0.025 ).onChange( render );
	hemisphereLightFolder.add( hemisphereLightController, 'positionZ', 0.0, 1.0, 0.025 ).onChange( render );
	LightFolder = lightFolder.addFolder( 'Light' ).close();
	LightFolder.add( LightController,'openclose',[true, false]).onChange( render );
	LightFolder.addColor(LightController, 'color').onChange( render );
	LightFolder.add( LightController, 'intensity', 0, 100, 1 ).onChange( render );
	pointLightFolder = lightFolder.addFolder( 'Point Light' ).close()
	pointLightFolder.add( pointLightController,'openclose',[true, false]).onChange( render );
	pointLightFolder.addColor(pointLightController, 'color').onChange( render );
	pointLightFolder.add( pointLightController, 'intensity', 0, 100, 1 ).onChange( render );
	pointLightFolder.add( pointLightController, 'distance', 0.0, 100.0, 0.1 ).onChange( render );
	pointLightFolder.add( pointLightController, 'decay', 0, 100, 1 ).onChange( render );
	pointLightFolder.add( effectController,'power',bulbLuminousPowers).onChange( render );
	rectAreaLightFolder = lightFolder.addFolder( 'Rect Area Light' ).close()
/* 	rectAreaLightFolder
	rectAreaLightFolder
	rectAreaLightFolder
	rectAreaLightFolder
	rectAreaLightFolder
	rectAreaLightFolder */
	spotLightFolder = lightFolder.addFolder( 'Spot Light' ).close()
/* 	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder
	spotLightFolder */





}
function rotateObject(carModel) {
	setInterval(()=>carModel.rotation.z += 0.001, 10)	
	setupGui();
	animate()
}
	function animate() {
		requestAnimationFrame( animate );
		
		render();
	}
	function render() {
		//Material shell control
		bodyMaterial.color.set(effectController.color);
		bodyMaterial.metalness = effectController.metalness;
		bodyMaterial.roughness = effectController.roughness;
		bodyMaterial.clearcoat = effectController.clearcoat;
		bodyMaterial.clearcoatRoughness = effectController.clearcoatRoughness;
		bodyMaterial.ior = effectController.ior;
		bodyMaterial.lightMapIntensity = effectController.lightMapIntensity;
		bodyMaterial.reflectivity = effectController.reflectivity;
		bodyMaterial.sheen = effectController.sheen;
		bodyMaterial.sheenRoughness = effectController.sheenRoughness;
		bodyMaterial.sheenColor.set(effectController.sheenColor);
		bodyMaterial.transmission = effectController.transmission;
		bodyMaterial.alphaTest = effectController.alphaTest;
		bodyMaterial.bumpScale = effectController.bumpScale;
  	bodyMaterial.emissive.set(effectController.emissive);
		/* console.log(bodyMaterial) */

		//blending
		bodyMaterial.blendDst = effectController.blendDst;
		bodyMaterial.blendEquation = effectController.blendEquation;
		bodyMaterial.blending = effectController.blending;
		bodyMaterial.blendSrc = effectController.blendSrc;
		//depth
		bodyMaterial.colorWrite = effectController.colorWrite;
		bodyMaterial.depthTest = effectController.depthTest;
		bodyMaterial.depthWrite = effectController.depthWrite;
		bodyMaterial.depthFunc = effectController.depthFunc;
		//format
		bodyMaterial.format = effectController.format;
		//stencil
		bodyMaterial.stencilWrite = effectController.stencilWrite;
		bodyMaterial.stencilWriteMask = effectController.stencilWriteMask;
		bodyMaterial.stencilFunc = effectController.stencilFunc;
		bodyMaterial.stencilRef = effectController.stencilRef;
		bodyMaterial.stencilFuncMask = effectController.stencilFuncMask;
		bodyMaterial.stencilFail = effectController.stencilFail;
		bodyMaterial.stencilZFail = effectController.stencilZFail;
		bodyMaterial.stancilZPass = effectController.stancilZPass;
		//Material Properties
		bodyMaterial.opacity = effectController.opacity;
		bodyMaterial.fog = effectController.fog;
		bodyMaterial.polygonOffset = effectController.polygonOffset;
		bodyMaterial.polygonOffsetFactor = effectController.polygonOffsetFactor;
		bodyMaterial.polygonOffsetUnits = effectController.polygonOffsetUnits;
		bodyMaterial.precision = effectController.precision;
		bodyMaterial.premultipliedAlpha = effectController.premultipliedAlpha;
		bodyMaterial.dithering = effectController.dithering;
		bodyMaterial.shadowSide = effectController.shadowSide;
		bodyMaterial.side = effectController.side;
		bodyMaterial.toneMapped = effectController.toneMapped;
		bodyMaterial.transparent = effectController.transparent;
		//textures impact
		bodyMaterial.map.wrapS = effectController.wrapS;
		bodyMaterial.map.wrapT = effectController.wrapT;
		bodyMaterial.map.mapping = effectController.mapping;
		bodyMaterial.map.magFilter = effectController.magFilter;
		bodyMaterial.map.minFilter = effectController.minFilter;
		bodyMaterial.map.type = effectController.type;
		bodyMaterial.map.offset.x = effectController.offsetx;
		bodyMaterial.map.offset.y = effectController.offsety;
		bodyMaterial.map.format = effectController.formatMap;
		bodyMaterial.map.anisotropy = effectController.anisotropy;
		bodyMaterial.map.rotation = effectController.rotation; 
		bodyMaterial.map.repeat.x = effectController.repeatx;
		bodyMaterial.map.repeat.y = effectController.repeaty;
		bodyMaterial.map.center.x = effectController.centerx;
		bodyMaterial.map.center.y = effectController.centery;
		bodyMaterial.map.generateMipmaps = effectController.generateMipmaps;
		bodyMaterial.map.premultiplyAlpha = effectController.premultiplyAlpha;
		bodyMaterial.map.flipY = effectController.flipY;
		bodyMaterial.map.unpackAlignment = effectController.unpackAlignment;
		bodyMaterial.map.encoding = effectController.encoding;
		//textures Map
		bodyMaterial.map.clearcoatNormalScale = new Vector2(effectController.clearcoatNormalScaleX,effectController.clearcoatNormalScaleY);
		bodyMaterial.map.aoMapIntensity = effectController.aoMapIntensity;

		bodyMaterial.map.displacementScale = effectController.displacementScale;
		bodyMaterial.map.displacementBias = effectController.displacementBias;
		bodyMaterial.map.emissiveIntensity = effectController.emissiveIntensity;
		bodyMaterial.map.envMapIntensity = effectController.envMapIntensity;
		bodyMaterial.map.flatShading = effectController.flatShading;
		bodyMaterial.map.normalMapType = effectController.normalMapType;
		bodyMaterial.map.clearcoatNormalScale = new Vector2(effectController.normalScaleX,effectController.normalScaleY);
		bodyMaterial.map.refractionRatio = effectController.refractionRatio;
		bodyMaterial.map.wireframe = effectController.wireframe;
		bodyMaterial.map.wireframeLinewidth = effectController.wireframeLinewidth;
		bodyMaterial.map.wireframeLinecap = effectController.wireframeLinecap;
		bodyMaterial.map.wireframeLinejoin = effectController.wireframeLinejoin;

		//Scene
		scene.background.set(sceneController.sceneBg);
		if(sceneController.fogYN === true ){
			scene.fog = new Fog(sceneController.fogColor,sceneController.fogNear,sceneController.fogFar)}
		else {
			scene.fog =null;
		}
		/* console.log(scene) */
    renderer.render(scene, camera);
	}
}


// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(veldt(),menuOpen(),menuElement())