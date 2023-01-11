import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { deleteALevel } from '../../database/fetchs';
import { Nivel } from '../../types/NivelType';
import { getBeutyDate } from '../../utils/functions';
import TituloMain from '../TituloMain';

interface NiveisProps {
  niveis: Nivel[] | undefined;
  handleOpenNewNivelModal: () => void;
  handleOpenNivelEditModal: (nivel: Nivel) => void;
}

const Niveis = ({
  niveis,
  handleOpenNewNivelModal,
  handleOpenNivelEditModal,
}: NiveisProps) => {
  return (
    <>
      <TituloMain text="Tabela Níveis" />
      <div className="w-[100%] mb-7 gap-2 flex items-center justify-end">
        <button className="  font-medium text-lg">Adicionar um Nível</button>
        <AiFillPlusCircle
          className="cursor-pointer"
          onClick={handleOpenNewNivelModal}
          size={'30px'}
        />
      </div>

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
                  <td>{nivel.createdAt && getBeutyDate(nivel.createdAt)}</td>
                  <td>{nivel.updatedAt && getBeutyDate(nivel.updatedAt)}</td>
                  <td>
                    <button
                      onClick={() => handleOpenNivelEditModal(nivel)}
                      className="px-2  bg-yellow-400 rounded-md transition duration-200 hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                  </td>
                  <td className="flex justify-center items-center h-full">
                    <MdDeleteForever
                      onClick={() => deleteALevel(nivel.id!)}
                      className="cursor-pointer text-center hover:bg-red-700 transition duration-300 "
                      size="32px"
                      color="red"
                    />
                  </td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </>
  );
};

export default Niveis;
