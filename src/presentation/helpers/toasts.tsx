import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import type { InterfaceToastProps } from "@gluestack-ui/toast/lib/typescript/types";
import type { ComponentProps } from "react";

interface ErrorToastProps extends ComponentProps<typeof Toast> {
  title?: string;
  message?: string;
  titleProps?: ComponentProps<typeof ToastTitle>;
  descriptionProps?: ComponentProps<typeof ToastDescription>;
}

export const errorToast = (props?: ErrorToastProps): InterfaceToastProps => {
  const {
    title = "Error",
    message = "Ops! Something went wrong, please try again.",
    titleProps,
    descriptionProps,
    ...rest
  } = props || {};
  return {
    placement: "top",
    render: ({ id }) => {
      const toastId = `toast-${id}`;
      return (
        <Toast
          nativeID={toastId}
          action="attention"
          variant="solid"
          bgColor="$red500"
          marginTop="$2"
          {...rest}
        >
          <VStack space="xs">
            <ToastTitle color="$white" {...titleProps}>
              {title}
            </ToastTitle>
            <ToastDescription color="$white" {...descriptionProps}>
              {message}
            </ToastDescription>
          </VStack>
        </Toast>
      );
    },
  };
};
