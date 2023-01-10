import React from 'react';
import { RoleObj } from '../../objs/RoleObj';
import RoleShuffleCard from './Card';
import RoleShuffleDialog from './Dialog';

export const RoleShuffle = () => {
	const [roles, setRoles] = React.useState<RoleObj[]>();
	const [names, setNames] = React.useState<string[]>();
	const [step, setStep] = React.useState(0);

	const playerAmount = React.useMemo(() => roles?.reduce((sum, role) => sum + role.amount, 0), [roles]);
	const shuffledRoles = React.useMemo(() => {
		if (step !== 2) return [];
		const allRoles = [];
		for (const role of roles!) {
			for (let i = 0; i < role.amount; ++i) {
				allRoles.push(role.name);
			}
		}

		return allRoles.sort(() => Math.random() - 0.5);
	}, [roles, names, step]);

	React.useEffect(() => {
		if (shuffledRoles.length > 0) {
			const handler = (evt: BeforeUnloadEvent) => {
				evt.preventDefault();
				return (evt.returnValue = 'Are you sure?');
			};
			window.addEventListener('beforeunload', handler, { capture: true });
			return () => window.removeEventListener('beforeunload', handler);
		}
	}, [shuffledRoles]);

	const [showDialog, setShowDialog] = React.useState(false);

	return showDialog ? (
		<RoleShuffleDialog
			names={names}
			setNames={setNames}
			roles={roles}
			setRoles={setRoles}
			step={step}
			setStep={setStep}
			shuffledRoles={shuffledRoles}
			playerAmount={playerAmount}
			onClose={() => setShowDialog(false)}
		/>
	) : (
		<RoleShuffleCard playerAmount={shuffledRoles.length} onClick={() => setShowDialog(true)} />
	);
};

export default RoleShuffle;

