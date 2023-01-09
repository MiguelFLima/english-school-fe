import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { NewStudentInfo, Student } from '../types/StudentType';
import { addEditColaborator } from '../database/fetchs';

interface EditStudentModalProps {
  editModal: boolean;
  handleCloseEditModal: () => void;
  handleOpenEditModal: (student: Student) => void;
  studentToEdit: Student;
}

const EditStudentModal = ({
  editModal,
  studentToEdit,
  handleCloseEditModal,
}: EditStudentModalProps) => {
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

  const [studentInfo, setStudentInfo] = useState<Student>({
    id: studentToEdit.id,
    nome: studentToEdit.nome,
    ativo: studentToEdit.ativo,
    email: studentToEdit.email,
    role: studentToEdit.role,
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

  const handleEditColaborator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addEditColaborator(studentInfo);
    handleCloseEditModal();
  };

  return (
    <div>
      <Modal
        isOpen={editModal}
        onRequestClose={handleCloseEditModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form
          onSubmit={handleEditColaborator}
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
            value={studentInfo.ativo === true ? 1 : 0}
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
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
};
export default EditStudentModal;
