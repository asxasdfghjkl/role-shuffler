import React from 'react';
import { RoleObj } from './objs/RoleObj';
import Distribute from './views/Distribute';
import PlayerNames from './views/PlayerNames';
import RoleDefine from './views/RoleDefine';

function App() {
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
		window.addEventListener(
			'beforeunload',
			evt => {
				evt.preventDefault();
				return (evt.returnValue = 'Are you sure?');
			},
			{ capture: true }
		);
	}, []);

	return (
		<div>
			{step === 0 && (
				<RoleDefine
					defaultRoles={roles}
					onNext={roles => {
						setStep(1);
						setRoles(roles);
					}}
				/>
			)}
			{step === 1 && (
				<PlayerNames
					amount={playerAmount!}
					onBack={() => {
						setStep(0);
					}}
					onNext={names => {
						setNames(names);
						setStep(2);
					}}
				/>
			)}
			{step === 2 && <Distribute onBack={() => setStep(1)} roles={shuffledRoles} names={names!} />}
		</div>
	);
}

export default App;

