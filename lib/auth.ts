export type UserRole = 'student' | 'teacher' | 'admin';

export const validRoles: UserRole[] = ['student', 'teacher', 'admin'];

export function isAllowedRole(role: string): role is UserRole {
  return validRoles.includes(role as UserRole);
}

export function getRoleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    student: 'Talaba',
    teacher: 'O’qituvchi',
    admin: 'Admin',
  };

  return labels[role];
}
