import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

function Header() {
  return (
    <header className="w-[100%] h-[110px] flex justify-between items-center bg-gray-800">
      <Image
        className=""
        src={'/logo-branco-pequeno.png'}
        width={140}
        height={80}
        alt="Logo"
      />
      <div className="flex justify-between gap-4 items-center">
        <h2 className="text-white font-semibold text-lg">Dashboard</h2>
        <Link href={'/dashboard'}>
          <BsFillArrowRightCircleFill
            size={28}
            color="white"
            className="mr-3"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
