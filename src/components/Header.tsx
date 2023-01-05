import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <header className="w-[100%] h-[110px] bg-gray-800">
      <Image
        className=""
        src={'/logo-branco-pequeno.png'}
        width={140}
        height={80}
        alt="Logo"
      />
    </header>
  );
}

export default Header;
