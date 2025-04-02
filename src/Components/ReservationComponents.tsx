import {
  List,
  Datagrid,
  TextField,
  RichTextField,
  DeleteButton,
  Show,
  SimpleShowLayout,
} from "react-admin";

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

export const ReservationShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" /> {/* Doit être id et non userId */}
        <TextField source="ticketID" />
        <TextField source="userID" />
        <RichTextField source="reservationDate" label="reservation date" />
      </SimpleShowLayout>
    </Show>
  );
};
