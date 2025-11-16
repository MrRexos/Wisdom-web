import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SkyStars = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const { clientWidth, clientHeight } = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 220;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.random() * -5;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    renderer.render(scene, camera);

    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth: newWidth, clientHeight: newHeight } = mountRef.current;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
      if (mountRef.current?.firstChild) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
};

export default SkyStars;
