import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { PostAMatricula } from '../../../database/fetchs';
import { toast } from 'react-toastify';
import { Matricula } from '../../../types/Matricula';
import { Student } from '../../../types/StudentType';
import { Class } from '../../../types/Class';

interface NewMatriculaModalProps {
  isModalAddMatriculaOpen: boolean;
  handleAddMatriculaModal: () => void;
  estudantes: Student[] | undefined;
  classes: Class[];
}

const NewMatriculaModal = ({
  handleAddMatriculaModal,
  isModalAddMatriculaOpen,
  estudantes,
  classes,
}: NewMatriculaModalProps) => {
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
    status: 'confirmado',
    estudante_id: 0,
    turma_id: 0,
  });

  const handleChangeMatricula = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name } = e.target;
    const { value } = e.target;

    setMatriculaInfo({ ...matriculaInfo, [name]: value });
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

    await PostAMatricula(matriculaInfo);
    setMatriculaInfo({
      estudante_id: 0,
      turma_id: 0,
    });
    handleAddMatriculaModal();
    notify();
  };

  return (
    <div>
      <Modal
        isOpen={isModalAddMatriculaOpen}
        onRequestClose={handleAddMatriculaModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form
          onSubmit={handleAddColaborator}
          className="flex flex-col p-6 text-left animate-[fadeIn_0.8s]"
        >
          <h1 className="font-bold text-3xl p-4 mb-4">
            Informações sobre a Matrícula
          </h1>
          <select
            value={matriculaInfo.estudante_id}
            onChange={handleChangeMatricula}
            name="estudante_id"
            className="outline-none p-2 pl-[5px] mb-1 text-gray-600 border-b border-gray-400 rounded-md"
          >
            <option defaultChecked value="">
              Escolha um Estudante:
            </option>
            {estudantes?.map((estudante) => (
              <option value={estudante.id} key={estudante.id}>
                {estudante.nome}
              </option>
            ))}
          </select>
          <select
            value={matriculaInfo.turma_id || ''}
            onChange={handleChangeMatricula}
            name="turma_id"
            className="outline-none p-2 pl-[5px] mb-1 text-gray-600 border-b border-gray-400 rounded-md"
          >
            <option defaultChecked value="">
              Escolha uma Turma:
            </option>
            {classes?.map((turma) => (
              <option key={turma.id}>{turma.id}</option>
            ))}
          </select>
          <button className="py-2 px-4 mt-10 bg-blue-500 rounded-2xl w-[50%] mx-auto font-bold text-xl tracking-wider hover:bg-blue-700 active:scale-95 transition duration-100 ">
            Criar
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default NewMatriculaModal;
