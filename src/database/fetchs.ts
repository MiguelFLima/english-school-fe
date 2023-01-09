import { toast } from 'react-toastify';
import { http } from '../http';
import { Nivel } from '../types/NivelType';
import { NewStudentInfo, Student } from '../types/StudentType';

export const getAllStudents = async () => {
  const students = await http<Student[]>('pessoas');
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

export const PostAColaborator = async (student: NewStudentInfo) => {
  try {
    const newPersonAdded = await http.post('pessoas', {
      nome: String(student.nome),
      ativo: Boolean(student.ativo === 0 ? false : true),
      email: String(student.email),
      role: String(student.role),
    });
    return newPersonAdded;
  } catch (error) {
    console.log(error);
  }
};

export const addEditColaborator = async (student: Student) => {
  try {
    await http.put(`pessoas/${student.id}`, {
      nome: student.nome,
      ativo: Boolean(student.ativo === true ? 1 : 0),
      email: String(student.email),
      role: String(student.role),
    });
  } catch (error) {
    console.log(error);
  }
};

const notify = () =>
  toast('Deletado ✅!', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });

export const deleteAColaborator = async (id: Number) => {
  try {
    const result = await http.delete(`pessoas/${id}`);
    notify();
    return result;
  } catch (error) {
    console.log(error);
  }
};
