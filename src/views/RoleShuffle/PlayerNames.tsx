import { List, ListItem, TextField } from '@mui/material';
import * as React from 'react';
import StepControl from '../../components/StepControl';

declare interface PlayerNamesProps {
	amount: number;
	onNext: (names: string[]) => void;
	onBack: () => void;
}

const PlayerNames: React.FunctionComponent<PlayerNamesProps> = ({ amount, onBack, onNext }) => {
	const [names, setNames] = React.useState(() => {
		let saved: string[] = [];
		try {
			const savedNames = JSON.parse(localStorage.names);
			if (Array.isArray(savedNames)) {
				saved = savedNames;
			}
		} catch {}
		if (saved.length < amount) {
			const savedLength = saved.length;
			saved.length = amount;
			saved.fill('', savedLength);
		} else {
			saved.length = amount;
		}
		return saved;
	});

	const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const index = parseInt(evt.target.name, 10);
		const newNames = [...names];
		newNames[index] = evt.target.value;
		setNames(newNames);
	};

	return (
		<>
			<List>
				{names.map((name, index) => (
					<ListItem key={index}>
						{index + 1}
						<TextField
							className=" ml-2 flex-grow"
							name={index.toString()}
							value={name}
							onChange={onNameChange}
							placeholder={`Player ${index + 1}`}
						/>
					</ListItem>
				))}
			</List>
			<StepControl
				currentStep={1}
				onBack={onBack}
				onNext={() => {
					localStorage.names = JSON.stringify(names);
					const filledName = names.map((name, index) => (name ? name : `Player ${index + 1}`));
					onNext(filledName);
				}}
			/>
		</>
	);
};

export default PlayerNames;
