import React from 'react';

interface SidebarProps {
  handleGetAllLevels: () => void;
}

function Sidebar({ handleGetAllLevels }: SidebarProps) {
  return (
    <aside className="bg-blue-100 w-[20%] h-[100%]">
      <h1 className="text-3xl text-center pt-5 font-bold">
        Administrator <br />
        Menu
      </h1>
      <ul className="my-12 text-center">
        <li className=" font-semibold text-xl cursor-pointer border hover:border-b-black">
          Estudantes
        </li>
        <li
          onClick={handleGetAllLevels}
          className=" font-semibold text-xl cursor-pointer border hover:border-b-black"
        >
          Níveis
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
