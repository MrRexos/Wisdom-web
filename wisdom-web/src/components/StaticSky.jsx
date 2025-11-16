import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const hexToRgbArray = (hex) => {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r / 255, g / 255, b / 255];
};

const StaticSky = ({ className = '', topColor = '#cfe8ff', bottomColor = '#85bcea' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const setSize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const positions = new Float32Array([
      -5, -3, 0,
      5, -3, 0,
      5, 3, 0,
      -5, -3, 0,
      5, 3, 0,
      -5, 3, 0,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const [rTop, gTop, bTop] = hexToRgbArray(topColor);
    const [rBottom, gBottom, bBottom] = hexToRgbArray(bottomColor);

    const colors = new Float32Array([
      rBottom, gBottom, bBottom,
      rBottom, gBottom, bBottom,
      rTop, gTop, bTop,
      rBottom, gBottom, bBottom,
      rTop, gTop, bTop,
      rTop, gTop, bTop,
    ]);

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
    const gradientPlane = new THREE.Mesh(geometry, material);
    scene.add(gradientPlane);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 40;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 10;
      starPositions[i * 3 + 1] = (Math.random() - 0.2) * 6;
      starPositions[i * 3 + 2] = Math.random() * -1;
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const resize = () => setSize();
    resize();
    window.addEventListener('resize', resize);

    renderer.render(scene, camera);

    return () => {
      window.removeEventListener('resize', resize);
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, [topColor, bottomColor]);

  return <canvas ref={canvasRef} className={className} />;
};

export default StaticSky;
