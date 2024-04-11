import React, { useState } from "react";
import { LuckyWheel } from "@/components/LuckyWheel";
import { StyleRotate } from "@/types";

const ID = "luckywheel";
const CURRENT_TIME_DURATION_LUCKY_WHEEL_ROTATE = 12;
const CURRENT_TIME_DURATION_NEEDLE_ROTATE = 0.6;

export const LuckyWheelGame: React.FC = () => {

    const [styleRotate, setStyleRotate] = useState<StyleRotate>({
        deg: 0,
        timingFunc: 'ease-in-out',
        timeDuration: 0,
    });

    







    return (
       <>
        <LuckyWheel  />
       </>);
}