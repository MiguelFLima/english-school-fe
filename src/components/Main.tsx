import React from 'react';
import { Class } from '../types/Class';
import { Matricula } from '../types/Matricula';
import { Nivel } from '../types/NivelType';
import { NewStudentInfo, Student } from '../types/StudentType';
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
  handleOpenNewNivelModal: () => void;
  handleOpenModal: () => void;
  handleOpenEditModal: (student: Student) => void;
  handleCloseEditModal: () => void;
  handleAddMatriculaModal: () => void;
  handleOpenCloseAddTurmaModal: () => void;
  handleOpenNivelEditModal: (nivel: Nivel) => void;
}

function Main({
  estudantes,
  niveis,
  matriculas,
  classes,
  handleOpenNewNivelModal,
  escolha,
  handleOpenModal,
  handleOpenEditModal,
  handleOpenCloseAddTurmaModal,
  handleAddMatriculaModal,
  handleOpenNivelEditModal,
}: MainProps) {
  return (
    <main className=" w-[100%] h-[100%] p-10">
      {escolha === 'estudantes' ? (
        <Students
          handleOpenEditModal={handleOpenEditModal}
          handleOpenModal={handleOpenModal}
          estudantes={estudantes}
        />
      ) : (
        ''
      )}
      {escolha === 'niveis' ? (
        <Niveis
          handleOpenNivelEditModal={handleOpenNivelEditModal}
          handleOpenNewNivelModal={handleOpenNewNivelModal}
          niveis={niveis}
        />
      ) : (
        ''
      )}
      {escolha === 'classes' ? (
        <Classes
          handleOpenCloseAddTurmaModal={handleOpenCloseAddTurmaModal}
          classes={classes}
        />
      ) : (
        ''
      )}
      {escolha === 'matriculas' ? (
        <Matriculas
          handleAddMatriculaModal={handleAddMatriculaModal}
          matriculas={matriculas}
        />
      ) : (
        ''
      )}
    </main>
  );
}

export default Main;
