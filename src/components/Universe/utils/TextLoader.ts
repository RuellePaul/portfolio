import {DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, TextureLoader} from 'three';
import {relativeProgress} from 'src/components/Universe/utils/math';

import frag from 'src/components/Universe/shaders/text.frag';
import vert from 'src/components/Universe/shaders/plain.vert';

class Loader {
    private loader: TextureLoader;

    constructor() {
        this.loader = new TextureLoader();
    }

    load(image: string) {
        return new Promise((resolve) => {
            this.loader.load(image, resolve);
        });
    }
}

class TextLoader extends Mesh {
    public ratio: number;
    private height: number;

    constructor(image: string) {
        const geo = new PlaneGeometry(1, 1);
        const mat = new ShaderMaterial({
            uniforms: {
                tDiffuse: {
                    value: null
                },

                dark: {
                    value: 1
                },

                opacity: {
                    value: 1
                }
            },
            fragmentShader: frag,
            vertexShader: vert,
            transparent: true,
            depthWrite: true,
            depthTest: true,
            side: DoubleSide
        });

        super(geo, mat);

        this.renderOrder = 11;

        new Loader().load(image).then((image) => {
            // @ts-ignore
            this.material.uniforms.tDiffuse.value = image;
        });
    }

    setHeight = (height: number) => {
        this.height = height;
        this.resize();
    };

    resize = () => {
        const small = 320;
        const large = 1920;

        const w = Math.min(window.innerWidth, large);

        const min = 1;
        const max = 1.6;
        const diff = max - min;

        const prog = max - relativeProgress(w, small, large) * diff;

        const h = (this.height / 1920) * w * prog;
        this.scale.y = h;
        this.scale.x = h * this.ratio;
    };
}

export default TextLoader;
