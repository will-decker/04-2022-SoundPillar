import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

class SpherePillarsClass {
  constructor() {
    this.bind();
    this.modelLoader = new GLTFLoader();
  }

  init(scene) {
    this.scene = scene;
    this.modelLoader.load('./assets/models/pillar.glb', (glb) => {
      console.log(glb);
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshNormalMaterial();
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
