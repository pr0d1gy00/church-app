type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Interfaz para un solo objeto de Célula
export interface Cell {
  id: number;
  name: string;
  meetingDay: DayOfWeek;
  leader:leader
  meetingTime: string; // Esto es una cadena en formato ISO 8601
  location: string;
  leaderId: number;
  createdAt: string; // Cadena en formato ISO 8601
  updatedAt: string; // Cadena en formato ISO 8601
  deletedAt: string | null;
}

// Interfaz para la respuesta completa de la API que contiene la lista de células
export interface CellsApiResponse {
  message: string;
  cells: Cell[];
}
export interface CellDetails extends Cell {
  members: CellMember[];
}
export interface CellMemberUser {
  id: number;
  name: string;
  email: string;
  role: string; // "ADMIN", "LEADER", "MEMBER", etc.
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  // La contraseña se omite intencionadamente por seguridad
}

// Interface para un miembro de la célula
export interface CellMember {
  id: number;
  joinedAt: string;
  leftAt: string | null;
  cellId: number;
  userId: number;
  user: CellMemberUser;
}

export interface CellApiResponseById {
  cell: CellDetails;
  message: string;
}

export interface leader{
	creatAt: string;
	id: number;
	name: string;
	role: string;
	updatedAt: string;
	deletedAt: string | null;
	email: string;

}