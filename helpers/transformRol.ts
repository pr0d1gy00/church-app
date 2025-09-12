export function transformRol(role: string) {
	  switch (role) {
		case 'ADMIN':
			return 'Administrador';
		case 'LEADER':
			return 'Líder';
		case 'MEMBER':
			return 'Miembro';
		default:
			return role; // Retorna el valor original si no coincide con ningún caso
	  }
}