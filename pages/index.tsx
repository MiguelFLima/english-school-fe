import Head from 'next/head';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import Sidebar from '../src/components/Sidebar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAllLevels,
  getAllStudents,
  getAllClasses,
  getAllMatriculas,
} from '../src/database/fetchs';
import { useState } from 'react';
import NewStudentModal from '../src/components/Modais/Colaborador/ModalAdicionarColaborador';
import EditStudentModal from '../src/components/Modais/Colaborador/ModalEditarColaborador';
import { NewStudentInfo, Student } from '../src/types/StudentType';
import AddNivelModal from '../src/components/Modais/Nivel/ModalAdicionarNivel';
import NewMatriculaModal from '../src/components/Modais/Matricula/ModalCreateMatricula';
import AddTurmaModal from '../src/components/Modais/Turma/ModalCriarTurma';
import EditNivelModal from '../src/components/Modais/Nivel/ModalEditNivel';
import { Nivel } from '../src/types/NivelType';
import { Class } from '../src/types/Class';
import EditTurmaModal from '../src/components/Modais/Turma/ModalEditTurma';
import { Matricula } from '../src/types/Matricula';
import EditMatriculaModal from '../src/components/Modais/Matricula/ModalEditMatricula';
import { http } from '../src/http';

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
  const [turmaToEdit, setTurmaToEdit] = useState<Class>({
    id: 0,
    nivel_id: 0,
    docente_id: 0,
  });
  const [matriculaToEdit, setMatriculaToEdit] = useState<Matricula>({
    id: 0,
    estudante_id: 0,
    status: '',
  });

  const queryClient = useQueryClient();

  // ===================== FETCHS =========================

  // ======== COLABORADORES ==============

  const { data: estudantes } = useQuery(
    ['todasPessoas'],
    () => getAllStudents(),
    { refetchOnWindowFocus: false }
  );

  const { mutate: createColaborator } = useMutation(
    async (student: NewStudentInfo) => {
      return await http
        .post('pessoas', {
          nome: String(student.nome),
          ativo: Boolean(student.ativo === 0 ? false : true),
          email: String(student.email),
          role: String(student.role),
        })
        .then((response) => {
          queryClient.invalidateQueries(['todasPessoas']);
        });
    }
  );

  // ========== NIVEIS ==============

  const { data: niveis } = useQuery(['niveis'], () => getAllLevels());

  const { data: classes } = useQuery(['classes'], () => getAllClasses());
  const { data: matriculas } = useQuery(['matriculas'], () =>
    getAllMatriculas()
  );

  // =============== MODAIS ==============

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
      ativo: Boolean(student.ativo),
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

  // ========  NIVEL MODAL  ========
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

  // ============== TURMAS MODAL ===========

  const [isAddTurmaModalOpen, setIsAddTurmaModalOpen] = useState(false);

  const handleOpenCloseAddTurmaModal = () => {
    setIsAddTurmaModalOpen(!isAddTurmaModalOpen);
  };

  const [modalEditTurma, setModalEditTurma] = useState(false);

  const handleOpenEditTurmaModal = (turma: Class) => {
    setModalEditTurma(true);
    setTurmaToEdit({
      id: turma.id,
      docente_id: turma.docente_id,
      nivel_id: turma.nivel_id,
    });
  };

  const handleCloseEditTurmaModal = () => {
    setModalEditTurma(false);
  };

  // =========== MATRICULAS MODAL ===========

  const [isModalAddMatriculaOpen, setModalAddMAtriculaOpen] = useState(false);

  const handleAddMatriculaModal = () => {
    setModalAddMAtriculaOpen(!isModalAddMatriculaOpen);
  };

  const [modalEditMatricula, setmodalEditMatricula] = useState(false);

  const handleOpenEditMatriculaModal = (matricula: Matricula) => {
    setmodalEditMatricula(true);
    setMatriculaToEdit({
      id: matricula.id,
      estudante_id: matricula.estudante_id,
      status: matricula.status,
    });
  };

  const handleCloseEditMatriculaModal = () => {
    setmodalEditMatricula(false);
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
            handleOpenEditMatriculaModal={handleOpenEditMatriculaModal}
            handleOpenEditTurmaModal={handleOpenEditTurmaModal}
            handleOpenNivelEditModal={handleOpenNivelEditModal}
            handleOpenCloseAddTurmaModal={handleOpenCloseAddTurmaModal}
            handleAddMatriculaModal={handleAddMatriculaModal}
            handleOpenNewNivelModal={handleOpenNewNivelModal}
            handleOpenEditModal={handleOpenEditModal}
            handleCloseEditModal={handleCloseEditModal}
            handleOpenModal={handleOpenModal}
            escolha={escolha}
            estudantes={estudantes!}
            niveis={niveis}
            classes={classes}
            matriculas={matriculas}
          />
        </div>
      </main>
      {modalIsOpen ? (
        <NewStudentModal
          createColaborator={createColaborator}
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
      {modalEditTurma ? (
        <EditTurmaModal
          turmaToEdit={turmaToEdit}
          estudantes={estudantes}
          niveis={niveis}
          modalEditTurma={modalEditTurma}
          handleCloseEditTurmaModal={handleCloseEditTurmaModal}
        />
      ) : (
        ''
      )}
      {modalEditMatricula ? (
        <EditMatriculaModal
          matriculaToEdit={matriculaToEdit}
          handleCloseEditMatriculaModal={handleCloseEditMatriculaModal}
          modalEditMatricula={modalEditMatricula}
        />
      ) : (
        ''
      )}
    </>
  );
}
