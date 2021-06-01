import { Box, BoxProps } from "@chakra-ui/layout";
export const colours = {
  1: "brand.shadow",
  2: "brand.main",
  3: "brand.accent",
};
interface CardProps extends BoxProps {
  depth: 1 | 2 | 3;
  hoverColour?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  depth,
  hoverColour,
  ...rest
}) => {
  console.log("%c hover ", "background: purple; color: white", hoverColour);
  return (
    <Box
      h="100%"
      bg={colours[depth]}
      {...(hoverColour && {
        _hover: {
          bg: hoverColour,
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
