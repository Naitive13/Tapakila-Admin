import {
  List,
  Datagrid,
  TextField,
  RichTextField,
  DeleteButton,
  Show,
  SimpleShowLayout,
} from "react-admin";

export const TicketList = () => {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="ticket_id" label="Ticket ID" />
        <TextField source="event_id" label="Event ID" />
        <RichTextField source="reservationStatus" label="Reservation Status" />
        <RichTextField source="ticketType" label="Ticket Type" />
      </Datagrid>
    </List>
  );
};

export const TicketShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" /> {/* Doit être id et non userId */}
        <TextField source="event_id" />
        <RichTextField source="reservationStatus" label="Reservation Status" />
        <RichTextField source="ticketType" label="Ticket Type" />
      </SimpleShowLayout>
    </Show>
  );
};
