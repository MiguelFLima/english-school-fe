import React from 'react';

interface SidebarProps {
  handleGetAllStudents: () => void;
}

function Sidebar({ handleGetAllStudents }: SidebarProps) {
  return (
    <aside className="bg-blue-100 w-[20%] h-[100%]">
      <h1 className="text-3xl text-center pt-5 font-bold">
        Administrator Interface
      </h1>
      <ul>
        <li
          onClick={handleGetAllStudents}
          className="mx-4 my-12 font-semibold text-xl underline cursor-pointer "
        >
          ={'>'} List all students
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
