import React from 'react';
import BiosCarousel from './BiosCarousel';
import BiosNavCarousel from './BiosNavCarousel';

import jimmy from '../img/team/jimmy.jpg';
import katherine from '../img/team/katherine.jpg';
import katya from '../img/team/katya.jpg';
import sally from '../img/team/sally.jpg';
import rachel from '../img/team/rachel.jpg';

const biosData = [{
  name: 'Dr. Rachel Kowert',
  title: "Founder of Kitsune Analytics. Data Analyst and Research Consultant",
  href: '',
  imgSrc: rachel,
  imgAlt: 'Dr. Rachel Kowert',
  desc: `Dr. Rachel Kowert is a research psychologist with more than 10 years experience in quantitative research. Her work has included the development and design of cross-sectional and longitudinal assessments within large data sets, including survey-based and experimental designs.

Dr. Kowert has extensive experience with a range of quantitative data analysis techniques using SPSS and AMOS, including ANOVA, MANOVA, hierarchical regression analyses, moderated and mediated regression analyses and cross-lagged path analysis via structural equation modeling. In the last ten years, she has published numerous scientific articles and four books.

Through these techniques, she is able to exact information from large amounts of data to provide actionable insight into the questions that need to be answered. Dr. Kowert is also very experienced in presenting scientific to scientific and nonscientific audiences.`
}, {
  name: 'Dr. Katya Krieger-Redwood',
  title: 'Data Analyst and Research Consultant',
  href: '',
  imgSrc: katya,
  imgAlt: 'Dr. Katya Krieger-Redwood',
  desc: `Dr. Katya Krieger-Redwood is a research scientist with a background in both psychology and cognitive neuroscience. Her work has included development, design, analysis and dissemination of animal and human based research, including a variety of brain imaging techniques.

Dr. Krieger-Redwood prides herself on and enjoys in depth data analysis to ensure the essence of the data is captured, the application of data to theory/practice is a key skill which she enjoys using. With experience using various statistical analyses, she is able to adapt the statistical measures needed to suit the given data.`
},{
  name: 'Dr. Sally Quinn',
  title: 'Data Analyst and Research Consultant',
  href: '',
  imgSrc: sally,
  imgAlt: 'Dr. Sally Quinn',
  desc: `Sally gained her PhD at the University of York which looked at Social Networking Site use in early adolescence. After completing her PhD, she is now an Associate Lecturer at the University of York teaching Social Psychology and Cyberpsychology. Her research interests lie in the social uses of technology with a particular focus on the positive uses of social media and mobile technology. She has published research on social media and wellbeing in adults and children, "textspeak" in computer-mediated communication, internet use among people with intellectual disabilities, and psychosocial outcomes of online gaming. Her work has appeared in the British Journal of Developmental Psychology, Computers in Human Behavior, and Cyberpsychology, Social Networking and Behavior.`
}, {
  name: 'Dr. Katherine Newling',
  title: 'Data Engineer',
  href: '',
  imgSrc: katherine,
  imgAlt: 'Dr. Katherine Newling',
  desc: `Dr. Katherine Newling has over 6 years experience working as a research scientist. She has a background in computer science, cognitive neuroscience and bioinformatics, as well as a PhD in systems neuroscience. Dr. Newling has experience working with very different data types, including brain imaging, electrophysiological and behavioural data, as well as very large sets of next generation sequencing data (RNA-Seq). She is a highly competent programmer, having worked as a software developer before returning to research, and is experienced using various statistical tools.

Dr. Newling enjoys approaching problems from different angles and identifying patterns and anomalies. She is particularly enthusiastic about finding new ways to visualise datasets and deliver findings to non-technical audiences.

Programming: Java, Python, R, Matlab, Javascript, HTML
Databases: MongoDB, Neo4j, SQL`
},{
  name: 'Jimmy Trippier',
  title: 'Creative Consultant',
  href: '',
  imgSrc: jimmy,
  imgAlt: 'Jimmy Trippier',
  desc: `Jimmy Trippier is a Graphic Artist and Illustrator with over 8 years in creative and advertising industries. With a broad range of experience in almost all areas of visual communications and a work style that evolves with an ever-changing industry, his background covers a multitude of disciplines from traditional brand and print design to digital, illustration and larger art direction projects. 

Previously working as a Creative Designer & Art Director for the globally renowned advertising agency McCann Erickson, Jim now works as a freelance Graphic Artist and Illustrator out of Manchester, UK.

Jim’s extensive experience in the graphic execution of illustration, typography and visual communication forms the backbone and ‘post-production polish’ with which his colleagues at Kitsune can present their findings and crucial data sets.`
}];

class TeamCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSlideIndexChange = this.handleSlideIndexChange.bind(this);
    this.state = {
      bios: biosData,
      currentSlideIndex: 0
    };
  }

  handleSlideIndexChange(newSlideIndex) {
    console.log('handleSlideIndexChange', newSlideIndex);
    this.setState({ currentSlideIndex: newSlideIndex });
  }

  render() {
    const bios = this.state.bios;
    const currentSlideIndex = this.state.currentSlideIndex;

    return (
      <div className="team-carousel">
        <BiosNavCarousel currentSlideIndex={currentSlideIndex} bios={bios} onSlideIndexChange={this.handleSlideIndexChange} />
        <BiosCarousel currentSlideIndex={currentSlideIndex} bios={bios} onSlideIndexChange={this.handleSlideIndexChange} />
      </div>
    );
  }
}

export default TeamCarousel
