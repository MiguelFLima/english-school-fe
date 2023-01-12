import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { deleteAClass } from '../../database/fetchs';
import { Class } from '../../types/Class';
import { getBeutyDate } from '../../utils/functions';
import TituloMain from '../TituloMain';

interface ClassesProps {
  classes: Class[] | undefined;
  handleOpenCloseAddTurmaModal: () => void;
  handleOpenEditTurmaModal: (turma: Class) => void;
}

const Classes = ({
  classes,
  handleOpenCloseAddTurmaModal,
  handleOpenEditTurmaModal,
}: ClassesProps) => {
  return (
    <div className="animate-[fadeIn_0.8s]">
      <TituloMain text="Tabela de Turmas" />
      <div className="w-[100%] mb-7 gap-2 flex items-center justify-end">
        <button
          // onClick={handleAddMatriculaModal}
          className="  font-medium text-lg"
        >
          Criar uma Turma
        </button>
        <AiFillPlusCircle
          onClick={handleOpenCloseAddTurmaModal}
          className="cursor-pointer"
          // onClick={handleOpenModal}
          size={'30px'}
        />
      </div>

      <table className="w-full mx-auto text-center shadow-xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Professor</th>
            <th>Nível id</th>
            <th>Início</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {classes
            ? classes.map((turma) => (
                <tr
                  className="odd:bg-gray-200 border border-black"
                  key={turma.id}
                >
                  <td>{turma.id}</td>
                  <td>{turma.docente_id}</td>
                  <td>{turma.nivel_id}</td>
                  <td>{turma.data_inicio}</td>
                  <td>{getBeutyDate(turma.createdAt!)}</td>
                  <td>{getBeutyDate(turma.updatedAt!)}</td>
                  <td>
                    <button
                      onClick={() => handleOpenEditTurmaModal(turma)}
                      className="px-2  bg-yellow-400 rounded-md transition duration-200 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="flex justify-center items-center h-full">
                    <MdDeleteForever
                      className="cursor-pointer text-center hover:bg-red-700 transition duration-300 "
                      onClick={() => deleteAClass(turma.id!)}
                      size="32px"
                      color="red"
                    />
                  </td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;
