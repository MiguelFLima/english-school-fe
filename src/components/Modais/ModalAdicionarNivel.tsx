import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { addToNiveis } from '../../database/fetchs';

interface AddNivelModalProps {
  addNivelModal: boolean;
  handleCloseNewNivelModal: () => void;
}

const AddNivelModal = ({
  addNivelModal,
  handleCloseNewNivelModal,
}: AddNivelModalProps) => {
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

  const [nomeNivel, setNomeNivel] = useState({
    descr_nivel: '',
  });

  const handleChangeNewNivel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    setNomeNivel({ ...nomeNivel, [name]: value });
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

  const handleAddNivel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToNiveis(nomeNivel);
  };

  return (
    <div>
      <Modal
        isOpen={addNivelModal}
        onRequestClose={handleCloseNewNivelModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleAddNivel} className="flex flex-col p-6 text-left">
          <h1 className="font-bold text-3xl p-4 mb-4">Defina o Nível</h1>
          <input
            onChange={handleChangeNewNivel}
            value={nomeNivel.descr_nivel}
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
  );
};
export default AddNivelModal;
