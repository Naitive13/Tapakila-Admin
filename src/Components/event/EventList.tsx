import { List, Datagrid, TextField, RichTextField } from "react-admin";

export const EventList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="eventId" label="Event ID" />
        <TextField source="eventTitle" label="Event title" />
        <TextField source="eventType" label="Event Type" />
        <RichTextField source="eventDate" label="Event date" />
        <TextField source="eventStatus" label="Event Status" />
        <TextField source="eventPoster" label="Event Poster" />
      </Datagrid>
    </List>
  );
};
