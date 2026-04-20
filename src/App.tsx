import './App.css';
import profileImage from './assets/photo.jpeg';

const skills = [
  'React JS',
  'TypeScript',
  'Node.js',
  'NestJS',
  'Microservices',
  'REST APIs',
  'Docker / Kubernetes',
  'GCP',
  'Jest / Cypress',
  'Event-Driven Architecture',
];

const projects = [
  {
    title: 'NextGen SCO Platform',
    description:
      'Built event-driven retail checkout features with React, TypeScript, NestJS and MQTT integration for high-volume enterprise workloads.',
    tags: ['React', 'NestJS', 'MQTT', 'Kubernetes'],
  },
  {
    title: 'Enterprise UI Applications',
    description:
      'Delivered reusable component libraries and responsive dashboards for Insurance, Government, Healthcare and Finance domains.',
    tags: ['React', 'Redux', 'TypeScript', 'Responsive Design'],
  },
  {
    title: 'Automated Test Suites',
    description:
      'Implemented BDD and E2E coverage using Cucumber and Cypress to validate critical workflows and reduce production risk.',
    tags: ['Cypress', 'Cucumber', 'Jest', 'QA'],
  },
];

function App() {
  return (
    <div className="page-shell">
      <header className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Full Stack Developer • React & Node.js • Microservices</p>
          <h1>Hi, I’m Vaidehi.</h1>
          <p>
            I build elegant, scalable web applications using React, TypeScript, Node.js and cloud-native microservices. My focus is on fast experiences, clean architecture, and enterprise-grade reliability.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">View Projects</a>
            <a href="#contact" className="button button-secondary">Contact Me</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-panel">
            <div className="image-frame">
              <img className="profile-image" src={profileImage} alt="Vaidehi Goruputi" />
            </div>
            <section className="summary-card">
              <h2>About Me</h2>
              <p>
                SDE-2 with 5+ years of experience delivering retail checkout platforms, enterprise UI systems, and microservices solutions across Insurance, Healthcare, Finance and Government.
              </p>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>Hyderabad, India</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>vaidehig94@gmail.com</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>+91-8309803518</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </header>

      <section className="section" id="experience">
        <div className="section-grid">
          <div>
            <h2>Experience</h2>
            <p className="section-intro">
              Proven delivery of production-ready applications, performance tuning, real-time integrations, and cloud-hosted microservices.
            </p>
          </div>
          <div className="cards-grid">
              <article className="card">
              <h3>Senior Engineer, Full Stack</h3>
              <p className="meta">HTC Global Services — Insurance domain (Client: AMFAM) March2026-present</p>
              <ul>
                <li>Delivered end-to-end insurance solutions using React, TypeScript, Node.js and full stack best practices.</li>
                <li>Collaborated with AMFAM stakeholders to build scalable workflows and enterprise-grade frontend experiences.</li>
                <li>Supported mission-critical insurance systems with robust integrations and high-quality code delivery.</li>
              </ul>
            </article>
            <article className="card">
              <h3>Software Engineer II</h3>
              <p className="meta">NCR Voyix — Jan 2025 to Feb 2026</p>
              <ul>
                <li>Built responsive checkout features with React, TypeScript and Redux.</li>
                <li>Designed NestJS microservices with MQTT event pipelines.</li>
                <li>Deployed containerized services on Kubernetes in GCP.</li>
              </ul>
            </article>
          
            <article className="card">
              <h3>Senior Associate</h3>
              <p className="meta">Machint Solutions — Feb 2021 to Jan 2025</p>
              <ul>
                <li>Delivered enterprise frontend systems for Insurance, Government, Healthcare and Finance.</li>
                <li>Improved app performance and reliability through refactoring and test automation.</li>
                <li>Coached teams, led code reviews and championed Agile delivery.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div>
          <h2>Technical Skills</h2>
          <div className="skill-grid">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div>
          <h2>Projects</h2>
          <p className="section-intro">Featured work that shows end-to-end product delivery and engineering ownership.</p>
          <div className="cards-grid">
            {projects.map((project) => (
              <article key={project.title} className="card project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div>
          <h2>Contact</h2>
          <p>If you’d like to collaborate, connect with me on LinkedIn or send a message to start a conversation.</p>
          <div className="contact-grid">
            <div className="contact-card">
              <strong>Email</strong>
              <p>vaidehig94@gmail.com</p>
            </div>
            <div className="contact-card">
              <strong>Phone</strong>
              <p>+91-8309803518</p>
            </div>
            <div className="contact-card">
              <strong>Location</strong>
              <p>Hyderabad, India</p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}

export default App;
