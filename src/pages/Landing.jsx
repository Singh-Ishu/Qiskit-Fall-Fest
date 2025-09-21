import styles from "./Landing.module.css";
import * as THREE from "three";

import { useEffect, useRef } from "react";

import { createCircle, createBox, createTorus } from "../util/heroUtils";

function Landing() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("hero-canvas"),
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const torus1 = createTorus(0xffffff, 3.5, 0.15, 16, 100);
        const torus2 = createTorus(0xffffff, 2.8, 0.15, 16, 100);
        const torus3 = createTorus(0xffffff, 2.1, 0.15, 16, 100);

        torus1.rotation.x = Math.PI / 2;
        torus2.rotation.y = Math.PI / 2;
        torus3.rotation.z = Math.PI / 2;

        scene.add(torus1);
        scene.add(torus2);
        scene.add(torus3);

        camera.position.z = 10;

        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.02;

            // Gyroscope-like rotations
            torus1.rotation.x += 0.01;
            torus1.rotation.y += 0.02;
            torus2.rotation.x -= 0.02;
            torus2.rotation.y += 0.03;
            torus3.rotation.x += Math.sin(time) * 0.1;

            renderer.render(scene, camera);
        }
        animate();

        const resizeListener = () => handleResize(camera, renderer);
        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);
    return (
        <div className={styles.Landing}>
            <div className={styles["text-container"]}>
                <div id={styles["event-name"]}>
                    IBM Qiskit
                    <span className={styles["landing-gradient-text"]}>
                        FallFest 2025
                    </span>
                </div>
                <div id={styles["event-date"]}>
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
