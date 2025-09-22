import styles from "./Landing.module.css";
import * as THREE from "three";
import { useEffect } from "react";

import {
    createTorus,
    handleResize,
    initSceneRenderer,
    initPostprocessing,
} from "../../util/heroUtils";
import { int } from "three/tsl";

function Landing() {
    useEffect(() => {
        // === Scene, Camera, Renderer ===
        const { scene, camera, renderer } = initSceneRenderer("hero-canvas");

        // === Postprocessing Composer ===
        const composer = initPostprocessing(renderer, scene, camera, 5);

        // === Lights ===
        // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        // scene.add(ambientLight);

        // const pointLight = new THREE.PointLight(0xffffff, 50, 100);
        // pointLight.position.set(10, 10, 10);
        // scene.add(pointLight);

        // === Toruses ===
        const torus1 = createTorus(0xffffff, 3.5, 0.005, 16, 100, 0xffffff);
        const torus2 = createTorus(0xffffff, 2.8, 0.005, 16, 100, 0xbc13fe);
        const torus3 = createTorus(0xffffff, 2.1, 0.01, 16, 100, 0xffffff);

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

        //Interactions set up
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
        window.addEventListener("mousemove", onMouseMove, false);

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
            torus3.rotation.y += Math.sin(time) * 0.1;
            torus3.rotation.z += Math.sin(time) * 0.1;

            //Interactions
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            // Target scale based on intersection
            const targetScale = intersects.length > 0 ? 2 : scaleFactor;

            // Smoothly interpolate scale
            const lerp = (start, end, t) => start + (end - start) * t;
            const smoothing = 0.1;

            torus1.scale.set(
                lerp(torus1.scale.x, targetScale, smoothing),
                lerp(torus1.scale.y, targetScale, smoothing),
                lerp(torus1.scale.z, targetScale, smoothing)
            );
            torus2.scale.set(
                lerp(torus2.scale.x, targetScale, smoothing),
                lerp(torus2.scale.y, targetScale, smoothing),
                lerp(torus2.scale.z, targetScale, smoothing)
            );
            torus3.scale.set(
                lerp(torus3.scale.x, targetScale, smoothing),
                lerp(torus3.scale.y, targetScale, smoothing),
                lerp(torus3.scale.z, targetScale, smoothing)
            );

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
                    <b>
                        IBM Qiskit{" "}
                        <span className={styles["landing-gradient-text"]}>
                            FallFest 2025
                        </span>
                    </b>
                </div>
                <div className={styles["event-logo"]}></div>
                <div className={styles["event-date"]}>
                    <b>
                        October
                        <br />
                        <span className={styles["landing-gradient-text-2"]}>
                            29<sup>th</sup>-31<sup>st</sup>
                        </span>
                    </b>
                </div>
            </div>
            <canvas id="hero-canvas" className={styles["hero-canvas"]} />
        </div>
    );
}

export default Landing;
