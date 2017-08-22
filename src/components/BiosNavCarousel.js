import React from 'react'
import Slider from 'react-slick'

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
        console.log('beforeChange', currentSlide, nextSlide);
        this.handleChange(nextSlide);
      },
      centerMode: true,
      centerPadding: '0px',
      className: 'bios-nav',
      focusOnSelect: true,
      //dots: false,
      //fade: true,
      //infinite: false,
      speed: 600,
      slickGoTo: currentSlideIndex,
      slidesToShow: 5
      //slidesToScroll: 1
      //swipeToSlide: true
    };

    const bios = this.props.bios;

    return (
      <Slider {...settings}>
        {
          bios.map((bio, index) => {
            return <div key={index}><div className="bio-photo"><img className="photo" src={bio.imgSrc} alt={bio.imgAlt} /></div></div>;
          })
        }
      </Slider>
    );
  }
}

export default BiosNavCarousel
