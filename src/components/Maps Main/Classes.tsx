import React from 'react';
import { Class } from '../../types/Class';
import TituloMain from '../TituloMain';

interface ClassesProps {
  classes: Class[] | undefined;
}

const Classes = ({ classes }: ClassesProps) => {
  return (
    <>
      <TituloMain text="Tabela Classes" />

      <table className="w-full mx-auto text-center shadow-xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Id Professor</th>
            <th>Nível id</th>
            <th>Início</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Deletado em</th>
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
                  <td>{turma.createdAt}</td>
                  <td>{turma.updatedAt}</td>
                  <td>{turma.deletedAt}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </>
  );
};

export default Classes;
