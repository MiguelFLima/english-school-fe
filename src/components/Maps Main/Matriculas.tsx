import React from 'react';
import { Matricula } from '../../types/Matricula';
import { getBeutyDate } from '../../utils/functions';
import TituloMain from '../TituloMain';

interface MatriculaProps {
  matriculas: Matricula[];
}

const Matriculas = ({ matriculas }: MatriculaProps) => {
  return (
    <>
      <TituloMain text="Tabela Matrículas" />

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
                  <td>{getBeutyDate(matricula.createdAt)}</td>
                  <td>{getBeutyDate(matricula.updatedAt)}</td>
                  <td>{matricula.deletedAt}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </>
  );
};

export default Matriculas;
