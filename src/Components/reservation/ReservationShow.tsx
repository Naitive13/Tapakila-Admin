import { Show, SimpleShowLayout, TextField, RichTextField } from "react-admin";

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
  