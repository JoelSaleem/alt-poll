import { Box, BoxProps } from "@chakra-ui/layout";

interface CardProps extends BoxProps {
  depth: 1 | 2 | 3;
}

export const Card: React.FC<CardProps> = ({ children, depth, ...rest }) => {
  const colours = {
    1: "brand.shadow",
    2: "brand.main",
    3: "brand.accent",
  };
  return (
    <Box
      h="100%"
      bg={colours[depth]}
      borderRadius={10}
      boxShadow={"2xl"}
      {...rest}
    >
      {children}
    </Box>
  );
};
