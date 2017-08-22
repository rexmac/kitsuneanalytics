import React from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import ContactForm from "../../ContactForm";

const Contact = () => (
  <ScrollableAnchor id={'contact'}>
    <section className="contact">
      <div className="box">
        <h2>Contact</h2>
        <p>Lorem ipsum...</p>
        <ContactForm />
        <div className="design-star" />
      </div>
    </section>
  </ScrollableAnchor>
);

export default Contact;
