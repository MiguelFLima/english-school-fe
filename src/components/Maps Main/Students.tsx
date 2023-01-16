import React from 'react';
import { Student } from '../../types/StudentType';
import { AiFillPlusCircle } from 'react-icons/ai';
import TituloMain from '../TituloMain';
import { MdDeleteForever } from 'react-icons/md';
import { deleteAColaborator } from '../../database/fetchs';
import { getBeutyDate } from '../../utils/functions';

interface StudentProps {
  estudantes: Student[] | undefined;
  handleOpenModal: () => void;
  handleOpenEditModal: (student: Student) => void;
  deleteColaborator: (id: number) => void;
}

const StudentMap = ({
  estudantes,
  handleOpenModal,
  handleOpenEditModal,
  deleteColaborator,
}: StudentProps) => {
  return (
    <div className="animate-[fadeIn_0.8s]">
      <TituloMain text="Tabela Pessoas" />
      <div className="w-[100%] mb-7 gap-2 flex items-center justify-end">
        <button className="  font-medium text-lg">
          Adicionar um colaborador
        </button>
        <AiFillPlusCircle
          className="cursor-pointer"
          onClick={handleOpenModal}
          size={'30px'}
        />
      </div>
      <table className="w-full mx-auto text-center shadow-xl ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ativo</th>
            <th>Email</th>
            <th>Role</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {estudantes
            ? estudantes.map((student) => (
                <tr
                  className="odd:bg-gray-200 border-b border-black"
                  key={student.id}
                >
                  <td className="">{student.id}</td>
                  <td>{student.nome}</td>
                  <td>{student.ativo === true ? 'Sim' : 'Não'}</td>
                  <td>{student.email}</td>
                  <td>{student.role}</td>
                  <td>
                    {student.createdAt && getBeutyDate(student.createdAt)}
                  </td>
                  <td>
                    {student.updatedAt && getBeutyDate(student.updatedAt)}
                  </td>
                  <td>
                    <button
                      onClick={() => handleOpenEditModal(student)}
                      className="px-2  bg-yellow-400 rounded-md transition duration-200 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="flex justify-center items-center h-full">
                    <MdDeleteForever
                      className="cursor-pointer text-center hover:bg-red-700 transition duration-300 "
                      onClick={() => deleteColaborator(student.id)}
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

export default StudentMap;
