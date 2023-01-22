import { Add, Remove } from '@mui/icons-material';
import { Fab, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useFeatureState } from './Feature';

declare interface SetPlayersProps {
	playerCount?: number;
	stateKey: string;
}

const SetPlayers: React.FunctionComponent<SetPlayersProps> = ({ playerCount, stateKey }) => {
	const [players, setPlayers] = React.useState(playerCount ?? 2);
	const { getState, setState } = useFeatureState<any>();

	const names = getState<string[]>(stateKey);
	const setNames = (value: string[]) => setState(stateKey, value);

	React.useEffect(() => {
		let saved: string[] = [];
		try {
			const savedNames = JSON.parse(localStorage.names);
			if (Array.isArray(savedNames)) {
				saved = savedNames;
			}
		} catch {}
		if (saved.length < players) {
			const savedLength = saved.length;
			saved.length = players;
			saved.fill('', savedLength);
		} else {
			saved.length = players;
		}

		setNames(saved);
	}, []);

	const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const index = parseInt(evt.target.name, 10);
		const newNames = [...names];
		newNames[index] = evt.target.value;
		setNames(newNames);
	};

	const onAmountChange = (evt: React.MouseEvent<HTMLButtonElement>) => {
		const delta = parseInt(evt.currentTarget.dataset.delta!, 10);
		setPlayers(p => {
			const amount = p + delta;
			if (delta < 0) {
				setNames(names.slice(0, names.length - 1));
			} else {
				setNames([...names, '']);
			}

			return amount;
		});
	};

	return (
		<>
			{playerCount === undefined && (
				<Stack direction="row" justifyContent="center" alignItems="baseline">
					<Fab data-delta={-1} onClick={onAmountChange} size="small" disabled={players <= 2}>
						<Remove />
					</Fab>
					<Typography variant="h2" className="mx-3">
						{players}
					</Typography>
					<Fab data-delta={1} onClick={onAmountChange} size="small">
						<Add />
					</Fab>
				</Stack>
			)}
			<List>
				{names.map((name, index) => (
					<ListItem key={index}>
						{index + 1}
						<TextField
							className=" ml-2 flex-grow"
							name={index.toString()}
							value={name ?? ''}
							onChange={onNameChange}
							placeholder={`Player ${index + 1}`}
						/>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default SetPlayers;
