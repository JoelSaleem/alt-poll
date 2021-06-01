import { Box, BoxProps } from "@chakra-ui/layout";
export const colours = {
  1: "brand.shadow",
  2: "brand.main",
  3: "brand.accent",
  4: "brand.superAccent",
};
interface CardProps extends BoxProps {
  depth: 1 | 2 | 3;
  hoverColour?: string;
  activeColour?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  depth,
  hoverColour,
  activeColour,
  ...rest
}) => {
  return (
    <Box
      h="100%"
      bg={colours[depth]}
      {...(hoverColour && {
        _hover: {
          bg: hoverColour,
        },
      })}
      {...(activeColour && {
        _active: {
          bg: activeColour,
        },
      })}
      borderRadius={10}
      boxShadow={"2xl"}
      {...rest}
    >
      {children}
    </Box>
  );
};
