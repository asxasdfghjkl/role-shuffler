import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import * as React from 'react';

declare interface StepControlProps {
	currentStep: number;
	onBack?: () => void;
	onNext?: () => void;
	backDisabled?: boolean;
	nextDisabled?: boolean;
}

const StepControl: React.FunctionComponent<StepControlProps> = ({ currentStep, onBack, onNext, backDisabled, nextDisabled }) => {
	return (
		<MobileStepper
			activeStep={currentStep}
			steps={3}
			position="static"
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
	);
};

export default StepControl;
