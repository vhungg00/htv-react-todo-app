import React from 'react';
import Slider from 'react-slick';
import {SliderItem} from "@/component/Slider/SliderItem";
import {Image} from "@/component/Image";
import {todo_bnr_001, todo_bnr_002} from '@/assets/images';

export const SimpleSlider: React.FC = () => {

    const settings = {
        className: "center",
        dots: true,
        infinite: true,
        centerPadding: '1000px',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <Slider {...settings}>
            <SliderItem>
                <Image className='image' src={todo_bnr_001} alt='bnr_001' />
            </SliderItem>
            <SliderItem>
                <Image className='image' src={todo_bnr_002} alt='bnr_002' />
            </SliderItem>
            <SliderItem>
                <Image className='image' src={todo_bnr_002} alt='bnr_002' />
            </SliderItem>
            <SliderItem>
                <Image className='image' src={todo_bnr_001} alt='bnr_001' />
            </SliderItem>
            <SliderItem>
                <Image className='image' src={todo_bnr_002} alt='bnr_002' />
            </SliderItem>
            <SliderItem>
                <Image className='image' src={todo_bnr_002} alt='bnr_002' />
            </SliderItem>
        </Slider>
    )
};