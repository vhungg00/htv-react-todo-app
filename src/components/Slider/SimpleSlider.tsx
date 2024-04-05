import React from 'react';
import Slider from 'react-slick';

import './slider.css';

export const SimpleSlider: React.FC = () => {

    const settings = {
        className: "center",
        dots: true,
        infinite: true,
        centerPadding: '1000px',
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <Slider {...settings}>

        </Slider>
    )
};