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

import { useState } from "react";
import { Button, useNotify, useRecordContext, useRedirect } from "react-admin";
import { TicketDataProvider } from "../Provider/TicketDataProvider";

export const TickerDeleteButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = async () => {
    if (!record?.id) {
      notify("No user selected", { type: "warning" });
      return;
    }

    if (window.confirm(`Are you sure you want to delete ticket ${record.id}?`)) {
      setIsDeleting(true);
      setError(null);

      try {
        // Directly call userDataProvider.delete
        await TicketDataProvider.delete("ticket", { id: record.id });
        notify(`ticket ${record.id} deleted successfully`, { type: "success" });
        redirect("/ticket"); // Redirect to user list after deletion
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Deletion failed"));
        notify(`Delete failed: ${error.message}`, { type: "error" });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleClick}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export const TicketList = () => {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>
        <TextField source="ticket_id" label="Ticket ID" />
        <TextField source="event_id" label="Event ID" />
        <RichTextField source="reservationStatus" label="Reservation Status" />
        <RichTextField source="ticketType" label="Ticket Type" />
        <TickerDeleteButton />
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
        <TextInput source="event_id" placeholder="Paste event id here" />
        <SelectInput source="ticketType" choices={ticketTypes} />
      </SimpleForm>
    </Create>
  );
};
