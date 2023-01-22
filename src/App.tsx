import { Container, Stack } from '@mui/material';
import React from 'react';
import RoleFeature from './views/Roles';
import ScoreFeature from './views/Scores';

export const App: React.FunctionComponent = () => {
	return (
		<Container>
			<Stack spacing={2} className="my-2">
				<RoleFeature />
				{/* <TimerFeature /> */}
				<ScoreFeature />
			</Stack>
		</Container>
	);
};
