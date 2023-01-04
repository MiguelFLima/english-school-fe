import { http } from '../http';
import { Student } from '../types/StudentType';

export const getAllStudents = async () => {
  const students = await http<Student[]>('pessoas/todos');
  return students.data;
};
