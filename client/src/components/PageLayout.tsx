import { GridItem, Grid, Heading, Center, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { Card } from "./Card";

interface PageLayoutProps {
  title: string;
  userId?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  userId,
}) => {
  const router = useRouter();
  return (
    <Grid
      h="100%"
      templateRows="100px 1fr 5%"
      templateColumns="1fr 8fr 1fr"
      gap={4}
    >
      <GridItem colSpan={3}>
        <Card depth={1}>
          <Flex h={"100%"}>
            <Center p={2} h={"100%"}>
              <Button
                onClick={() => {
                  if (userId) {
                    router.push("https://alt-poll.dev/auth/logout");
                  } else {
                    router.push("https://alt-poll.dev/auth/google");
                  }
                }}
              >
                {userId ? "Logout" : "Login"}
              </Button>
            </Center>
            <Center h="100%" flex={1}>
              <Heading>{title}</Heading>
            </Center>
          </Flex>
        </Card>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Card depth={1}>{children}</Card>
      </GridItem>
    </Grid>
  );
};
