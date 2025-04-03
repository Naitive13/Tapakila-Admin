import {
  Create,
  DateInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const eventTypes = [
  { id: "CONCERT", name: "Concert" },
  { id: "SPORT", name: "Sport" },
  { id: "THEATER", name: "Theater" },
  { id: "CONFERENCE", name: "Conference" },
  { id: "FESTIVAL", name: "Festival" },
  { id: "WORKSHOP", name: "Workshop" },
  { id: "EXHIBITION", name: "Exhibition" },
  { id: "COMEDY", name: "Comedy" },
  { id: "MOVIE", name: "Movie" },
  { id: "OTHER", name: "Other" },
];

const eventStatuses = [
  { id: "UPCOMING", name: "Upcoming" },
  { id: "ONGOING", name: "Ongoing" },
  { id: "PAST", name: "Past" },
  { id: "CANCELLED", name: "Cancelled" },
];

export const EventCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="eventTitle" />
        <SelectInput source="eventType" choices={eventTypes} />
        <DateInput source="eventDate" />
        <SelectInput source="eventStatus" choices={eventStatuses} />
        <TextInput
          source="eventPoster"
          placeholder="Set here the image's URL for your event "
        />
      </SimpleForm>
    </Create>
  );
};

// // {
//     "eventTitle": "Concert de Rock",
//     "eventType": "CONCERT",
//     "eventDate": "2025-05-15T20:00:00",
//     "eventStatus": "UPCOMING",
//     "eventPoster": "https://example.com/poster.jpg"
// }
