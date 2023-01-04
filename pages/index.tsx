import Head from 'next/head';
import { useState } from 'react';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import Sidebar from '../src/components/Sidebar';
import { Nivel } from '../src/types/NivelType';
import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '../src/database/fetchs';

export default function Home() {
  const [niveis, setNiveis] = useState<Nivel[]>([]);

  const { data: estudantes } = useQuery(['todasPessoas'], () =>
    getAllStudents()
  );
  // console.log('data', estudantes);

  const handleGetAllLevels = async () => {
    const niveis = await fetch('http://localhost:3000/niveis');
    const response = await niveis.json();
    setNiveis(response);
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

      <main className="h-[100vh]">
        <Header />
        <div className="flex h-[100%] ">
          <Sidebar handleGetAllLevels={handleGetAllLevels} />
          <Main estudantes={estudantes} niveis={niveis} />
        </div>
      </main>
    </>
  );
}
