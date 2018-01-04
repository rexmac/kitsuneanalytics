import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Bio from './Bio';

let SliderFe;

class BiosCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    SliderFe = Slider;
    this.forceUpdate();
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
      responsive: [
        {
          breakpoint: 960,
          settings: 'unslick'
        }
      ],
      speed: 600,
      // slickGoTo: currentSlideIndex,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true
    };

    const bios = this.props.bios;

    if (SliderFe) {
      return (
        <SliderFe {...settings} ref={(slider) => { this.slider =  slider; }}>
          {
            bios.map((bio, index) =>
              <div key={index}><Bio {...bio} /></div> //  eslint-disable-line react/no-array-index-key
            )
          }
        </SliderFe>
      );
    }

    return (
      <div className="bios">
        {
          bios.map((bio, index) =>
            <div key={index}><Bio {...bio} /></div> //  eslint-disable-line react/no-array-index-key
          )
        }
      </div>
    );
  }
}
BiosCarousel.propTypes = {
  bios: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  currentSlideIndex: PropTypes.number,
  onSlideIndexChange: PropTypes.func
}

BiosCarousel.defaultProps = {
  currentSlideIndex: 0,
  onSlideIndexChange: () => {}
}
export default BiosCarousel
