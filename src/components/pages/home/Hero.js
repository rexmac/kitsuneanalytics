import React from 'react';
import logo from '../../../img/logo--kitsune--white.svg';

const Hero = () => (
  <section id="hero">
    <div className="branding">
      <img className="logo" src={logo} width="191" height="180" alt="Kitsune Analytics logo" />
      <h1><strong>Kitsune</strong><br />Analytics</h1>
    </div>
    <div className="box">
      <h2>
        Bespoke data and analytic solutions
      </h2>
      <p>
        Kitsune Analytics developed from a shared desire to create more transparent links between science, society, and
        industry at large. As all former or current academics, the experts at Kitsune Analytics share a passion for developing
        projects that bring tangible results, inform change, and generate a greater understanding of the products and
        services that we use every day.
      </p>
      <p>
        All of our analysts hold a research-based PhD from various scientific fields. As such, we can
        uniquely provide you with the confidence that your project is being taken care of by industry experts with a passion
        for data-driven problem solving and a professionalism that is unparalleled by typical industry standards.
      </p>
      <div className="design-star" />
    </div>
  </section>
);

export default Hero;
