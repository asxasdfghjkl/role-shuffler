import { Container, Stack } from '@mui/material';
import React from 'react';
import RoleShuffle from './views/RoleShuffle';

export const App: React.FunctionComponent = () => {
	return (
		<Container>
			<Stack spacing={2} className="my-2">
				<RoleShuffle />
			</Stack>
		</Container>
	);
};
