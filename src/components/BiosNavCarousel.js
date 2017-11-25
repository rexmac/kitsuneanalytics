import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class BiosNavCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextSlide) {
    this.props.onSlideIndexChange(nextSlide);
  }

  render() {
    const currentSlideIndex = this.props.currentSlideIndex;
    const settings = {
      accessibility: true,
      arrows: false,
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
      // infinite: false,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true,
          centerPadding: '32px',
          slidesToShow: 3
        }
      },{
        breakpoint: 660,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }],
      speed: 600,
      slickGoTo: currentSlideIndex,
      slidesToShow: 5
      // slidesToScroll: 1
      // swipeToSlide: true
    };

    const bios = this.props.bios;

    return (
      <Slider {...settings}>
        {
          bios.map((bio) => (
            <div>
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
  bios: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentSlideIndex: PropTypes.number,
  onSlideIndexChange: PropTypes.func
};

BiosNavCarousel.defaultProps = {
  currentSlideIndex: 0,
  onSlideIndexChange: () => {}
};

export default BiosNavCarousel;
