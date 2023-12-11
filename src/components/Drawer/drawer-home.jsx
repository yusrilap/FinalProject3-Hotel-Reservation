import { Drawer } from "react-native-paper";
import React from "react";

export default function DrawerHome() {
  return (
    <Drawer.Section>
      <Drawer.Item label="Home" />
      <Drawer.Item label="Profile" />
      <Drawer.Item label="Settings" />
    </Drawer.Section>
  );
}
