import ThreeBackground from "@/components/ThreeBackground";
import TiltCard from "@/components/TiltCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import AiChat from "@/components/AiChat";
import { skills, experiences, projects } from "@/lib/data";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <ThreeBackground />

      <div className="layout">
        {/* ── SIDEBAR ── */}
        <aside>
          <div className="profile">
            <div className="avatar" style={{ position: "relative" }}>
              <Image
                src="/user.png"
                alt="Bharat Saini"
                fill
                style={{ objectFit: "cover", borderRadius: "inherit" }}
              />
            </div>
            <h2>Bharat Saini</h2>
            <p>
              Full Stack Developer building scalable real-time and cloud-ready
              web apps.
            </p>
            <div className="status">
              <span className="dot" />
              Available
            </div>
          </div>
          <nav>
            <a href="#home">🏠 Home</a>
            <a href="#skills">⚡ Skills</a>
            <a href="#experience">💼 Experience</a>
            <a href="#projects">🚀 Projects</a>
            <a href="#education">🎓 Education</a>
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main>
          {/* HERO */}
          <section className="hero" id="home">
            <div>
              <div className="tag">
                <span className="dot" /> Open to Full-Time &amp; Freelance
              </div>
              <h1>
                Bharat Saini <br />
                <span className="glow-text">Full Stack Developer</span>
              </h1>
              <p>
                Crafting scalable systems with{" "}
                <b>
                  React, Next.js, Node.js, PostgreSQL, MongoDB, Prisma, AWS S3
                </b>
                . Real-time apps, cloud integrations, clean architecture and
                production-grade development.
              </p>

              <div className="terminal">
                <div className="terminal-top">
                  <div className="circle red" />
                  <div className="circle yellow" />
                  <div className="circle green-c" />
                </div>
                <div className="terminal-code">
                  $ developer.name = <span>&quot;Bharat Saini&quot;</span>
                  <br />$ stack = [<span>&quot;React&quot;</span>,{" "}
                  <span>&quot;Next.js&quot;</span>,{" "}
                  <span>&quot;Node.js&quot;</span>,{" "}
                  <span>&quot;PostgreSQL&quot;</span>,{" "}
                  <span>&quot;AWS&quot;</span>]
                  <br />$ status ={" "}
                  <span>&quot;Ready to build your next product&quot;</span>
                </div>
              </div>

              <div className="buttons">
                <a href="#projects" className="btn primary">
                  View Projects
                </a>
                <a href="#contact" className="btn secondary">
                  Hire Me
                </a>
                <a
                  href="https://drive.google.com/file/d/1wWz-KTmc53zXzEHCg8w7luTnO-cY0e3-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  Download Resume
                </a>
                <a href="tel:+918570915006" className="btn secondary">
                  Call Me
                </a>
                <a
                  href="https://github.com/Bharat-saini123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/bharat-saini-146412273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            <TiltCard />
          </section>

          {/* SKILLS */}
          <section id="skills">
            <RevealOnScroll className="section-head">
              <span>Skills</span>
              <h2>Skills &amp; Tech Stack</h2>
              <p>
                30+ technologies across frontend, backend, databases, realtime
                systems and DevOps.
              </p>
            </RevealOnScroll>

            <div className="bento">
              {skills.map((skill) => (
                <RevealOnScroll key={skill.title} className="card wide">
                  <div className="icon">{skill.icon}</div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                  <div className="skill-list">
                    {skill.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience">
            <RevealOnScroll className="section-head">
              <span>Experience</span>
              <h2>Work History</h2>
              <p>
                3+ years shipping production-grade software at real companies.
              </p>
            </RevealOnScroll>

            <div className="timeline">
              {experiences.map((exp) => (
                <RevealOnScroll key={exp.company} className="item-card">
                  <div className="item-head">
                    <div>
                      <div className="item-title">{exp.title}</div>
                      <div className="item-sub">{exp.company}</div>
                    </div>
                    <div className="date">{exp.date}</div>
                  </div>
                  <ul className="bullets">
                    {exp.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                  <div className="skill-list">
                    {exp.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects">
            <RevealOnScroll className="section-head">
              <span>Projects</span>
              <h2>Featured Projects</h2>
              <p>
                Real-time apps, full-stack products, business websites and
                modern UI projects.
              </p>
            </RevealOnScroll>

            <div className="bento">
              {projects.map((project, index) => (
                <RevealOnScroll key={project.title} className="card wide">
                  <div className="mini-title">
                    PROJECT {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>{project.title}</h3>
                  <p style={{ color: "#a5f3fc", marginBottom: 10 }}>
                    {project.type}
                  </p>
                  <p>{project.desc}</p>
                  <div className="skill-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn secondary"
                    >
                      Live ↗
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary"
                    >
                      Code ↗
                    </a>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education">
            <RevealOnScroll className="section-head">
              <span>Education</span>
              <h2>Academic Background</h2>
            </RevealOnScroll>

            <RevealOnScroll className="card full">
              <div className="icon">🎓</div>
              <h3>B.Tech — Electrical Engineering</h3>
              <p>
                JC Bose University of Science &amp; Technology, YMCA —
                Faridabad, Haryana
              </p>
              <div className="skill-list">
                <span>Graduated 2023</span>
                <span>7.2 CGPA</span>
              </div>
            </RevealOnScroll>
          </section>

          {/* CONTACT */}
          <section id="contact">
            <RevealOnScroll className="contact-section">
              <h2>Let&apos;s Build Something Extraordinary.</h2>
              <p>
                Available for full-time roles, freelance projects and technical
                consultations. Agar aapko web app, dashboard, CRM, e-commerce ya
                custom software chahiye, let&apos;s connect.
              </p>

              <div className="contact-info">
                <div className="contact-info-card">
                  <span>📧</span>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:sainibharat277@gmail.com">
                      sainibharat277@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-card">
                  <span>📞</span>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+918570915006">+91 8570915006</a>
                  </div>
                </div>
                <div className="contact-info-card">
                  <span>📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>Narnaul, Haryana, 123001</p>
                  </div>
                </div>
              </div>

              <div
                className="buttons"
                style={{ justifyContent: "center", marginTop: 28 }}
              >
                <a
                  href="mailto:sainibharat277@gmail.com"
                  className="btn primary"
                >
                  Email Me
                </a>
                <a href="tel:+918570915006" className="btn secondary">
                  Call Me
                </a>
                <a
                  href="https://drive.google.com/file/d/1wWz-KTmc53zXzEHCg8w7luTnO-cY0e3-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  Download Resume
                </a>
                <a
                  href="https://github.com/Bharat-saini123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/bharat-saini-146412273/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                >
                  LinkedIn
                </a>
              </div>
            </RevealOnScroll>
          </section>

          <footer>
            Designed &amp; Built by Bharat Saini · Full Stack Developer <br />
            Narnaul, Haryana, 123001 ·{" "}
            <a href="mailto:sainibharat277@gmail.com">Email</a> ·{" "}
            <a href="tel:+918570915006">Phone</a> ·{" "}
            <a
              href="https://drive.google.com/file/d/1wWz-KTmc53zXzEHCg8w7luTnO-cY0e3-/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </footer>
        </main>
      </div>
      <AiChat />
    </>
  );
}
