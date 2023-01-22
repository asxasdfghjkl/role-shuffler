import { Close } from '@mui/icons-material';
import { AppBar, Dialog, IconButton, Toolbar } from '@mui/material';
import * as React from 'react';
import FeatureCard from './FeatureCard';

interface ContextObj<StateType, Key extends keyof StateType> {
	getState(stateKey: Key): StateType[Key];
	getState<TValue>(stateKey: Key): TValue;
	getState(): StateType;
	setState(stateKey: Key, value: StateType[Key]): void;
	activated: boolean;
	setActivated(val: boolean): void;
}

const StateContext = React.createContext<ContextObj<any, any>>(null as any);

export function useFeatureState<StateType>() {
	return React.useContext<ContextObj<StateType, keyof StateType>>(StateContext);
}

declare interface FeatureProps {
	dialogTitle?: React.ReactNode;
	dialogContent: React.ReactNode;
	cardContent: React.ReactNode;
	initalState?: any;
}

const Feature: React.FunctionComponent<FeatureProps> = ({ dialogTitle, dialogContent, cardContent, initalState }) => {
	const [showDialog, setShowDialog] = React.useState(false);
	const [featureState, setFeatureState] = React.useState<any>(initalState ?? {});
	const [activated, _setActivated] = React.useState(false);
	const setActivated = (value: boolean) => {
		if (activated === value) return;
		if (value) {
			activatedFeatures.count++;
		} else {
			activatedFeatures.count--;
		}
		_setActivated(value);
	};

	const getState = (stateKey?: string) => (stateKey === undefined ? featureState : featureState[stateKey]);
	const setState = (stateKey: string, value: any) => {
		setFeatureState((current: any) => ({
			...current,
			[stateKey]: value,
		}));
	};
	return (
		<StateContext.Provider value={{ setState, getState, activated, setActivated }}>
			{showDialog ? (
				<Dialog open fullScreen>
					<AppBar>
						<Toolbar>
							<div className="flex-grow">{dialogTitle}</div>
							<IconButton onClick={() => setShowDialog(false)}>
								<Close />
							</IconButton>
						</Toolbar>
					</AppBar>
					<AppBar position="static" className="invisible">
						<Toolbar />
					</AppBar>
					<div className="w-screen h-screen">{dialogContent}</div>
				</Dialog>
			) : (
				<FeatureCard activated={activated} onClick={() => setShowDialog(true)}>
					{cardContent}
				</FeatureCard>
			)}
		</StateContext.Provider>
	);
};

export default Feature;

const activatedFeatures = { count: 0 };
window.onbeforeunload = evt => {
	if (activatedFeatures.count > 0) {
		return (evt.returnValue = 'Are you sure?');
	}
};
