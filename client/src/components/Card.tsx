import { Box } from "@chakra-ui/layout";

interface CardProps {
  depth: 1 | 2;
}

export const Card: React.FC<CardProps> = ({ children, depth }) => {
  const colours = {
    // 1: "brand.main",
    1: "brand.shadow",
    2: "brand.main",
  };
  return (
    <Box h="100%" bg={colours[depth]} borderRadius={10} boxShadow={"2xl"}>
      {children}
    </Box>
  );
};
