import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import Manager from '../Manager';

export default class Resources {
  constructor(assets) {
    this.manager = new Manager();
    this.renderer = this.manager.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();

    this.loaders.dracoLoader.setDecoderPath(
      '../node_modules/three/examples/js/libs/draco/gltf/'
    );
    this.loaders.dracoLoader.setDecoderConfig({ type: 'js' });
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }

      // if (asset.type === 'image') {
      //   this.loaders.textureLoader.load(asset.path, (file) => {
      //     this.singleAssetLoaded(asset, file);
      //   });
      // }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      setTimeout(() => {
        this.manager.parent.dispatchEvent(new Event('ready'));
        document.body.classList.remove('loading');
      }, 500);
    }
  }
}
