import React, { useState } from 'react';
import { Nivel } from '../types/NivelType';
import { Student } from '../types/StudentType';

interface MainProps {
  estudantes: Student[] | undefined;
  niveis: Nivel[];
}

function Main({ estudantes, niveis }: MainProps) {
  return (
    <main className="bg-green-500 w-[100%] h-[100%]">
      <h1>oi</h1>
      <ul>
        {estudantes
          ? estudantes.map((student) => (
              <li className="text-2xl text-blue-500" key={student.id}>
                {student.nome}
              </li>
            ))
          : ''}
      </ul>
      <ul>
        {niveis
          ? niveis.map((nivel) => (
              <li className="text-2xl text-blue-500" key={nivel.id}>
                {nivel.descr_nivel}
              </li>
            ))
          : ''}
      </ul>
    </main>
  );
}

export default Main;
