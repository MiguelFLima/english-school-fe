import React, { useState } from 'react';
import { Student } from '../types/StudentType';

interface MainProps {
  students: Student[];
}

function Main({ students }: MainProps) {
  return (
    <main className="bg-green-500 w-[100%] h-[100%]">
      <h1>oi</h1>
      <ul>
        {students
          ? students.map((student) => (
              <li className="text-2xl text-blue-500" key={student.id}>
                {student.nome}
              </li>
            ))
          : ''}
      </ul>
    </main>
  );
}

export default Main;
