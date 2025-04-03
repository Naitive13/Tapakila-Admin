import {
  List,
  Datagrid,
  TextField,
  RichTextField,
  useRecordContext,
} from "react-admin";
import { EventDeleteButton } from "./EventDeleteButton";
import { EventPosterField } from "./eventPoster/EventPosterField";

export const EventList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="eventId" label="Event ID" />
        <TextField source="eventTitle" label="Event title" />
        <TextField source="eventType" label="Event Type" />
        <RichTextField source="eventDate" label="Event date" />
        <TextField source="eventStatus" label="Event Status" />
        <EventPosterField />

        <EventDeleteButton />
      </Datagrid>
    </List>
  );
};
