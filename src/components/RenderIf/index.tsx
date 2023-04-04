import React from "react";
import { View } from "react-native";

type Props = { children: React.ReactNode; condition: boolean | undefined };

function RenderIf({ children, condition }: Props) {
  if (condition) return <View>{children}</View>;
  else return <></>;
}

export default RenderIf;
