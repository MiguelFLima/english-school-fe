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
import NewStudentModal from '../src/components/Modal';

export default function Home() {
  const [escolha, setEscolha] = useState('');

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
            handleOpenModal={handleOpenModal}
            escolha={escolha}
            estudantes={estudantes}
            niveis={niveis}
            classes={classes}
            matriculas={matriculas}
          />
        </div>
        <NewStudentModal
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
        />
      </main>
    </>
  );
}
