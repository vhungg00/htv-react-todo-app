import React from "react";

import styles from './LuckyWheel.module.scss';


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
    return (
        <div className={styles.wrapper}>
            <section id='luckywheel' className={styles.luckywheel}>
                
            </section>
        </div>
    )
};