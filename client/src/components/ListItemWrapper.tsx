import * as React from "react";
import { Card } from "./Card";

interface ListItemWrapperProps {
  onClick?: () => void;
}

export const ListItemWrapper: React.FC<ListItemWrapperProps> = ({
  children,
  onClick,
}) => {
  const interactionColourProps = {
    hoverColour: "brand.accent",
    activeColour: "brand.superAccent",
  };
  return (
    <Card
      depth={2}
      margin={2}
      maxH={24}
      padding={3}
      {...(onClick && interactionColourProps)}
      onClick={onClick}
      cursor={onClick ? "pointer" : "default"}
    >
      {children}
    </Card>
  );
};
