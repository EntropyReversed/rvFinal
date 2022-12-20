import * as THREE from 'three';
import Manager from '../Manager';
import gsap from 'gsap';
import { GUI } from 'dat.gui';

export default class Enviroment {
  constructor() {
    this.manager = new Manager();
    this.scene = this.manager.scene;

    this.setSunlight();
  }

  setSunlight() {
    this.sunLightTarget = new THREE.Object3D();
    this.sunLightTarget.position.x = -1.3;
    this.sunLightTarget.position.y = 3.3;
    this.sunLightTarget.position.z = -1.4;

    this.sunLight = new THREE.DirectionalLight('#ffffff', 1);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 60;
    this.sunLight.shadow.mapSize.set(4096, 4096);
    this.sunLight.shadow.normalBias = 0.1;
    this.sunLight.shadow.bias = 0.001;
    this.sunLight.position.set(-2.1, 7.4, -5.2);
    this.sunLight.target = this.sunLightTarget;

    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);

    this.scene.add(this.sunLightTarget);
    this.scene.add(this.sunLight);

    this.spotLight = new THREE.SpotLight('#ffffff', 1.5);
    this.spotLight.position.set(-3, 3, 8);
    this.scene.add(this.spotLight);

    this.ambientlight = new THREE.AmbientLight('#ffffff', 1.2);
    this.scene.add(this.ambientlight);

    // const gui = new GUI();
    // const lightFolder2 = gui.addFolder('DirLight');

    // lightFolder2.add(this.sunLight.position, 'x', -80, 80);
    // lightFolder2.add(this.sunLight.position, 'y', -80, 80);
    // lightFolder2.add(this.sunLight.position, 'z', -80, 80);

    // const lightFolder = gui.addFolder('SpotLight');

    // lightFolder.add(this.sunLightTarget.position, 'x', -80, 80, 0.1);
    // lightFolder.add(this.sunLightTarget.position, 'y', -80, 80, 0.1);
    // lightFolder.add(this.sunLightTarget.position, 'z', -80, 80, 0.1);
    // lightFolder.open();

    // lightFolder2.open();
  }
}
