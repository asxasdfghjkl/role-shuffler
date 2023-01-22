import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import { RoleFeatureState } from '../objs/roleFeatureState';
import PlayerNames from './PlayerNames';
import RoleDefine from './RoleDefine';
import ViewRoles from './ViewRoles';

declare interface RoleShuffleDialogProps {}

const RoleSteps: React.FunctionComponent<RoleShuffleDialogProps> = () => {
	const { getState, setState } = useFeatureState<RoleFeatureState>();

	const { step } = getState();

	switch (step) {
		case 0:
			return <RoleDefine />;
		case 1:
			return <PlayerNames />;
		case 2:
			return <ViewRoles />;
		default:
			setState('step', 0);
			return null;
	}
};

export default RoleSteps;
