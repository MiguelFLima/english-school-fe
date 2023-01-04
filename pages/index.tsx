import Head from 'next/head';
import { useState } from 'react';
import Header from '../src/components/Header';
import Main from '../src/components/Main';
import Sidebar from '../src/components/Sidebar';
import { Student } from '../src/types/StudentType';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);

  const handleGetAllStudents = async () => {
    const res = await fetch('http://localhost:3000/pessoas/todos');
    let response = await res.json();
    setStudents(response);
  };

  console.log(students);

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
          <Sidebar handleGetAllStudents={handleGetAllStudents} />
          <Main students={students} />
        </div>
      </main>
    </>
  );
}
