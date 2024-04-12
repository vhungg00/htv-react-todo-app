import React, { useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

import './LuckyWheel.scss';


export type Props = {
    /**
     * id of section tag
     */
    id?: string,

    /**
     * Css cho bánh xe khi quay
     * deg: Góc quay sau khi tìm ra kết quả phần thưởng để trả đúng vị trí phần thưởng
     * timingFunc: Tốc độ quay và mượt của bánh xe
     * timeDuration: transition duration
     */
    styleRotate?: {
        deg: number
        timingFunc: string
        timeDuration: number
    }

    /**
     * Check trạng thái của vòng quay
     */
    spinning?: boolean

    /**
     * Mảng các phần thưởng
     */
    prizes?: { name: string; img: string; percentpage: number }[]

    /**
     * Thời gian kim lắc một lần (animation-duration)
     */
    timeNeedleRotate?: number


}

export const LuckyWheel: React.FC<Props> = ({id, styleRotate, prizes, spinning, timeNeedleRotate}) => {
    
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const arrowRef = useRef<HTMLSpanElement | null>(null);
    
    
    return (
        <div className='container'>
            <section id='luckywheel' className='wrapper__luckywheel'>
                <div className='box__icon'>
                    <span ref={arrowRef}>
                        <i><FaMapMarkerAlt className='icon' /></i>
                    </span>
                </div>
                <div className='luckywheel'>
                    <canvas ref={canvasRef} className='luckywheel-canvas' width={'500px'} height={'500px'}></canvas>
                </div>
            </section>
        </div>
    )
};