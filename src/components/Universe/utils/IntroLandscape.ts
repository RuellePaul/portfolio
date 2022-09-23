import {Mesh, PlaneGeometry, ShaderMaterial} from 'three';

import vert from 'src/components/Universe/shaders/landscape.vert';
import frag from 'src/components/Universe/shaders/landscape.frag';

class IntroLandscape extends Mesh {
    constructor() {
        const material = new ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,

            uniforms: {
                time: {
                    value: 0
                },
                lines: {
                    value: 0
                },
                scroll: {
                    value: 0
                },
                isDark: {
                    value: 1
                }
            },
            extensions: {
                derivatives: true
            },
            transparent: true,
            depthTest: true,
            depthWrite: true
        });

        const geometry = new PlaneGeometry(2, 2, 20, 20);

        super(geometry, material);

        this.position.y = -0.05;
        this.position.z = -0.25;
        this.rotation.x = -Math.PI * 0.5;

        this.renderOrder = 10;
    }

    update(value: number) {
        // @ts-ignore
        this.material.uniforms.lines.value = value;
        // @ts-ignore
        this.material.uniforms.time.value = window.performance.now() / 1000;
        // @ts-ignore
        this.material.uniforms.scroll.value = 1 - value;

        if (value === 1) this.visible = false;
        else this.visible = true;
    }
}

export default IntroLandscape;
