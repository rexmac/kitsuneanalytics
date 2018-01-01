/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class BiosNavCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentSlideIndex !== prevProps.currentSlideIndex) {
      this.slider.slickGoTo(this.props.currentSlideIndex);
    }
  }

  handleChange(nextSlide) {
    this.props.onSlideIndexChange(nextSlide);
  }

  render() {
    // const currentSlideIndex = this.props.currentSlideIndex;
    const settings = {
      accessibility: true,
      arrows: true,
      // afterChange={this.props.afterChange
      beforeChange: (currentSlide, nextSlide) => {
        // console.log('beforeChange', currentSlide, nextSlide);
        this.handleChange(nextSlide);
      },
      centerMode: true,
      centerPadding: '0px',
      className: 'bios-nav',
      focusOnSelect: true,
      // dots: false,
      // fade: true,
      infinite: true,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 960,
          settings: 'unslick'
        }
        /*
        {
          breakpoint: 660,
          settings: {
            arrows: true,
            slidesToShow: 1
          }
        },{
          breakpoint: 900,
          settings: {
            arrows: true,
            centerPadding: '32px',
            slidesToShow: 3
          }
        }
        */
      ],
      speed: 600,
      // slickGoTo: currentSlideIndex,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide: false
    };

    const bios = this.props.bios;

    return (
      <Slider {...settings} ref={(slider) => { this.slider = slider; }}>
        {
          bios.map((bio, index) => (
            <div key={index}>
              <div className="bio-photo">
                <img className="photo" src={bio.imgSrc} alt={bio.imgAlt} />
              </div>
            </div>
          ))
        }
      </Slider>
    );
  }
}

BiosNavCarousel.propTypes = {
  bios: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  currentSlideIndex: PropTypes.number,
  onSlideIndexChange: PropTypes.func
};

BiosNavCarousel.defaultProps = {
  currentSlideIndex: 0,
  onSlideIndexChange: () => {}
};

export default BiosNavCarousel;
