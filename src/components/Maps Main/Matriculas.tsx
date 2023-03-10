import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { deleteAMatricula } from '../../database/fetchs';
import { Matricula } from '../../types/Matricula';
import { Student } from '../../types/StudentType';
import { getBeutyDate } from '../../utils/functions';
import TituloMain from '../TituloMain';

interface MatriculaProps {
  matriculas: Matricula[];
  estudantes: Student[];
  handleAddMatriculaModal: () => void;
  handleOpenEditMatriculaModal: (matricula: Matricula) => void;
}
const Matriculas = ({
  matriculas,
  estudantes,
  handleAddMatriculaModal,
  handleOpenEditMatriculaModal,
}: MatriculaProps) => {
  function estudanteDaVez(id: number) {
    const estudantess = estudantes;
    return estudantess.filter((student: Student) => student.id === id)[0].nome;
  }
  return (
    <div className="animate-[fadeIn_0.8s]">
      <TituloMain text="Tabela de Matrículas" />
      <div className="w-[100%] mb-7 gap-2 flex items-center justify-end">
        <button
          onClick={handleAddMatriculaModal}
          className="  font-medium text-lg"
        >
          Criar uma Matrícula
        </button>
        <AiFillPlusCircle
          onClick={handleAddMatriculaModal}
          className="cursor-pointer"
          size={'30px'}
        />
      </div>

      <table className="w-full mx-auto text-center shadow-xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Estudante</th>
            <th>Id Turma</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {matriculas
            ? matriculas.map((matricula) => (
                <tr
                  className="odd:bg-gray-200 border border-black"
                  key={matricula.id}
                >
                  <td>{matricula.id}</td>
                  <td>{matricula.estudante_id}</td>
                  <td>{matricula.turma_id}</td>
                  <td>{matricula.status}</td>
                  <td>{getBeutyDate(matricula.createdAt!)}</td>
                  <td>{getBeutyDate(matricula.updatedAt!)}</td>
                  <td>
                    <button
                      onClick={() => handleOpenEditMatriculaModal(matricula)}
                      className="px-2  bg-yellow-400 rounded-md transition duration-200 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="flex justify-center items-center h-full">
                    <MdDeleteForever
                      className="cursor-pointer text-center hover:bg-red-700 transition duration-300 "
                      onClick={() =>
                        deleteAMatricula(matricula.id!, matricula.estudante_id!)
                      }
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

export default Matriculas;
