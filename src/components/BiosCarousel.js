import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Bio from './Bio';

class BiosCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextSlide) {
    this.props.onSlideIndexChange(nextSlide);
  }

  render() {
    /* customPaging: (i) => {
        return <a><img src={bios[i].imgSrc}/></a>
      }, */
    const currentSlideIndex = this.props.currentSlideIndex;
    const settings = {
      accessibility: true,
      arrows: false,
      beforeChange: (currentSlide, nextSlide) => {
        // console.log('beforeChange', currentSlide, nextSlide);
        this.handleChange(nextSlide);
      },
      className: 'bios',
      dots: false,
      fade: true,
      infinite: true,
      speed: 600,
      slickGoTo: currentSlideIndex,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true
    };

    const bios = this.props.bios;

    return (
      <Slider {...settings}>
        {
          bios.map((bio, index) =>
            <div key={index}><Bio {...bio} /></div> // eslint-disable-line react/no-array-index-key
          )
        }
      </Slider>
    );
  }
}
BiosCarousel.propTypes = {
  bios: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentSlideIndex: PropTypes.number,
  onSlideIndexChange: PropTypes.func
}

BiosCarousel.defaultProps = {
  currentSlideIndex: 0,
  onSlideIndexChange: () => {}
}
export default BiosCarousel
