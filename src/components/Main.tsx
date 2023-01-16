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
  estudantes: Student[];
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
  handleOpenEditTurmaModal: (turma: Class) => void;
  handleOpenEditMatriculaModal: (matricula: Matricula) => void;
  deleteColaborator: () => void;
}

function Main({
  estudantes,
  niveis,
  matriculas,
  classes,
  deleteColaborator,
  handleOpenNewNivelModal,
  escolha,
  handleOpenModal,
  handleOpenEditModal,
  handleOpenCloseAddTurmaModal,
  handleAddMatriculaModal,
  handleOpenNivelEditModal,
  handleOpenEditTurmaModal,
  handleOpenEditMatriculaModal,
}: MainProps) {
  return (
    <main className=" w-[100%] h-[100%] p-10">
      {escolha === 'estudantes' ? (
        <Students
          handleOpenEditModal={handleOpenEditModal}
          handleOpenModal={handleOpenModal}
          estudantes={estudantes}
          deleteColaborator={deleteColaborator}
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
          handleOpenEditTurmaModal={handleOpenEditTurmaModal}
          handleOpenCloseAddTurmaModal={handleOpenCloseAddTurmaModal}
          classes={classes}
        />
      ) : (
        ''
      )}
      {escolha === 'matriculas' ? (
        <Matriculas
          estudantes={estudantes}
          handleOpenEditMatriculaModal={handleOpenEditMatriculaModal}
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
