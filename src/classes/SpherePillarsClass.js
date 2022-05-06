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
    this.upVec = new THREE.Vector3(0, 1, 0);
    this.pillars = new THREE.Group();
    this.pillar;

    const gTex = this.texLoader.load('./assets/textures/greyMetal.png');
    const bTex = this.texLoader.load('./assets/textures/blackMetal.png');

    this.gMatCap = new THREE.MeshMatcapMaterial({ matcap: gTex });
    this.bMatCap = new THREE.MeshMatcapMaterial({ matcap: bTex });

    this.modelLoader.load('./assets/models/pillar.glb', (glb) => {
      console.log(glb);
      glb.scene.traverse((child) => {
        if (child.name == 'BASE') {
          this.pillar = child;
          child.material = this.bMatCap;
        }
        if (child.name == 'Cylinder') {
          child.material = this.gMatCap;
        }
      });
      this.computePositions();
    });
  }

  computePositions() {
    const sphereGeom = new THREE.IcosahedronGeometry(2, 3);
    const sphereMat = this.gMatCap;
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    this.scene.add(sphere);
    console.log(sphereGeom);

    let verArray = [];
    for (let i = 0; i < sphereGeom.attributes.position.array.length; i += 3) {
      const x = sphereGeom.attributes.position.array[i];
      const y = sphereGeom.attributes.position.array[i + 1];
      const z = sphereGeom.attributes.position.array[i + 2];
      verArray.push({
        x: x,
        y: y,
        z: z,
      });
    }
    console.log(verArray);

    let pillPos = [];
    for (let i = 0; i < verArray.length; i++) {
      let existsFlag = false;
      for (let j = 0; j < pillPos.length; j++) {
        if (
          pillPos[j].x == verArray[i].x &&
          pillPos[j].y == verArray[i].y &&
          pillPos[j].z == verArray[i].z
        ) {
          existsFlag = true;
          console.log('hey');
        }
      }

      if (!existsFlag) {
        pillPos.push({
          x: verArray[i].x,
          y: verArray[i].y,
          z: verArray[i].z,
        });
        const c = this.pillar.clone();
        const posVec = new THREE.Vector3(
          verArray[i].x,
          verArray[i].y,
          verArray[i].z
        );
        c.position.copy(posVec);
        c.scale.multiplyScalar(0.2);
        c.quaternion.setFromUnitVectors(this.upVec, posVec.normalize());
        this.pillars.add(c);
      }
    }
    this.scene.add(this.pillars);
    console.log(pillPos);
  }

  update() {
    let i = 0;
    while (i < this.pillars.children.length) {
      this.pillars.children[i].children[0].position.y =
        (Math.sin(Date.now() * 0.005 + this.pillars.children[i].position.x) +
          1) *
        1.2;
      i++;
    }
  }

  bind() {}
}

const _instance = new SpherePillarsClass();
export default _instance;
