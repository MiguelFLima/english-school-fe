import React from 'react';
import { Nivel } from '../../types/NivelType';
import { getBeutyDate } from '../../utils/functions';
import TituloMain from '../TituloMain';

interface NiveisProps {
  niveis: Nivel[] | undefined;
}

const Niveis = ({ niveis }: NiveisProps) => {
  return (
    <>
      <TituloMain text="Tabela Níveis" />

      <table className="w-full mx-auto text-center shadow-xl">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {niveis
            ? niveis.map((nivel) => (
                <tr
                  className="odd:bg-gray-200 border border-black"
                  key={nivel.id}
                >
                  <td>{nivel.id}</td>
                  <td>{nivel.descr_nivel}</td>
                  <td>{getBeutyDate(nivel.createdAt)}</td>
                  <td>{getBeutyDate(nivel.updatedAt)}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </>
  );
};

export default Niveis;
