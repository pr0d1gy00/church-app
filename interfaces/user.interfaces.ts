import { CellMember, Cell } from './cell.interfaces';
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // La contraseña es opcional, usualmente no se envía al cliente.
  role: 'MEMBER' | 'ADMIN' | 'LEADER'; // Puedes ajustar los roles según tu aplicación.
  createdAt: string; // O puedes usar el tipo Date si lo conviertes.
  updatedAt: string; // O puedes usar el tipo Date si lo conviertes.
  deletedAt: string | null;
}

// Interfaz para la respuesta completa de la API que contiene la lista de usuarios
export interface UsersApiResponse {
  message: string;
  users: User[];
}

export interface UserCellMemberProps{
  cellId: number;
  if:number;
  joineAt: string;
  leftAt: string | null;
  userId: number;
  cell: Cell;
}
export interface UserCellLederProps{
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  leaderId: number;
  locatiion: string;
  meetingDay: string;
  meetingTime: string;
  name: string;
  id: number;

}


export interface UserWithAllOfData extends User {
  cellMembers: UserCellMemberProps[];
  cellLeader: UserCellLederProps | null;
}


export interface UsersGetAllResponse {
  message: string;
  users: UserWithAllOfData[];
}