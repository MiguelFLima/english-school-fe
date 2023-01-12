import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  getAllClasses,
  getAllLevels,
  getAllMatriculas,
  getAllStudents,
} from '../src/database/fetchs';

const Dashboard = () => {
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
  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;
