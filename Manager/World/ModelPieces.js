import { MeshStandardMaterial } from 'three';
import gsap from 'gsap';
import Manager from '../../Manager/Manager';

export default class ModelPieces {
  constructor(pieces, group, color) {
    this.manager = new Manager();
    this.scene = this.manager.scene;
    this.pieces = pieces;
    this.group = group;
    this.mainColor = color;
    this.material = new MeshStandardMaterial();

    this.setUpPieces();
  }

  setUpPieces() {
    this.pieces.forEach((piece) => {
      this.setModelPart(piece, 1);
      this.group.add(piece);
    });
  }

  setModelPart(part, startOp = 0, shade = false) {
    part.material = this.material.clone();
    part.visible = false;
    part.material.transparent = true;
    part.material.color = this.mainColor;

    part.material.opacity = startOp;
    part.material.metalness = 0.97;
    part.material.roughness = 0.1;

    part.material.flatShading = shade;
    part.material.needsUpdate = true;

    part.receiveShadow = true;
    part.castShadow = true;
  }

  getTimeline() {
    this.timeline = gsap.timeline();
    this.pieces.forEach((piece) => {
      this.timeline.set(piece, { visible: true });
    });

    this.pieces.forEach((piece) => {
      this.timeline.fromTo(piece.scale, { z: 0 }, { z: 1 }, '<');
    });

    return this.timeline;
  }
}
