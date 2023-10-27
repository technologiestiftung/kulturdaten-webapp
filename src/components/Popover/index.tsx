import { colors } from "@common/styleVariables";
import styled from "@emotion/styled";
import {
	FloatingFocusManager,
	autoUpdate,
	flip,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
} from "@floating-ui/react";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import Button from "../Button";

const TriggerButton = styled(Button)({});

const PopoverContainer = styled.div({
	backgroundColor: colors.white,
	zIndex: 1,
});

interface Props {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean, event?: Event) => void;
	triggerProps?: ComponentPropsWithoutRef<typeof Button>;
	children: ReactNode;
}

export default function Popover({ isOpen, onOpenChange, triggerProps, children }: Props) {
	const { refs, floatingStyles, context } = useFloating<HTMLButtonElement>({
		open: isOpen,
		placement: "bottom-start",
		onOpenChange,
		middleware: [flip(), shift()],
		whileElementsMounted: autoUpdate,
	});
	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
	return (
		<>
			<TriggerButton
				ref={refs.setReference}
				{...getReferenceProps({
					as: "button",
					...triggerProps,
				})}
			/>
			{isOpen && (
				<FloatingFocusManager context={context} modal={false}>
					<PopoverContainer ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
						{children}
					</PopoverContainer>
				</FloatingFocusManager>
			)}
		</>
	);
}
