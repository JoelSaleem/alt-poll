import { Box } from "@chakra-ui/layout";

interface CardProps {
  depth: 1 | 2;
}

export const Card: React.FC<CardProps> = ({ children, depth }) => {
  const colours = {
    1: "brand.main",
    2: "brand.accent",
  };
  return (
    <Box h="100%" bg={colours[depth]} borderRadius={10}>
      {children}
    </Box>
  );
};
