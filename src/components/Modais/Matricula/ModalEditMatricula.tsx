import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addEditedMatricula } from '../../../database/fetchs';
import { Matricula } from '../../../types/Matricula';

interface EditMatriculaProps {
  modalEditMatricula: boolean;
  handleCloseEditMatriculaModal: () => void;
  matriculaToEdit: Matricula;
}

const EditMatriculaModal = ({
  modalEditMatricula,
  handleCloseEditMatriculaModal,
  matriculaToEdit,
}: EditMatriculaProps) => {
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

  const [matriculaInfo, setMatriculaInfo] = useState<Matricula>({
    estudante_id: matriculaToEdit.estudante_id,
    id: matriculaToEdit.id,
    status: matriculaToEdit.status,
  });
  console.log('matriculaInfo', matriculaInfo);

  const handleChangeMatricula = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    setMatriculaInfo({ ...matriculaInfo, [name]: value });
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
    await addEditedMatricula(matriculaInfo);
    notify();
    handleCloseEditMatriculaModal();
  };

  return (
    matriculaInfo && (
      <div>
        <Modal
          isOpen={modalEditMatricula}
          onRequestClose={handleCloseEditMatriculaModal}
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
              onChange={handleChangeMatricula}
              value={matriculaInfo.status}
              name="status"
              className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
              placeholder="Nome"
            >
              <option value="">Mude o Status:</option>
              <option value="confirmado">Confirmado</option>
              <option value="cancelado">Cancelado</option>
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
export default EditMatriculaModal;
