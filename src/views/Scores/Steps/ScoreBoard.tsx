import { Button, InputAdornment, List, ListItem, TextField } from '@mui/material';
import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import StepControl from '../../../components/StepControl';
import { ScoreFeatureState } from '../objs/ScoreFeatureState';

declare interface ScoreboardProps {}

const Scoreboard: React.FunctionComponent<ScoreboardProps> = () => {
	const { getState, setState, setActivated } = useFeatureState<ScoreFeatureState>();
	const { players, scores } = getState();

	const onBack = () => {
		if (confirm('If you go back to last step you will lose the scores. Are you sure?')) {
			setState('step', 0);
			setActivated(false);
		}
	};

	const onScoreButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
		const delta = parseInt(evt.currentTarget.dataset.delta!, 10);
		const index = parseInt(evt.currentTarget.dataset.index!, 10);
		const scores = [...getState<number[]>('scores')];
		scores[index] += delta;
		setState('scores', scores);
	};

	const onScoreInput = (index: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(evt.currentTarget.value || '0', 10);
		if (!isNaN(value)) {
			const scores = [...getState<number[]>('scores')];
			scores[index] = value;
			setState('scores', scores);
		}
	};
	return (
		<>
			<List>
				{players.map((player, index) => {
					return (
						<ListItem key={index}>
							{player || `Player ${index + 1}`}
							<TextField
								value={scores[index]}
								data-index={index}
								className="mx-3 grow"
								onChange={onScoreInput(index)}
								InputProps={{
									classes: {
										input: 'text-center',
									},
									startAdornment: (
										<InputAdornment position="start">
											<Button
												data-index={index}
												data-delta={-1}
												size="small"
												className="min-w-[30px]"
												onClick={onScoreButton}
											>
												-1
											</Button>
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<Button
												data-index={index}
												data-delta={1}
												size="small"
												className="min-w-[30px]"
												onClick={onScoreButton}
											>
												+1
											</Button>
											<Button
												data-index={index}
												data-delta={10}
												size="small"
												className="min-w-[30px]"
												onClick={onScoreButton}
											>
												+10
											</Button>
										</InputAdornment>
									),
								}}
							/>
						</ListItem>
					);
				})}
			</List>
			<StepControl currentStep={1} nextDisabled onBack={onBack} />
		</>
	);
};

export default Scoreboard;
