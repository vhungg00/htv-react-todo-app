import React from 'react';

type imageProps = {
    className?: string,
    src?: string,
    alt?: string
}
export const Image: React.FC<imageProps> = ({className, src, alt}) => {
    return <img className={className} src={src} alt={alt}/>
};