import React from "react";
import {Image} from "@/components/Image";

export type Props = {
    imagePath: string,
    imageAlt?: string
}

export const SliderItem: React.FC<Props> = ({imagePath, imageAlt}) => {

    return(
        <div>
            <a href="/#" target="_blank">
                <Image className="image" src={imagePath} alt={imageAlt}/>
            </a>
        </div>
    )
}