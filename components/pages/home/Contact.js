import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import ContactForm from "../../ContactForm";

const Contact = () =>
  <section id="contact">
    <div className="box">
      <h2>Contact</h2>
      <p>Lorem ipsum...</p>
      <ContactForm />
      <div className="design-star"></div>
    </div>
  </section>

export default Contact