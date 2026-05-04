"use client";
import { useRef } from "react";

export default function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.transform = `rotateX(${(y / rect.height - 0.5) * -12}deg) rotateY(${(x / rect.width - 0.5) * 12}deg)`;
  };

  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div className="hologram-card" ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hologram-content">
        <div>
          <div className="mini-title">Developer Console</div>
          <h2>Production Ready Engineer</h2>
          <p>Frontend + Backend + Database + Realtime + Cloud Deployment</p>
        </div>
        <div className="stats-grid">
          <div className="stat"><h3>3+</h3><p>Years Experience</p></div>
          <div className="stat"><h3>30+</h3><p>Tech Skills</p></div>
          <div className="stat"><h3>10+</h3><p>Projects</p></div>
          <div className="stat"><h3>7.2</h3><p>CGPA</p></div>
        </div>
      </div>
    </div>
  );
}
