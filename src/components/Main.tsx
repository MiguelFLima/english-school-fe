import React from 'react';
import { Class } from '../types/Class';
import { Matricula } from '../types/Matricula';
import { Nivel } from '../types/NivelType';
import { Student } from '../types/StudentType';
import Classes from './Maps Main/Classes';
import Matriculas from './Maps Main/Matriculas';
import Niveis from './Maps Main/Niveis';
import Students from './Maps Main/Students';

interface MainProps {
  estudantes: Student[] | undefined;
  niveis: Nivel[] | undefined;
  classes: Class[];
  matriculas: Matricula[];
  escolha: string;
  handleOpenModal: () => void;
}

function Main({
  estudantes,
  niveis,
  matriculas,
  classes,
  escolha,
  handleOpenModal,
}: MainProps) {
  return (
    <main className=" w-[100%] h-[100%] p-10">
      {escolha === 'estudantes' ? (
        <Students handleOpenModal={handleOpenModal} estudantes={estudantes} />
      ) : (
        ''
      )}
      {escolha === 'niveis' ? <Niveis niveis={niveis} /> : ''}
      {escolha === 'classes' ? <Classes classes={classes} /> : ''}
      {escolha === 'matriculas' ? <Matriculas matriculas={matriculas} /> : ''}
    </main>
  );
}

export default Main;
