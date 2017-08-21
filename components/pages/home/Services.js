import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import ScrollableAnchor from 'react-scrollable-anchor'

export default class Services extends React.Component {
  render() {
    return (
      <ScrollableAnchor id={'services'}>
        <section className="services">
          <div className="box">
            <h2>What we do</h2>
            <p>Kitsune Analytics is a comprehensive consulting, analytics, and design firm with a focus on user
              research. Using
              data-driven techniques, the scientists at Kitsune Analytics will provide the insights you need about your
              the users
              of your products and services. From the initial consultation, to the development a data and analysis
              framework, to
              the presentation of the final reports, we will provide a customized plan to suit your needs and see your
              project
              through from start to finish.</p>
            <p>We are not a simple market research or analytics firm - we are the best of both worlds! Because we employ
              a team
              of research scientists, psychologists, programmers, and data analysts, we are able to make data-driven
              insights
              into how your application and/or services are perceived, where they excel, where they are lacking, and
              what
              strategies need to be employed to improve performance, likeability, retention, and increased use (as well
              as a
              range of other improvement measures!).</p>
            <p>We can tackle virtually any question, but our clients typically fall into one of two categories:<br/>
              <a href="#services__demographic-analysis"><strong>Demographic Analysis</strong></a> or <a
                href="#services__performance-analysis"><strong>Performance Analysis</strong></a>.
            </p>

            <div className="uberlist-container">
              <div className="uberlist">
                <h3 className="title">Demographic Analysis</h3>
                <p>If you are interested in a demographic analysis of your application and/or service, you are seeking
                  answers to questions such as these:</p>
                <ul>
                  <li>What are the spending patterns of the users of my service?</li>
                  <li>What kind of people are using my application/service? How old are they?</li>
                  <li>Where are they located? How much time are they investing in using my application?</li>
                  <li>What groups are investing the most time and money using my application/service? Where are they
                    located?
                  </li>
                </ul>
              </div>

              <div className="uberlist">
                <h3 className="title">Performance Analysis</h3>
                <p>If you are interested in a performance analysis, you are seeking answers to questions such as
                  these:</p>
                <ul>
                  <li>What features of my application/service do the users like best and what do they dislike the
                    most?
                  </li>
                  <li>What kinds of changes would they like to see to my application/service?</li>
                  <li>How can I optimize my application/service?</li>
                </ul>
              </div>
            </div>

            <p className="excerpt">Are the questions you want answered not listed above? Or are you not even sure what
              questions it is you want to ask? We can help with that!</p>

            <h2>Services</h2>
            <p>Our most popular services include:</p>
            <ul className="split-list">
              <li>Full service consulting, analysis, and design planning</li>
              <li>Scientific and non-scientific consulting</li>
              <li>Development of data-driven solutions, including experimental designs</li>
              <li>Data analysis, quantitative and qualitative</li>
              <li>Professional writing, editing, and graphic design services</li>
              <li>Other - if you can dream it, we can do it!</li>
            </ul>

            <h2 className="next-step">Ready to take the next step? <a href="#contact">Contact us!</a></h2>

            <div className="design-star"></div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}
