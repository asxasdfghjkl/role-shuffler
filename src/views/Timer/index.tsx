import { Typography } from '@mui/material';
import * as React from 'react';
import Feature from '../../components/Feature';

declare interface TimerProps {}

const TimerFeature: React.FunctionComponent<TimerProps> = ({}) => {
	return (
		<Feature
			dialogTitle="Timer"
			dialogContent={<div>hi</div>}
			cardContent={
				<Typography variant="h3" className="flex justify-center items-center">
					Timer
				</Typography>
			}
		/>
	);
};

export default TimerFeature;
