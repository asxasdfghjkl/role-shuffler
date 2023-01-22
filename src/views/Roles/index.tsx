import Feature from '../../components/Feature';
import { RoleFeatureState } from './objs/roleFeatureState';
import RoleCardContent from './RoleCardContent';
import RoleSteps from './Steps';

export const RoleShuffle = () => {
	return (
		<Feature
			dialogTitle="Roles"
			dialogContent={<RoleSteps />}
			cardContent={<RoleCardContent />}
			initalState={
				{
					step: 0,
					steps: 3,
					roles: [],
					names: [],
					assignedRoles: null,
				} as RoleFeatureState
			}
		/>
	);
};

export default RoleShuffle;

