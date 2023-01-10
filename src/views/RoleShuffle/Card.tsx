import { Card, CardActionArea, Chip, Typography } from '@mui/material';
import clsx from 'clsx';
import * as React from 'react';

declare interface RoleShuffleCardProps {
	playerAmount: number | undefined;
	onClick: () => void;
}

const RoleShuffleCard: React.FunctionComponent<RoleShuffleCardProps> = ({ playerAmount, onClick }) => {
	return (
		<Card variant="outlined" className={clsx(playerAmount ? 'bg-yellow-600' : '')}>
			<CardActionArea className="h-32 " onClick={onClick}>
				<Typography variant="h3" className="text-center">
					Role Shuffler
					{!!playerAmount && <Chip label={playerAmount} className="ml-2" color="primary" />}
				</Typography>
			</CardActionArea>
		</Card>
	);
};

export default RoleShuffleCard;
