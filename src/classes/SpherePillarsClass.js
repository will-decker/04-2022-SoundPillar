import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

class SpherePillarsClass {
  constructor() {
    this.bind();
    this.modelLoader = new GLTFLoader();
    this.texLoader = new THREE.TextureLoader();
  }

  init(scene) {
    this.scene = scene;

    const gTex = this.texLoader.load('./assets/textures/greyMetal.png');
    const bTex = this.texLoader.load('./assets/textures/blackMetal.png');

    this.gMatCap = new THREE.MeshMatcapMaterial({ matcap: gTex });
    this.bMatCap = new THREE.MeshMatcapMaterial({ matcap: bTex });

    this.modelLoader.load('./assets/models/pillar.glb', (glb) => {
      console.log(glb);
      glb.scene.traverse((child) => {
        if (child.name == 'BASE') {
          child.material = this.bMatCap;
        }
        if (child.name == 'Cylinder') {
          child.material = this.gMatCap;
        }
      });
      this.scene.add(glb.scene);
    });
  }

  update() {}

  bind() {}
}

const _instance = new SpherePillarsClass();
export default _instance;
