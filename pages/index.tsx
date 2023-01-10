import Head from 'next/head';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import Sidebar from '../src/components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import {
  getAllLevels,
  getAllStudents,
  getAllClasses,
  getAllMatriculas,
} from '../src/database/fetchs';
import { useState } from 'react';
import NewStudentModal from '../src/components/Modais/Colaborador/ModalAdicionarColaborador';
import EditStudentModal from '../src/components/Modais/Colaborador/ModalEditarColaborador';
import { Student } from '../src/types/StudentType';
import AddNivelModal from '../src/components/Modais/Nivel/ModalAdicionarNivel';

export default function Home() {
  const [escolha, setEscolha] = useState('');
  const [studentToEdit, setStudentToEdit] = useState({
    id: 0,
    nome: '',
    ativo: false,
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  });
  console.log('studentToEdit', studentToEdit);

  // ======== FETCHS =========

  const { data: estudantes } = useQuery(['todasPessoas'], () =>
    getAllStudents()
  );
  const { data: niveis } = useQuery(['niveis'], () => {
    return getAllLevels();
  });
  const { data: classes } = useQuery(['classes'], () => {
    return getAllClasses();
  });
  const { data: matriculas } = useQuery(['matriculas'], () => {
    return getAllMatriculas();
  });

  // ====== MODAL =======

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // ====== EDIÇÃO MODAL =====

  const [editModal, setEditModal] = useState(false);
  const handleOpenEditModal = (student: Student) => {
    setEditModal(true);
    setStudentToEdit({
      id: student.id,
      nome: student.nome,
      ativo: student.ativo,
      email: student.email,
      role: student.role,
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
    });
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
  };

  // ======== ADD NIVEL MODAL ========
  const [addNivelModal, setAddNivelModal] = useState(false);

  const handleOpenNewNivelModal = () => {
    setAddNivelModal(true);
  };
  const handleCloseNewNivelModal = () => {
    setAddNivelModal(false);
  };

  return (
    <>
      <Head>
        <title>Admin | English School</title>
        <meta
          name="description"
          content="Admin interface of a english school"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-[calc(100vh-110px)]">
        <Header />
        <div className="flex h-[100%] ">
          <Sidebar setEscolha={setEscolha} />
          <Main
            handleOpenNewNivelModal={handleOpenNewNivelModal}
            handleOpenEditModal={handleOpenEditModal}
            handleCloseEditModal={handleCloseEditModal}
            handleOpenModal={handleOpenModal}
            escolha={escolha}
            estudantes={estudantes}
            niveis={niveis}
            classes={classes}
            matriculas={matriculas}
          />
        </div>
      </main>
      {modalIsOpen ? (
        <NewStudentModal
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        ''
      )}
      {editModal ? (
        <EditStudentModal
          studentToEdit={studentToEdit}
          handleOpenEditModal={handleOpenEditModal}
          editModal={editModal}
          handleCloseEditModal={handleCloseEditModal}
        />
      ) : (
        ''
      )}
      <AddNivelModal
        handleCloseNewNivelModal={handleCloseNewNivelModal}
        addNivelModal={addNivelModal}
      />
    </>
  );
}
