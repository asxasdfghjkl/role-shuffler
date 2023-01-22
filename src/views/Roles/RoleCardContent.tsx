import { Shuffle } from '@mui/icons-material';
import { Chip, Typography } from '@mui/material';
import * as React from 'react';
import { useFeatureState } from '../../components/Feature';
import { RoleFeatureState } from './objs/roleFeatureState';

const RoleCardContent: React.FunctionComponent = () => {
	const { getState } = useFeatureState<RoleFeatureState>();

	const { assignedRoles } = getState();
	return (
		<Typography variant="h3" className="flex-center">
			<Shuffle fontSize="inherit" />
			Role Assign
			{!!assignedRoles && <Chip label={assignedRoles.length} className="ml-2" color="primary" />}
		</Typography>
	);
};

export default RoleCardContent;
