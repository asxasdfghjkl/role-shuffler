import { Button, Chip, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import StepControl from '../../../components/StepControl';
import { RoleFeatureState } from '../objs/roleFeatureState';

const Distribute: React.FunctionComponent = () => {
	const { getState, setState, setActivated } = useFeatureState<RoleFeatureState>();
	const { names, assignedRoles } = getState();

	const [clickCounts, setClickCounts] = React.useState<number[]>([]);
	const [displaying, setDisplaying] = React.useState<number>();

	const onNameClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
		const index = parseInt(evt.currentTarget.dataset.index!, 10);
		clickCounts[index] = (clickCounts[index] || 0) + 1;
		setClickCounts([...clickCounts]);
		setDisplaying(index);
	};

	return (
		<>
			{displaying !== undefined && (
				<Dialog open>
					<DialogContent className="text-center overflow-x-hidden">
						You are
						<Typography variant="h3" className="whitespace-pre-wrap">
							{assignedRoles![displaying]}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDisplaying(undefined)}>Close</Button>
					</DialogActions>
				</Dialog>
			)}
			<Grid container spacing={2} className="mt-3 px-2">
				{names.map((name, index) => (
					<Grid key={index} xs={6}>
						<Button
							variant="contained"
							fullWidth
							color={clickCounts[index] ? 'success' : 'warning'}
							data-index={index}
							onClick={onNameClick}
						>
							{name} {!!clickCounts[index] && <Chip size="small" label={clickCounts[index]} className="ml-1" />}
						</Button>
					</Grid>
				))}
			</Grid>
			<StepControl
				currentStep={2}
				nextDisabled
				onBack={() => {
					if (confirm('Are you sure? You will lose the current roles assigned to players.')) {
						setState('step', 1);
						setState('assignedRoles', null);
						setActivated(false);
					}
				}}
			/>
		</>
	);
};

export default Distribute;
