import React from 'react';
import { Student } from '../../types/StudentType';
import { AiFillPlusCircle } from 'react-icons/ai';
import TituloMain from '../TituloMain';

interface StudentProps {
  estudantes: Student[] | undefined;
}

const StudentMap = ({ estudantes }: StudentProps) => {
  const handleAddPeople = () => {};
  return (
    <>
      <TituloMain text="Tabela Pessoas" />
      <div className="w-[100%] mb-7 gap-2 flex items-center justify-end">
        <button className="  font-medium text-lg">
          Adicionar um colaborador
        </button>
        <AiFillPlusCircle
          className="cursor-pointer"
          onClick={() => handleAddPeople()}
          size={'30px'}
        />
      </div>
      <table className="w-full mx-auto text-center shadow-xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ativo</th>
            <th>Email</th>
            <th>Role</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Deletado em</th>
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
                  <td>{student.createdAt}</td>
                  <td>{student.updatedAt}</td>
                  <td>{student.deletedAt}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </>
  );
};

export default StudentMap;
