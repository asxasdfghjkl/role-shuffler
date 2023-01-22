import { Scoreboard } from '@mui/icons-material';
import { Typography } from '@mui/material';
import * as React from 'react';
import Feature from '../../components/Feature';
import { ScoreFeatureState } from './objs/ScoreFeatureState';
import ScoreContent from './Steps';

declare interface ScoreFeatureProps {}

const ScoreFeature: React.FunctionComponent<ScoreFeatureProps> = ({}) => {
	return (
		<Feature
			dialogTitle="Scores"
			dialogContent={<ScoreContent />}
			cardContent={
				<Typography variant="h3" className="flex-center">
					<Scoreboard fontSize="inherit" />
					Scores
				</Typography>
			}
			initalState={
				{
					steps: 2,
					step: 0,
					players: [],
					scores: [],
				} as ScoreFeatureState
			}
		/>
	);
};

export default ScoreFeature;
