import * as React from 'react';

declare interface ConditionalWrapperProps {
	condition: boolean;
	wrapper: React.ReactElement;
	children: React.ReactNode;
}

const ConditionalWrapper: React.FunctionComponent<ConditionalWrapperProps> = ({ condition, wrapper, children }) => {
	if (condition) {
		return React.cloneElement(wrapper, { children }) as any;
	}
	return children || null;
};

export default ConditionalWrapper;
