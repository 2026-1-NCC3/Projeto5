export interface ActivateAccountDTO {
  cpf: string;
  birth_date: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}