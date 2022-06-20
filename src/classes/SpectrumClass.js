import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

class Spectrum {
  constructor() {
    this.bind();
    this.modelLoader = new GLTFLoader();
  }

  init(scene) {
    this.scene = scene;

    this.modelLoader.load('./assets/models/spectrum.glb', (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshNormalMaterial();
          child.scale.multiplyScalar(2.8);
          child.position.y = -3;
        }
      });
      this.scene.add(glb.scene);
    });
  }

  update() {}

  bind() {}
}

const _instance = new Spectrum();
export default _instance;
