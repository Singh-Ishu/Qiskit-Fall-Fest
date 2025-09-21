import * as THREE from "three";
import * as POSTPROCESSING from "postprocessing";

function createCircle(radius, segments, color) {
    const geometry = new THREE.CircleGeometry(radius, segments);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const circle = new THREE.Mesh(geometry, material);
    return circle;
}
function createBox(width, height, depth, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const box = new THREE.Mesh(geometry, material);
    return box;
}
function createTorus(
    color = 0xffffff,
    radius = 1,
    tube = 0.4,
    radialSegments = 12,
    tubularSegments = 24
) {
    const geometry = new THREE.TorusGeometry(
        radius,
        tube,
        radialSegments,
        tubularSegments
    );

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(1, 1, 1),
        emissiveIntensity: 1,
    });

    return new THREE.Mesh(geometry, material);
}

function handleResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function initSceneRenderer(canvasId) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById(canvasId),
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

    return { scene, camera, renderer };
}

export function initPostprocessing(renderer, scene, camera) {
    const composer = new POSTPROCESSING.EffectComposer(renderer, {
        frameBufferType: THREE.HalfFloatType,
    });

    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

    const bloom = new POSTPROCESSING.BloomEffect({
        intensity: 1.2,
        luminanceThreshold: 0.0,
        luminanceSmoothing: 0.9,
    });
    composer.addPass(new POSTPROCESSING.EffectPass(camera, bloom));

    return composer;
}

export { createCircle, createBox, createTorus, handleResize };
