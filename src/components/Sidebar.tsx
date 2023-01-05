import React, { Dispatch, SetStateAction } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiDiamondHard } from 'react-icons/gi';
import { SiGoogleclassroom } from 'react-icons/si';
import { HiOutlineIdentification } from 'react-icons/hi';

interface SidebarProps {
  setEscolha: Dispatch<SetStateAction<string>>;
}

function Sidebar({ setEscolha }: SidebarProps) {
  return (
    <aside className="bg-gray-100 w-[20%] h-[100%]">
      <h1 className="text-3xl text-center pt-5 font-bold">
        Administrator <br />
        Menu
      </h1>
      <h2 className="text-center mt-16 pb-2 text-xl font-semibold border-b border-b-black">
        Visualizar dados
      </h2>
      <ul className="my-6 text-left ">
        <div className="sidebarDiv">
          <BsFillPeopleFill size="24px" />
          <li onClick={() => setEscolha('estudantes')} className="sidebarItem">
            Estudantes
          </li>
        </div>

        <div className="sidebarDiv">
          <GiDiamondHard size="24px" />
          <li onClick={() => setEscolha('niveis')} className="sidebarItem">
            Níveis
          </li>
        </div>

        <div className="sidebarDiv">
          <SiGoogleclassroom size="24px" />
          <li onClick={() => setEscolha('classes')} className="sidebarItem">
            Classes
          </li>
        </div>

        <div className="sidebarDiv">
          <HiOutlineIdentification size="24px" />
          <li onClick={() => setEscolha('matriculas')} className="sidebarItem">
            Matrículas
          </li>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;
