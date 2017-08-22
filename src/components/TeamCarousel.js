import React from 'react';
import BiosCarousel from './BiosCarousel';
import BiosNavCarousel from './BiosNavCarousel';

import biosData from '../../data/Bios';

class TeamCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlideIndex: 0
    };

    this.handleSlideIndexChange = this.handleSlideIndexChange.bind(this);
  }

  handleSlideIndexChange(newSlideIndex) {
    // console.log('handleSlideIndexChange', newSlideIndex);
    this.setState({ currentSlideIndex: newSlideIndex });
  }

  render() {
    const bios = biosData;
    const currentSlideIndex = this.state.currentSlideIndex;

    return (
      <div className="team-carousel">
        <BiosNavCarousel currentSlideIndex={currentSlideIndex} bios={bios} onSlideIndexChange={this.handleSlideIndexChange} />
        <BiosCarousel currentSlideIndex={currentSlideIndex} bios={bios} onSlideIndexChange={this.handleSlideIndexChange} />
      </div>
    );
  }
}

export default TeamCarousel;
