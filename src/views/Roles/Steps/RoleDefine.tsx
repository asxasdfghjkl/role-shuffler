import { Add, AddCircle, Remove } from '@mui/icons-material';
import { Button, IconButton, List, ListItem, TextField } from '@mui/material';
import * as React from 'react';
import { useFeatureState } from '../../../components/Feature';
import StepControl from '../../../components/StepControl';
import { Role } from '../objs/role';
import { RoleFeatureState } from '../objs/roleFeatureState';

declare interface RoleDefineProps {}

const RoleDefine: React.FunctionComponent<RoleDefineProps> = () => {
	const { getState, setState } = useFeatureState<RoleFeatureState>();

	const [roles, setRoles] = React.useState(getState<Role[]>('roles'));
	const roleIndexRef = React.useRef(1);
	const onRoleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setRoles(roles => {
			const newRoles = [...roles];
			const targetIndex = parseInt(evt.target.name, 10);
			newRoles[targetIndex].name = evt.target.value;
			return newRoles;
		});
	};

	const onRoleAmountChange = (evt: React.MouseEvent<HTMLButtonElement>) => {
		const newRoles = [...roles];

		const index = parseInt(evt.currentTarget.dataset.index!, 10);
		const delta = parseInt(evt.currentTarget.dataset.delta!, 10);
		const role = newRoles[index];
		role.amount += delta;
		if (role.amount === 0) {
			newRoles.splice(index, 1);
		}

		setRoles(newRoles);
	};

	const onNewRole = () => {
		setRoles(roles => [...roles, { name: `Role ${roleIndexRef.current++}`, amount: 1 }]);
	};

	React.useEffect(() => {
		if (roles.length === 0) {
			onNewRole();
			onNewRole();
		}
	}, [roles]);

	return (
		<>
			<List>
				{roles.map((role, index) => (
					<ListItem key={index}>
						<TextField className="flex-grow" name={index.toString()} value={role.name} onChange={onRoleNameChange} />
						<IconButton data-index={index} data-delta={-1} onClick={onRoleAmountChange}>
							<Remove />
						</IconButton>
						<span>{role.amount}</span>
						<IconButton data-index={index} data-delta={1} onClick={onRoleAmountChange}>
							<Add />
						</IconButton>
					</ListItem>
				))}
			</List>
			<div className="text-right">
				<Button startIcon={<AddCircle />} onClick={onNewRole}>
					New Role
				</Button>
			</div>
			<StepControl
				currentStep={0}
				nextDisabled={roles.length < 2}
				onNext={() => {
					setState('step', 1);
					setState('roles', roles);
				}}
			/>
		</>
	);
};

export default RoleDefine;
