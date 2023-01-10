import { Close } from '@mui/icons-material';
import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { RoleObj } from '../../objs/RoleObj';
import Distribute from './Distribute';
import PlayerNames from './PlayerNames';
import RoleDefine from './RoleDefine';

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

declare interface RoleShuffleDialogProps {
	roles: RoleObj[] | undefined;
	setRoles: StateSetter<RoleObj[] | undefined>;
	names: string[] | undefined;
	setNames: StateSetter<string[] | undefined>;
	step: number;
	setStep: StateSetter<number>;
	shuffledRoles: any[];
	playerAmount: number | undefined;
	onClose: () => void;
}

const RoleShuffleDialog: React.FunctionComponent<RoleShuffleDialogProps> = ({
	roles,
	setRoles,
	names,
	setNames,
	step,
	setStep,
	shuffledRoles,
	playerAmount,
	onClose,
}) => {
	return (
		<Dialog open fullScreen>
			<AppBar>
				<Toolbar>
					<Typography variant='h5' className="flex-grow">Role Shuffler</Typography>
					<IconButton onClick={onClose}>
						<Close />
					</IconButton>
				</Toolbar>
			</AppBar>
			<AppBar position="static" className='invisible'>
				<Toolbar />
			</AppBar>
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
		</Dialog>
	);
};

export default RoleShuffleDialog;
