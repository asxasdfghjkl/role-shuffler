import { Card, CardActionArea } from '@mui/material';
import clsx from 'clsx';
import * as React from 'react';

declare interface FeatureCardProps {
	activated: boolean;
	children: React.ReactNode;
	onClick: () => void;
}

const FeatureCard: React.FunctionComponent<FeatureCardProps> = ({ activated, children, onClick }) => {
	return (
		<Card variant="outlined" className={clsx(activated ? 'bg-yellow-600' : '')}>
			<CardActionArea className="h-32 " onClick={onClick}>
				{children}
			</CardActionArea>
		</Card>
	);
};

export default FeatureCard;
