import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import SetPlayers from '../../../components/SetPlayers';
import StepControl from '../../../components/StepControl';
import { ScoreFeatureState } from '../objs/ScoreFeatureState';

const ScoreNames: React.FunctionComponent = () => {
	const { getState, setState, setActivated } = useFeatureState<ScoreFeatureState>();

	return (
		<>
			<SetPlayers stateKey="players" />
			<StepControl
				currentStep={0}
				backDisabled
				onNext={() => {
					const names = getState<string[]>('players');
					setState('step', 1);
					setState('scores', new Array(names.length).fill(0));
					setActivated(true);
				}}
			/>
		</>
	);
};

export default ScoreNames;
