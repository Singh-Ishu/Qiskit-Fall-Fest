import styles from "./Landing.module.css";
import * as THREE from "three";
import { useEffect } from "react";

import {
    createTorus,
    handleResize,
    initSceneRenderer,
    initPostprocessing,
} from "../util/heroUtils";

function Landing() {
    useEffect(() => {
        // === Scene, Camera, Renderer ===
        const { scene, camera, renderer } = initSceneRenderer("hero-canvas");

        // === Postprocessing Composer ===
        const composer = initPostprocessing(renderer, scene, camera);

        // === Lights ===
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 50, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // === Toruses ===
        const torus1 = createTorus(0xffffff, 3.5, 0.15, 16, 100);
        const torus2 = createTorus(0xffffff, 2.8, 0.15, 16, 100);
        const torus3 = createTorus(0xffffff, 2.1, 0.15, 16, 100);

        torus1.rotation.x = Math.PI / 2;
        torus2.rotation.y = Math.PI / 2;
        torus3.rotation.z = Math.PI / 2;

        torus1.position.y -= 1;
        torus2.position.y -= 1;
        torus3.position.y -= 1;

        const scaleFactor = 1.3;
        torus1.scale.set(scaleFactor, scaleFactor, scaleFactor);
        torus2.scale.set(scaleFactor, scaleFactor, scaleFactor);
        torus3.scale.set(scaleFactor, scaleFactor, scaleFactor);

        scene.add(torus1, torus2, torus3);

        // === Event Badge ===
        const badgeTexture = new THREE.TextureLoader().load(
            "src/assets/badge.png"
        );
        const badgeMaterial = new THREE.SpriteMaterial({ map: badgeTexture });
        const badgeSprite = new THREE.Sprite(badgeMaterial);
        badgeSprite.scale.set(5, 5);
        badgeSprite.position.y -= 1;
        scene.add(badgeSprite);

        // === Animation Loop ===
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.02;

            torus1.rotation.x += 0.01;
            torus1.rotation.y += 0.02;
            torus2.rotation.x -= 0.02;
            torus2.rotation.y += 0.03;
            torus3.rotation.x += Math.sin(time) * 0.1;

            composer.render();
        };
        animate();

        // === Resize Handling ===
        const resizeListener = () => handleResize(camera, renderer);
        window.addEventListener("resize", resizeListener);

        return () => window.removeEventListener("resize", resizeListener);
    }, []);

    return (
        <div className={styles.Landing}>
            <div className={styles["text-container"]}>
                <div className={styles["event-name"]}>
                    IBM Qiskit{" "}
                    <span className={styles["landing-gradient-text"]}>
                        FallFest 2025
                    </span>
                </div>
                <div className={styles["event-logo"]}></div>
                <div className={styles["event-date"]}>
                    October
                    <br />
                    <span className={styles["landing-gradient-text"]}>
                        29<sup>th</sup>-31<sup>st</sup>
                    </span>
                </div>
            </div>
            <canvas id="hero-canvas" className={styles["hero-canvas"]} />
        </div>
    );
}

export default Landing;
