import * as THREE from "three";

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
    color,
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
    const material = new THREE.MeshBasicMaterial({ color: color });
    const torus = new THREE.Mesh(geometry, material);
    return torus;
}
function handleResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export { createCircle, createBox, createTorus, handleResize };
