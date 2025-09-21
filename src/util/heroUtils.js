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

export { createCircle, createBox, createTorus, handleResize };
