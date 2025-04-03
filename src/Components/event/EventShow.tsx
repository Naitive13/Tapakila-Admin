import { Show, SimpleShowLayout, TextField, RichTextField } from "react-admin";

export const EventShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="eventId" label="Event ID" />
        <TextField source="eventTitle" label="Event title" />
        <TextField source="eventType" label="Event Type" />
        <RichTextField source="eventDate" label="Event date" />
        <TextField source="eventStatus" label="Event Status" />
        <TextField source="eventPoster" label="Event Poster" />
      </SimpleShowLayout>
    </Show>
  );
};
