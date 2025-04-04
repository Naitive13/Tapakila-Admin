import { List, Datagrid, TextField, RichTextField } from "react-admin";
import { ReservationDeleteButton } from "./ReservationDeleteButton";

export const ReservationList = () => {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="reservationID" label="reservation ID" />
        <TextField source="ticketID" label="ticket ID" />
        <TextField source="userID" label="user ID" />
        <RichTextField source="reservationDate" label="reservation date" />
        <ReservationDeleteButton />
      </Datagrid>
    </List>
  );
};
