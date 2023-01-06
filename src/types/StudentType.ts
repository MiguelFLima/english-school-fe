export interface Student {
  id: number;
  nome: string;
  ativo: boolean;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NewStudentInfo {
  nome: string;
  ativo: number;
  email: string;
  role: string;
}
