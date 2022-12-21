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
      piece.position.z = -0.05;
      piece.scale.z = 0;
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

    const pieceDuration = 5;
    let maxDelay = 0;
    this.pieces.forEach((piece, index) => {
      const delay = Math.random() * 0.01;
      if (delay > maxDelay) {
        maxDelay = delay;
      }
      this.timeline.to(
        piece.scale,
        {
          keyframes: [
            { z: 1 },
            { z: 0.5 },
            { z: 1.1 },
            { z: 0.3 },
            { z: 0.9 },
            { z: 0.2 },
            { z: 1.2 },
            { z: 0.6 },
            { z: 1 },
            { z: 0 },
          ],
          ease: 'power1.inOut',
          duration: pieceDuration,
          delay: delay,
        },
        index === 0 ? '' : '<'
      );
    });

    // this.timeline.to(this.manager.camera.perspectiveCamera.)

    this.timeline.to(
      this.manager.world.model.modelGroup.rotation,
      { z: Math.PI * 1.3, duration: pieceDuration + maxDelay },
      '<'
    );

    this.pieces.forEach((piece) => {
      this.timeline.set(piece, { visible: false });
    });

    return this.timeline;
  }
}
