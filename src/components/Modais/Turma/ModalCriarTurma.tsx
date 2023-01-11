import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { addToTurmas } from '../../../database/fetchs';
import { Nivel } from '../../../types/NivelType';
import { Student } from '../../../types/StudentType';

interface AddTurmaModalProps {
  handleOpenCloseAddTurmaModal: () => void;
  isAddTurmaModalOpen: boolean;
  estudantes: Student[] | undefined;
  niveis: Nivel[] | undefined;
}

const AddTurmaModal = ({
  handleOpenCloseAddTurmaModal,
  estudantes,
  isAddTurmaModalOpen,
  niveis,
}: AddTurmaModalProps) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '24px',
    },
  };

  const [turma, setTurma] = useState({
    data_inicio: `${new Date()}`,
    nivel_id: 0,
    docente_id: 0,
  });

  const handleChangeNewNivel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    setTurma({ ...turma, [name]: value });
  };

  const notify = () =>
    toast('Criado com sucesso ✅!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

  const handleAddNivel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToTurmas(turma);
    notify();
  };

  const professores = estudantes?.filter(
    (estudante) => estudante.role === 'docente'
  );

  return (
    <div>
      <Modal
        isOpen={isAddTurmaModalOpen}
        onRequestClose={handleOpenCloseAddTurmaModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleAddNivel} className="flex flex-col p-6 text-left">
          <h1 className="font-bold text-3xl p-4 mb-4">
            Informações sobre a Turma
          </h1>
          <select
            onChange={handleChangeNewNivel}
            value={turma.docente_id}
            name="docente_id"
            className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
            placeholder="Nome"
          >
            <option value="">Qual será o professor da turma ?</option>
            {professores?.map((professor) => (
              <option value={professor.id} key={professor.id}>
                {professor.nome}
              </option>
            ))}
          </select>

          <select
            onChange={handleChangeNewNivel}
            value={turma.nivel_id}
            name="nivel_id"
            className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
            placeholder="Nome"
          >
            <option value="">Escolha um Nível:</option>
            {niveis?.map((nivel) => (
              <option value={nivel.id} key={nivel.id}>
                {nivel.descr_nivel}
              </option>
            ))}
          </select>

          <button className="py-2 px-4 mt-10 bg-blue-500 rounded-2xl w-[50%] mx-auto font-bold text-xl tracking-wider hover:bg-blue-700 active:scale-95 transition duration-100 ">
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default AddTurmaModal;
