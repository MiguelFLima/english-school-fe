export interface Matricula {
  id?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  estudante_id?: number;
  turma_id?: number;
}
