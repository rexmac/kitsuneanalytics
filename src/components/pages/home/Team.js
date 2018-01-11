import React from 'react'
import TeamCarousel from '../../TeamCarousel'

const Team = () => (
  <section className="team" id="team">
    <div className="circles" />
    <div className="box">
      <h2>Meet the Team</h2>
      <p>
        The research team at Kitsune Analytics comes from a diverse set of research backgrounds, but they all share
        one thing in common: their love for data!
      </p>

      <p>
        The Kitsune team offers a unique approach to analytics, as their varied backgrounds allow them to draw together
        expertise across statistical analyses and, importantly, application of data to theory/practice. Every member of the
        team holds a research-based PhD in a field of cognitive science - from psychology to neuroscience - and is a
        highly-trained expert in their field of study.
      </p>

      <TeamCarousel />

      <div className="design-star" />
    </div>
  </section>
);

export default Team;
