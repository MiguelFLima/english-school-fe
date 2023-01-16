export interface Student {
  id: number;
  nome: string;
  ativo: boolean | number | string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface NewStudentInfo {
  id?: number;
  nome: string;
  ativo: number;
  email: string;
  role: string;
}
