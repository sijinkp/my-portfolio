import { about, profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading index="01" kicker="About" id="about-title" title={<>Practical engineering, <em>built to last.</em></>} />
        <div className="about">
          <div className="about__aside" data-reveal>
            <div className="about__years">
              <span className="about__num">{profile.experienceYears}</span>
              <span className="about__unit">years building<br />software</span>
            </div>
            <dl className="about__principles">
              {about.principles.map((p) => (
                <div key={p.k}>
                  <dt>{p.k}</dt>
                  <dd>{p.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="about__body">
            <p className="about__lead" data-reveal>{about.lead}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
