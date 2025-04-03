import { Show, SimpleShowLayout, TextField, RichTextField } from "react-admin";
import { EventPosterField } from "./eventPoster/EventPosterField";
import { EventPosterDownloadButton } from "./eventPoster/EventPosterDownloadButton";

export const EventShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="eventId" label="Event ID" />
        <TextField source="eventTitle" label="Event title" />
        <TextField source="eventType" label="Event Type" />
        <RichTextField source="eventDate" label="Event date" />
        <TextField source="eventStatus" label="Event Status" />
        <EventPosterField />
        <EventPosterDownloadButton />
      </SimpleShowLayout>
    </Show>
  );
};
