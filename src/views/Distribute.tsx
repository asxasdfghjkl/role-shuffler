import { Button, Chip, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import * as React from 'react';
import StepControl from '../components/StepControl';

declare interface DistributeProps {
	onBack: () => void;
	roles: string[];
	names: string[];
}

const Distribute: React.FunctionComponent<DistributeProps> = ({ onBack, roles, names }) => {
	const [clicked, setClicked] = React.useState<number[]>([]);
	const [displaying, setDisplaying] = React.useState<number>();

	const onNameClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
		const index = parseInt(evt.currentTarget.dataset.index!, 10);
		clicked[index] = (clicked[index] || 0) + 1;
		setClicked([...clicked]);
		setDisplaying(index);
	};

	return (
		<>
			{displaying !== undefined && (
				<Dialog open>
					<DialogContent className="text-center">
						You are
						<Typography variant="h3">{roles[displaying]}</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setDisplaying(undefined)}>Close</Button>
					</DialogActions>
				</Dialog>
			)}
			<StepControl currentStep={2} nextDisabled onBack={onBack} />
			<Grid container spacing={2} className="mt-3 px-2">
				{names.map((name, index) => (
					<Grid key={index} xs={6}>
						<Button
							variant="contained"
							fullWidth
							color={clicked[index] ? 'success' : 'warning'}
							data-index={index}
							onClick={onNameClick}
						>
							{name} {!!clicked[index] && <Chip size="small" label={clicked[index]} className="ml-1" />}
						</Button>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default Distribute;
