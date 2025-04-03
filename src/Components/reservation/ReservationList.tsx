import { List, Datagrid, TextField, RichTextField } from "react-admin";

export const ReservationList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="reservationID" label="reservation ID" />
        <TextField source="ticketID" label="ticket ID" />
        <TextField source="userID" label="user ID" />
        <RichTextField source="reservationDate" label="reservation date" />
      </Datagrid>
    </List>
  );
};
