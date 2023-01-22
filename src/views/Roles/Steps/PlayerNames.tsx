import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import SetPlayers from '../../../components/SetPlayers';
import StepControl from '../../../components/StepControl';
import { Role } from '../objs/role';
import { RoleFeatureState } from '../objs/roleFeatureState';

declare interface PlayerNamesProps {}

const PlayerNames: React.FunctionComponent<PlayerNamesProps> = () => {
	const { getState, setState, setActivated } = useFeatureState<RoleFeatureState>();

	const amount = React.useMemo(() => getState<Role[]>('roles').reduce((sum, item) => sum + item.amount, 0), [getState('roles')]);

	const onNext = () => {
		const names = getState<string[]>('names');
		localStorage.names = JSON.stringify(names);
		const filledName = names.map((name, index) => (name ? name : `Player ${index + 1}`));
		setState('names', filledName);
		setState('step', 2);

		const allRoles = [];
		for (const role of getState<Role[]>('roles')) {
			for (let i = 0; i < role.amount; ++i) {
				allRoles.push(role.name);
			}
		}
		setState(
			'assignedRoles',
			allRoles.sort(() => Math.random() - 0.5)
		);
		setActivated(true);
	};

	return (
		<>
			<SetPlayers playerCount={amount} stateKey="names" />
			<StepControl currentStep={1} onBack={() => setState('step', 0)} onNext={onNext} />
		</>
	);
};

export default PlayerNames;
