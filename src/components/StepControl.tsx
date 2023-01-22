import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import * as React from 'react';
import { useFeatureState } from './Feature';

declare interface StepControlProps {
	currentStep: number;
	onBack?: () => void;
	onNext?: () => void;
	backDisabled?: boolean;
	nextDisabled?: boolean;
}

const StepControl: React.FunctionComponent<StepControlProps> = ({ currentStep, onBack, onNext, backDisabled, nextDisabled }) => {
	const { getState } = useFeatureState<any>();
	return (
		<>
			<MobileStepper
				className="invisible"
				nextButton={undefined}
				steps={0}
				position="static"
				backButton={<Button startIcon={<KeyboardArrowLeft />}>Back</Button>}
			/>
			<MobileStepper
				activeStep={currentStep}
				steps={getState('steps')}
				position="bottom"
				backButton={
					<Button disabled={currentStep === 0 || backDisabled} startIcon={<KeyboardArrowLeft />} onClick={onBack}>
						Back
					</Button>
				}
				nextButton={
					<Button disabled={nextDisabled} endIcon={<KeyboardArrowRight />} onClick={onNext}>
						Next
					</Button>
				}
			/>
		</>
	);
};

export default StepControl;
