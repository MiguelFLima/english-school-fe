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
import NewMatriculaModal from '../src/components/Modais/Matricula/ModalCreateMatricula';
import AddTurmaModal from '../src/components/Modais/Turma/ModalCriarTurma';
import EditNivelModal from '../src/components/Modais/Nivel/ModalEditNivel';
import { Nivel } from '../src/types/NivelType';

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
  const [nivelToEdit, setNivelToEdit] = useState<Nivel>({
    id: 0,
    descr_nivel: '',
  });
  // console.log('nivelToEdit', nivelToEdit);

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

  // ====== COLABORADORES MODAL =======

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // EDICAO COLABORADOR MODAL
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

  // ========  NIVEL  ========
  const [addNivelModal, setAddNivelModal] = useState(false);

  const handleOpenNewNivelModal = () => {
    setAddNivelModal(true);
  };
  const handleCloseNewNivelModal = () => {
    setAddNivelModal(false);
  };

  const [nivelEditModal, setNivelEditModal] = useState(false);
  const handleCloseEditNivelModal = () => {
    setNivelEditModal(false);
  };
  const handleOpenNivelEditModal = (nivel: Nivel) => {
    setNivelEditModal(true);
    setNivelToEdit({
      id: nivel.id,
      descr_nivel: nivel.descr_nivel,
    });
  };

  // ====== TURMAS ======

  const [isAddTurmaModalOpen, setIsAddTurmaModalOpen] = useState(false);

  const handleOpenCloseAddTurmaModal = () => {
    setIsAddTurmaModalOpen(!isAddTurmaModalOpen);
  };

  // ====== MATRICULAS ======

  const [isModalAddMatriculaOpen, setModalAddMAtriculaOpen] = useState(false);

  const handleAddMatriculaModal = () => {
    setModalAddMAtriculaOpen(!isModalAddMatriculaOpen);
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
            handleOpenNivelEditModal={handleOpenNivelEditModal}
            handleOpenCloseAddTurmaModal={handleOpenCloseAddTurmaModal}
            handleAddMatriculaModal={handleAddMatriculaModal}
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
      <NewMatriculaModal
        estudantes={estudantes}
        classes={classes}
        handleAddMatriculaModal={handleAddMatriculaModal}
        isModalAddMatriculaOpen={isModalAddMatriculaOpen}
      />
      <AddTurmaModal
        isAddTurmaModalOpen={isAddTurmaModalOpen}
        handleOpenCloseAddTurmaModal={handleOpenCloseAddTurmaModal}
        niveis={niveis}
        estudantes={estudantes}
      />
      {nivelEditModal ? (
        <EditNivelModal
          nivelToEdit={nivelToEdit}
          handleCloseEditNivelModal={handleCloseEditNivelModal}
          handleOpenNivelEditModal={handleOpenNivelEditModal}
          nivelEditModal={nivelEditModal}
        />
      ) : (
        ''
      )}
    </>
  );
}
