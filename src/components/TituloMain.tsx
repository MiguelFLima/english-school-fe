import React from 'react';

interface TituloMainProps {
  text: string;
}

const TituloMain = ({ text }: TituloMainProps) => {
  return (
    <div className="w-full flex items-center justify-center mb-8">
      <h1 className="text-3xl font-bold ">{text}</h1>
    </div>
  );
};

export default TituloMain;
