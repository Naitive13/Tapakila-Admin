import { Menu } from "react-admin";

export const MyMenu = () => (
  <Menu>
    <Menu.ResourceItem name="User" />
    <Menu.ResourceItem name="Reservation" />
    <Menu.ResourceItem name="Ticket" />
    <Menu.ResourceItem name="Event" />
  </Menu>
);
