import { GridItem, Grid, Heading, Center } from "@chakra-ui/react";
import { Card } from "./Card";

interface PageLayoutProps {
  title: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <Grid
      h="100%"
      templateRows="100px 1fr 5%"
      templateColumns="1fr 8fr 1fr"
      gap={4}
    >
      <GridItem colSpan={3}>
        <Card depth={1}>
          <Center h="100%">
            <Heading>{title}</Heading>
          </Center>
        </Card>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Card depth={1}>{children}</Card>
      </GridItem>
    </Grid>
  );
};
