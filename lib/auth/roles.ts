export type AppRole = 'student' | 'teacher' | 'admin';

export const appRoles: AppRole[] = ['student', 'teacher', 'admin'];

export function isAppRole(value: string): value is AppRole {
  return appRoles.includes(value as AppRole);
}

export function getRoleLabel(role: AppRole) {
  const labels: Record<AppRole, string> = {
    student: 'Talaba',
    teacher: 'O’qituvchi',
    admin: 'Admin',
  };

  return labels[role];
}
