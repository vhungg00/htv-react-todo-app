import React from "react";

export const SliderItem: React.FC<{children?: React.ReactElement}> = ({children}) => {

    return(
        <div className="box__image">
            <a href="/#" target="_blank">
                {children}
            </a>
        </div>
    )
}