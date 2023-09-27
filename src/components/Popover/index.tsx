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
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import Button from "../Button";

const TriggerButton = styled(Button)({});

const PopoverContainer = styled.div({
	backgroundColor: colors.white,
});

interface Props {
	triggerProps?: ComponentPropsWithoutRef<typeof Button>;
	children: ReactNode;
}

export default function Popover({ triggerProps, children }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const { refs, floatingStyles, context } = useFloating<HTMLButtonElement>({
		open: isOpen,
		placement: "bottom-start",
		onOpenChange: setIsOpen,
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
				as="button"
				{...triggerProps}
				ref={refs.setReference}
				{...getReferenceProps({
					onClick(event) {
						event.stopPropagation();
					},
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
