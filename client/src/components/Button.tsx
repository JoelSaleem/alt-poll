import { Button as ChakraBtn } from "@chakra-ui/react";

type ButtonTypes = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonTypes;
}

const COLOUR_SCHEME: {
  [key in ButtonTypes]: {
    bg: string;
    _hover: { bg: string };
    _active: { bg: string };
    _focus: { bg: string };
  };
} = {
  primary: {
    bg: "brand.main",
    _hover: { bg: "brand.accent" },
    _active: { bg: "brand.superAccent" },
    _focus: { bg: "brand.accent" },
  },
  secondary: {
    bg: "brand.accent",
    _hover: { bg: "brand.superAccent" },
    _active: { bg: "white" },
    _focus: { bg: "brand.superActive" },
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
}) => {
  return (
    <ChakraBtn
      bg={COLOUR_SCHEME[variant].bg}
      _hover={COLOUR_SCHEME[variant]._hover}
      _active={COLOUR_SCHEME[variant]._active}
      _focus={COLOUR_SCHEME[variant]._focus}
    >
      {children}
    </ChakraBtn>
  );
};
