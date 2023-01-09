import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <Image
      className="z-10"
      src="/loading.gif"
      alt="Loading"
      width={32}
      height={32}
    />
  );
};

export default Loading;
