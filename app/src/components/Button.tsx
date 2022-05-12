import { forwardRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import cx from "classnames";
import { Box, PolymorphicComponentProps } from "./Box";

export type ButtonProps = {
  loading?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "text";
  fullWidth?: boolean;
};

export type ButtonPropsExtended<E extends React.ElementType> =
  PolymorphicComponentProps<E, ButtonProps>;

const defaultElement = "button";

export const Button: <E extends React.ElementType = typeof defaultElement>(
  props: ButtonPropsExtended<E>
) => React.ReactElement | null = forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    props: ButtonPropsExtended<E>,
    ref: typeof props.ref
  ) => {
    const {
      loading = false,
      size = "medium",
      variant = "primary",
      fullWidth = false,
      className,
      disabled,
      children,
      ...restProps
    } = props;

    let rel: undefined | string;

    if (restProps.as === "a" && restProps.target === "_blank") {
      rel = "noopener noreferrer";
    }

    const clazz = cx(
      className,
      "text-center font-semibold rounded-lg min-w-[5rem] disabled:cursor-not-allowed",
      {
        "flex items-center justify-center cursor-pointer": restProps.as === "a",
      },
      { "w-full": fullWidth },
      { "bg-gray-500/20 text-gray-500/80": disabled },
      {
        "text-white bg-primary hover:bg-primary-dark":
          variant === "primary" && !disabled,
      },
      {
        "text-white bg-gray-800 hover:bg-gray-700":
          variant === "secondary" && !disabled,
      },
      { "bg-transparent hover:bg-gray-500/10": variant === "text" },
      { "text-button-small px-[10px] py-1": size === "small" },
      { "text-button-medium px-4 py-[6px]": size === "medium" },
      { "text-button-large px-[22px] py-2": size === "large" }
    );

    return (
      <Box
        as={defaultElement}
        ref={ref}
        className={clazz}
        disabled={disabled}
        rel={rel}
        {...restProps}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="inline-block font-semibold animate-[spin_800ms_linear_infinite]" />
        ) : (
          children
        )}
      </Box>
    );
  }
);

export default Button;
