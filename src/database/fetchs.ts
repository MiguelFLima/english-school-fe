import { http } from '../http';
import { Nivel } from '../types/NivelType';
import { Student } from '../types/StudentType';

export const getAllStudents = async () => {
  const students = await http<Student[]>('pessoas/todos');
  return students.data;
};

export const getAllLevels = async () => {
  const result = await http.get<Nivel[]>('niveis');
  return result.data;
};

export const getAllClasses = async () => {
  const result = await http.get('turmas');
  return result.data;
};

export const getAllMatriculas = async () => {
  const result = await http.get('matriculas');
  return result.data;
};
