import './App.css';
import profileImage from './assets/photo.jpeg';
import resumePdf from './assets/VaidehiGoruputiMarch2026Resume.pdf';

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

const resume = {
  header: {
    name: 'VAIDEHI GORUPUTI',
    email: 'vaidehig94@gmail.com',
    mobile: '+91-8309803518',
    location: 'Hyderabad',
  },
  summary: 'Software Development Engineer (SDE-2) with 5 years of experience in React JS and 1+ year in NestJS, specializing in designing and delivering scalable, high-performance frontend applications integrated with distributed backend microservices in enterprise-grade retail environments. Proficient in Event-Driven Microservices Architecture, building asynchronous, resilient, and responsive systems that support high-volume transactions for NextGen Self-Serve Checkout (SCO) platforms. Expert in Frontend Development and UI/UX Optimization, leveraging React JS, TypeScript, Redux, and Material Design to create responsive, cross-browser compatible, and user-centric applications across multiple domains including Retail, Insurance, Government, Healthcare, and Finance. Hands-on experience in backend services and API integration, implementing RESTful APIs, RxJS-based adapters, and microservice communication patterns, ensuring robust, maintainable, and production-ready architecture. Proven track record of performance enhancement and system reliability, achieving up to 25% improvement in application performance and 30% reduction in system errors through code refactoring, optimization, and adherence to clean architecture principles. Agile-driven team collaborator and award-winning contributor, recognized with "Tech Genie" for technical excellence and part of high-performing teams delivering large-scale projects like MyInsure, MagnifyB, Takamol & HMIS, enhancing enterprise product solutions globally.',
  competencies: [
    'Microservices Architecture',
    'Responsive Web Development',
    'Performance Optimization',
    'Event-Driven Architecture',
    'Agile / Scrum Methodology',
    'Cross-Browser Compatibility',
    'RESTful API Integration',
    'UI/UX Optimization',
    'Frontend Development',
    'Full-Stack Development',
    'Component-Based Architecture',
    'Code Refactoring',
  ],
  education: 'Bachelor of Technology (B.Tech.) in Electronics & Communication Engineering (ECE) from Gayatri Vidya Parishad College of Engineering for Women, Visakhapatnam, 2020',
  technicalSkills: [
    'Web Technologies & Frontend: JavaScript, TypeScript, HTML, CSS, Bootstrap, React JS, Redux, Material UI (MUI)',
    'Backend & Frameworks: Node JS, NestJS, RxJS',
    'Databases: MySQL, MongoDB, Redis(caching)',
    'Cloud/DevOps: Google Cloud Platform(GCP), GitHub Actions, CI/CD, Docker, Kubernetes',
    'Testing: Jest, Cypress. Cucumber, Gherkin (E2E)',
    'Protocols and Messaging: HTTP, WebSockets, MQTT',
    'Tools & Editors: Visual Studio, Postman, Jira, GIT',
  ],
  highlights: [
    'Recognized as "Tech Genie" for exemplary technical contributions and innovative solutions.',
    'Contributed to the Takamol project, leading the team to receive the "Best Team" award for outstanding collaboration and performance.',
    'Demonstrated commitment to excellence through team-oriented achievements and consistent delivery of high-quality results.',
  ],
  experiences: [
    {
      company: 'NCR Voyix, Hyderabad',
      period: 'Jan 2025 – Feb 2026',
      role: 'Software Engineer II (SDE-2) – Retail Domain',
      responsibilities: [
        'Designed and developed end-to-end features across frontend (React.js, TypeScript, Redux) and backend (NodeJS, NestJS, RxJS) within an MQTT-based event-driven microservices architecture.',
        'Spearheaded development of NextGen Self-Serve Checkout (SCO) systems, enabling reliable, high-volume retail transaction processing in distributed environments.',
        'Implemented asynchronous communication using MQTT, supporting real-time device integrations (scanner, cash devices, PIN pads) and inter-service messaging.',
        'Built and deployed containerized microservices on Kubernetes clusters, managing pod deployments to ensure scalability, resilience, and high availability.',
        'Created architectural documentation and system design workflows using PlantUML (PUML), including sequence and component diagrams for service interactions and event flows.',
        'Automated feature validation using Cucumber (BDD) and Cypress (E2E) to ensure regression coverage and production stability.',
        'Leveraged GCP Logging & Monitoring for troubleshooting, performance tuning, & proactive issue resolution in production environments.',
        'Optimized system performance under peak retail loads, reducing transaction times and improving overall customer checkout experience.',
      ],
    },
    {
      company: 'Machint Solutions, Hyderabad',
      period: 'Feb 2021 – Jan 2025',
      role: 'Senior Associate – React JS Developer',
      responsibilities: [
        'Delivered enterprise-grade frontend applications for Insurance, Government, Healthcare, and Finance domains, ensuring high-quality user experiences.',
        'Designed and implemented scalable, reusable UI components leveraging React JS, Redux, JavaScript, and TypeScript to enhance development efficiency and maintainability.',
        'Integrated RESTful APIs and Appian services to build dynamic, data-driven applications supporting critical business processes.',
        'Optimized application performance, achieving a 25% improvement in speed and a 30% reduction in system errors through refactoring and best practices.',
        'Ensured cross-browser compatibility and fully responsive designs, delivering consistent experiences across devices and platforms.',
        'Actively contributed to peer code reviews, debugging, and unit testing using Jest and React, ensuring adherence to coding standards and high code quality.',
        'Collaborated in Agile development cycles, including sprint planning, daily stand-ups, retrospectives, and release management, fostering timely delivery.',
        'Contributed to process improvements and team knowledge sharing, enhancing overall frontend development standards and efficiency.',
      ],
    },
  ],
};

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
            <a href="#resume" className="button button-secondary">View Resume</a>
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
              <p className="meta">HTC Global Services — Insurance domain (Client: AMFAM) March 2026 - Present</p>
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

      <section className="section" id="resume">
        <div>
          <h2>Resume</h2>
          <div className="resume-container fade-in">
            <div className="resume-header">
              <h3>{resume.header.name}</h3>
              <div className="resume-contact">
                <p><strong>Email:</strong> {resume.header.email}</p>
                <p><strong>Mobile:</strong> {resume.header.mobile}</p>
                <p><strong>Location:</strong> {resume.header.location}</p>
              </div>
              <div className="resume-actions">
                <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="button button-primary">View Resume</a>
                <a href={resumePdf} download="Vaidehi_Goruputi_Resume.pdf" className="button button-secondary">Download Resume</a>
              </div>
            </div>
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
