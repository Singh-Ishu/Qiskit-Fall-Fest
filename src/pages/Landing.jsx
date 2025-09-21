import styles from "./Landing.module.css";
import * as THREE from "three";
import * as POSTPROCESSING from "postprocessing";
import { useEffect } from "react";

import { createTorus, handleResize } from "../util/heroUtils";

function Landing() {
    useEffect(() => {
        // === Scene & Camera ===
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 10;

        // === Renderer ===
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("hero-canvas"),
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 2.0;
        renderer.setClearColor(0x000000, 0);

        // === Postprocessing Composer ===
        const composer = new POSTPROCESSING.EffectComposer(renderer, {
            frameBufferType: THREE.HalfFloatType, // HDR framebuffer
        });
        composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

        const bloom = new POSTPROCESSING.BloomEffect({
            intensity: 1.2,
            luminanceThreshold: 0.0,
            luminanceSmoothing: 0.9,
        });
        composer.addPass(new POSTPROCESSING.EffectPass(camera, bloom));

        // === Lights ===
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 50, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // === Objects ===
        const torus1 = createTorus(0xffffff, 3.5, 0.15, 16, 100);
        const torus2 = createTorus(0xffffff, 2.8, 0.15, 16, 100);
        const torus3 = createTorus(0xffffff, 2.1, 0.15, 16, 100);

        torus1.rotation.x = Math.PI / 2;
        torus2.rotation.y = Math.PI / 2;
        torus3.rotation.z = Math.PI / 2;

        scene.add(torus1);
        scene.add(torus2);
        scene.add(torus3);

        //Event Badge
        var badge_map = new THREE.TextureLoader().load("src/assets/badge.png");
        var badge_mat = new THREE.SpriteMaterial({ map: badge_map });
        var badge_sprite = new THREE.Sprite(badge_mat);
        badge_sprite.scale.set(5, 5);

        scene.add(badge_sprite);

        //rescaling stuff
        const t1_sf = 1.3;
        const t2_sf = 1.3;
        const t3_sf = 1.3;
        torus1.scale.set(t1_sf, t1_sf, t1_sf);
        torus2.scale.set(t2_sf, t2_sf, t2_sf);
        torus3.scale.set(t3_sf, t3_sf, t3_sf);

        // === Animation Loop ===
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.02;

            torus1.rotation.x += 0.01;
            torus1.rotation.y += 0.02;
            torus2.rotation.x -= 0.02;
            torus2.rotation.y += 0.03;
            torus3.rotation.x += Math.sin(time) * 0.1;

            composer.render();
        }
        animate();

        // === Resize Handling ===
        const resizeListener = () => handleResize(camera, renderer);
        window.addEventListener("resize", resizeListener);

        return () => {
            window.removeEventListener("resize", resizeListener);
        };
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
                <div className={styles["event-logo"]}>
                    {/* <img
                        src="src/assets/badge.png"
                        alt="Event Logo"
                        className={styles["event-logo-img"]}
                    /> */}
                </div>
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
