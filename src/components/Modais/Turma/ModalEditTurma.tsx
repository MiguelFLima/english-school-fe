import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Nivel } from '../../../types/NivelType';
import { Student } from '../../../types/StudentType';
import { Class } from '../../../types/Class';
import { addEditedTurma } from '../../../database/fetchs';

interface EditTurmaProps {
  handleCloseEditTurmaModal: () => void;
  modalEditTurma: boolean;
  niveis: Nivel[] | undefined;
  estudantes: Student[] | undefined;
  turmaToEdit: Class;
}

const EditTurmaModal = ({
  handleCloseEditTurmaModal,
  modalEditTurma,
  estudantes,
  niveis,
  turmaToEdit,
}: EditTurmaProps) => {
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

  const [turmaInfo, setTurmaInfo] = useState<Class>({
    id: turmaToEdit.id,
    docente_id: turmaToEdit.docente_id,
    nivel_id: turmaToEdit.nivel_id,
  });
  console.log('turmaInfo', turmaInfo);

  const handleChangeTurma = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    setTurmaInfo({ ...turmaInfo, [name]: value });
  };

  const notify = () =>
    toast('Atualizado ✅!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

  const handleAddEditedNivel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addEditedTurma(turmaInfo);
    notify();
    // handleCloseEditTurmaModal();
  };

  const professores = estudantes?.filter(
    (estudante: Student) => estudante.role === 'docente'
  );

  return (
    turmaInfo && (
      <div>
        <Modal
          isOpen={modalEditTurma}
          onRequestClose={handleCloseEditTurmaModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form
            onSubmit={handleAddEditedNivel}
            className="flex flex-col p-6 text-left animate-[fadeIn_0.8s]"
          >
            <h1 className="font-bold text-3xl p-4 mb-4">
              Informações sobre a Turma
            </h1>
            <select
              onChange={handleChangeTurma}
              value={turmaInfo.docente_id}
              name="docente_id"
              className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
              placeholder="Nome"
            >
              <option value="">Qual será o professor da turma ?</option>
              {professores?.map((professor: Student) => (
                <option value={professor.id} key={professor.id}>
                  {professor.nome}
                </option>
              ))}
            </select>

            <select
              onChange={handleChangeTurma}
              value={turmaInfo.nivel_id}
              name="nivel_id"
              className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
              placeholder="Nome"
            >
              <option value="">Escolha um Nível:</option>
              {niveis?.map((nivel: Nivel) => (
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
    )
  );
};
export default EditTurmaModal;
