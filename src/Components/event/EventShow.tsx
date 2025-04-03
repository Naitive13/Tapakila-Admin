import { Button } from "@mui/material";
import  DownloadIcon from "@mui/icons-material/Download"
import { Show, SimpleShowLayout, TextField, RichTextField, useRecordContext } from "react-admin";

const DownloadButton = () => {
  const record = useRecordContext();
  if (!record || !record.eventPoster) return null;

  return (
      <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          component="a"
          href={record.eventPoster}
          download={record.title + ".jpg"}
          rel="noopener noreferrer"
      >
          Download Poster
      </Button>
  );
};
export const EventShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="eventId" label="Event ID" />
        <TextField source="eventTitle" label="Event title" />
        <TextField source="eventType" label="Event Type" />
        <RichTextField source="eventDate" label="Event date"/>
        <TextField source="eventStatus" label="Event Status" />
        <DownloadButton/>
      </SimpleShowLayout>
    </Show>
  );
};
