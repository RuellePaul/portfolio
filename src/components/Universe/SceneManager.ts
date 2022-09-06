import {Object3D, WebGLRenderer} from 'three';
import OpeningScene from 'src/components/Universe/scenes/OpeningScene';
import mainCamera from 'src/components/Universe/mainCamera';
import {relativeProgress} from 'src/components/Universe/math';
import {Progress} from 'src/types';

class SceneManager {
    camera: Object3D;
    scenes: OpeningScene[];

    constructor(renderer: WebGLRenderer) {
        this.camera = mainCamera();
        this.camera.position.z = 20;

        this.scenes = [new OpeningScene(renderer), new OpeningScene(renderer)];
    }

    resize = () => {};

    update = (progress: Progress) => {
        const {sectionProgress, currentSection} = progress;

        this.scenes.forEach((scene) => {
            const {start: sectionStart, end: sectionEnd, section} = scene.range;

            let progress = -1;
            if (section !== -1 && currentSection === -1 && sectionStart >= 0) return;

            const isNextPlayingEarly = section - 1 === currentSection && sectionStart < 0;
            if (currentSection === section || isNextPlayingEarly) {
                if (isNextPlayingEarly) {
                    progress = relativeProgress(-1 + sectionProgress, sectionStart, sectionEnd);
                } else progress = relativeProgress(sectionProgress, sectionStart, sectionEnd);
            }
            if (currentSection > section) progress = 1;

            scene.update(progress);
        });
    };
}

export default SceneManager;
