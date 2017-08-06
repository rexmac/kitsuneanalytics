import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import Slider from 'react-slick'
import Bio from './Bio'

class BiosCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(nextSlide) {
    this.props.onSlideIndexChange(nextSlide);
  }

  render() {
    /*customPaging: (i) => {
        return <a><img src={bios[i].imgSrc}/></a>
      },*/
    const currentSlideIndex = this.props.currentSlideIndex;
    const settings = {
      accessibility: true,
      arrows: false,
      beforeChange: (currentSlide, nextSlide) => {
        console.log('beforeChange', currentSlide, nextSlide);
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
          bios.map((bio, index) => {
            return <div key={index}><Bio {...bio} /></div>;
          })
        }
      </Slider>
    );
  }
}

export default BiosCarousel
