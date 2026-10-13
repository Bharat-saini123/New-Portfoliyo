"use client";
import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId = 0;
    let disposed = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let onResize: (() => void) | undefined;
    let onMouse: ((event: MouseEvent) => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas || disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

      const group = new THREE.Group();
      scene.add(group);

      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, 1.7, 1.7),
        new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.75, roughness: 0.18, wireframe: true }),
      );
      cube.position.set(2.9, 0.65, 0);
      group.add(cube);

      const ringGeo = new THREE.TorusGeometry(1.35, 0.018, 16, 140);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.72 });
      const ring1 = new THREE.Mesh(ringGeo, ringMat); ring1.position.copy(cube.position); group.add(ring1);
      const ring2 = new THREE.Mesh(ringGeo, ringMat); ring2.position.copy(cube.position); ring2.rotation.x = Math.PI / 2; group.add(ring2);
      const ring3 = new THREE.Mesh(ringGeo, ringMat); ring3.position.copy(cube.position); ring3.rotation.y = Math.PI / 2; group.add(ring3);

      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.1, 1),
        new THREE.MeshStandardMaterial({ color: 0xec4899, metalness: 0.65, roughness: 0.24, wireframe: true }),
      );
      ico.position.set(-3.2, -1.4, -0.5);
      group.add(ico);

      const count = 700;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 14;
      const particlesGeo = new THREE.BufferGeometry();
      particlesGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ size: 0.012, color: 0xe8e8d9, transparent: true, opacity: 0.48 }));
      scene.add(particles);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const cL = new THREE.PointLight(0x22d3ee, 1.7); cL.position.set(4, 3, 5); scene.add(cL);
      const pL = new THREE.PointLight(0xa855f7, 1.2); pL.position.set(-4, -3, 4); scene.add(pL);

      let mx = 0, my = 0;
      onMouse = (event: MouseEvent) => { mx = event.clientX / window.innerWidth - 0.5; my = event.clientY / window.innerHeight - 0.5; };
      document.addEventListener("mousemove", onMouse);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        cube.rotation.x += 0.003; cube.rotation.y += 0.0045;
        ring1.rotation.x += 0.003; ring1.rotation.y += 0.002;
        ring2.rotation.x += 0.002; ring2.rotation.z += 0.003;
        ring3.rotation.y += 0.0025; ring3.rotation.z += 0.002;
        ico.rotation.x -= 0.0025; ico.rotation.y += 0.0035;
        particles.rotation.y += 0.00035;
        group.rotation.y += (mx * 0.25 - group.rotation.y) * 0.03;
        group.rotation.x += (-my * 0.18 - group.rotation.x) * 0.03;
        renderer?.render(scene, camera);
      };
      animate();

      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer?.setSize(window.innerWidth, window.innerHeight);
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      };
      window.addEventListener("resize", onResize);
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      if (onMouse) document.removeEventListener("mousemove", onMouse);
      if (onResize) window.removeEventListener("resize", onResize);
      renderer?.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="three-bg" />;
}
