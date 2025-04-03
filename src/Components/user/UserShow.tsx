import { RichTextField, Show, SimpleShowLayout, TextField, useDelete, useRecordContext } from "react-admin";
import { UserDeleteButton } from "./DeleteButton";

export const UserShow = () => {
    return (
      <Show>
        <SimpleShowLayout>
          <TextField source="id" /> {/* Doit être id et non userId */}
          <TextField source="userName" />
          <TextField source="userEmail" />
          <RichTextField source="type" label="type" />
          <RichTextField source="creationDate" label="creation date" />
        </SimpleShowLayout>
        <UserDeleteButton/>
      </Show>
    );
  };
  