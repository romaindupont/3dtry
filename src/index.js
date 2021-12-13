import './styles/main.scss';
/* import { menu, menu1, triangle } from './js/menu.js'; */
import * as THREE from 'three';
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

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
	const directionalLight = new THREE.DirectionalLight( 0x404040, 2);
	directionalLight.position.set(0, 1, 0);
	scene.add( directionalLight );
	const textureBody = new THREE.TextureLoader();
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
		clearcoat: 0.3, clearcoatRoughness: 0.6, side: THREE.DoubleSide, map:carbonBaseColor, bumpMap:carbonBump, normalMap:carbonNormal, roughnessMap:carbonRouhness, displacementMap:carbonHeight, clearcoatMap:carbonanistroAngle , clearcoatNormalMap:carbonanistroLevel, ior:3
	});
	const AttachVisor = new THREE.MeshPhysicalMaterial({
		color: 0x222222, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.16, reflectivity: 0.148
	})
	const LogoVeldt = new THREE.MeshPhysicalMaterial({
		color: 0xffffff, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5, clearcoat: 0.6, clearcoatRoughness: 0.16, reflectivity: 0.148
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
		/* animate() */
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  }, 

  function (error) {
    console.log('An error happened = ', error);
  }
);
function rotateObject(carModel) {
	setInterval(()=>carModel.rotation.z += 0.01, 100)	
	animate()
}
	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	function render() {

    renderer.render(scene, camera);
	}
}


// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(veldt(),menuOpen(),menuElement())