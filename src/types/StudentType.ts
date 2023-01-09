export interface Student {
  id: number;
  nome: string;
  ativo: boolean;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface NewStudentInfo {
  nome: string;
  ativo: number | string;
  email: string;
  role: string;
}
