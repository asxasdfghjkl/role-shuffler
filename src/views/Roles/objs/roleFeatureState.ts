import { Role } from './role';

export type RoleFeatureState = {
	steps: number;
	step: number;
	names: string[];
	roles: Role[];
	assignedRoles: string[] | null;
};
