// layouts/shortcodes/MDXImage.js
'use client'

import Image from "next/image";
import { useState } from "react";

const MDXImage = ({ src, alt, caption }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  return (
    <figure className="my-8">
      <div className="relative w-full">
        {dimensions.width > 0 && (
          <Image
            src={src}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-auto"
            priority
            onLoadingComplete={(target) => {
              if (dimensions.width === 0) {
                setDimensions({
                  width: target.naturalWidth,
                  height: target.naturalHeight
                });
              }
            }}
          />
        )}
        {dimensions.width === 0 && (
          <Image
            src={src}
            alt={alt}
            width={700}  // 임시 초기값
            height={400} // 임시 초기값
            className="w-full h-auto"
            priority
            onLoadingComplete={(target) => {
              setDimensions({
                width: target.naturalWidth,
                height: target.naturalHeight
              });
            }}
          />
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MDXImage;