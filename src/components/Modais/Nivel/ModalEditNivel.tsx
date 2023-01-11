import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Nivel } from '../../../types/NivelType';
import { addEditedNivel } from '../../../database/fetchs';

interface EditNivelProps {
  nivelEditModal: boolean;
  handleCloseEditNivelModal: () => void;
  handleOpenNivelEditModal: (nivel: Nivel) => void;
  nivelToEdit: Nivel;
}

const EditNivelModal = ({
  nivelEditModal,
  nivelToEdit,
  handleCloseEditNivelModal,
}: EditNivelProps) => {
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

  const [nivelInfo, setNivelInfo] = useState<Nivel>({
    id: nivelToEdit.id,
    descr_nivel: nivelToEdit.descr_nivel,
  });
  console.log('nivelInfo', nivelInfo);

  const handleChangeNivel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    setNivelInfo({ ...nivelInfo, [name]: value });
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
    await addEditedNivel(nivelInfo);
    notify();
    handleCloseEditNivelModal();
  };

  return (
    nivelInfo && (
      <div>
        <Modal
          isOpen={nivelEditModal}
          onRequestClose={handleCloseEditNivelModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form
            onSubmit={handleAddEditedNivel}
            className="flex flex-col p-6 text-left"
          >
            <h1 className="font-bold text-3xl p-4 mb-4">
              Informações sobre o Nível
            </h1>
            <input
              onChange={handleChangeNivel}
              value={nivelInfo.descr_nivel}
              name="descr_nivel"
              className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
              placeholder="Nome"
              type="text"
            />

            <button className="py-2 px-4 mt-10 bg-blue-500 rounded-2xl w-[50%] mx-auto font-bold text-xl tracking-wider hover:bg-blue-700 active:scale-95 transition duration-100 ">
              Salvar
            </button>
          </form>
        </Modal>
      </div>
    )
  );
};
export default EditNivelModal;
