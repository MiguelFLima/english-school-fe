import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { NewStudentInfo } from '../types/StudentType';
import { PostAColaborator } from '../database/fetchs';
import Loading from './Loading';
import { toast } from 'react-toastify';

interface NewStudentModalProps {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
}

const NewStudentModal = ({
  modalIsOpen,
  handleCloseModal,
  handleOpenModal,
}: NewStudentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

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

  const [studentInfo, setStudentInfo] = useState<NewStudentInfo>({
    nome: '',
    ativo: '',
    email: '',
    role: '',
  });

  const handleChangeStudent = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name } = e.target;
    const { value } = e.target;

    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const notify = () =>
    toast('Adicionado ✅!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    });

  const handleAddColaborator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await PostAColaborator(studentInfo);
    setStudentInfo({
      nome: '',
      ativo: '',
      email: '',
      role: '',
    });
    handleCloseModal();
    notify(); // NAO ESTA FUNCIONANDO
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form
          onSubmit={handleAddColaborator}
          className="flex flex-col p-6 text-left"
        >
          <h1 className="font-bold text-3xl p-4 mb-4">
            Informações sobre o colaborador
          </h1>
          <input
            onChange={handleChangeStudent}
            value={studentInfo.nome}
            name="nome"
            className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600  border-b border-gray-400 rounded-md"
            placeholder="Nome"
            type="text"
          />
          <select
            value={studentInfo.ativo || ''}
            onChange={handleChangeStudent}
            name="ativo"
            className="outline-none p-2 pl-[5px] mb-1 text-gray-600 border-b border-gray-400 rounded-md"
          >
            <option defaultChecked={true} value="">
              Ativo?
            </option>
            <option value={1}>Sim</option>
            <option value={0}>Não</option>
          </select>
          <input
            value={studentInfo.email}
            onChange={handleChangeStudent}
            name="email"
            className="outline-none p-2 mb-1 text-gray-600 placeholder:text-gray-600 border-b border-gray-400 rounded-md"
            placeholder="Email"
            type="email"
          />
          <select
            value={studentInfo.role}
            onChange={handleChangeStudent}
            name="role"
            className="outline-none p-2 mb-1 pl-[5px] text-gray-600 border-b border-gray-400 rounded-md"
          >
            <option defaultChecked={true} value="">
              Escolha o papel:
            </option>
            <option value="estudante">Aluno</option>
            <option value="docente">Professor</option>
          </select>
          <button className="py-2 px-4 mt-10 bg-blue-500 rounded-2xl w-[50%] mx-auto font-bold text-xl tracking-wider hover:bg-blue-700 active:scale-95 transition duration-100 ">
            {isLoading ? <Loading /> : 'Cadastrar'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default NewStudentModal;
