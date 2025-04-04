import {
  List,
  Datagrid,
  TextField,
  RichTextField,
  DeleteButton,
  Show,
  SimpleShowLayout,
  Create,
  DateTimeInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const ticketTypes = [
  { id: "regular", name: "regular" },
  { id: "vip", name: "vip" },
  { id: "gold", name: "Gold" },
  { id: "bronze", name: "bronze" },
  { id: "silver", name: "Silver" },
];

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

export const TicketCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="event_id" placeholder="Paste event id here"/>
        <SelectInput source="ticketType" choices={ticketTypes} />
      </SimpleForm>
    </Create>
  );
};
