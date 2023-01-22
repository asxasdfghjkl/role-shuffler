import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import { ScoreFeatureState } from '../objs/ScoreFeatureState';
import ScoreNames from './Names';
import Scoreboard from './ScoreBoard';

const ScoreContent: React.FunctionComponent = () => {
	const { getState, setState } = useFeatureState<ScoreFeatureState>();
	const { step } = getState();

	switch (step) {
		case 0:
			return <ScoreNames />;
		case 1:
			return <Scoreboard />;
		default:
			setState('step', 0);
			return null;
	}
};

export default ScoreContent;
