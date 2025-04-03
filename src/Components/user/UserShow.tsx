import { RichTextField, Show, SimpleShowLayout, TextField } from "react-admin";

export const UserShow = () => {
    return (
      <Show>
        <SimpleShowLayout>
          <TextField source="id" /> {/* Doit être id et non userId */}
          <TextField source="userName" />
          <TextField source="email" />
          <RichTextField source="type" label="type" />
          <RichTextField source="creationDate" label="creation date" />
        </SimpleShowLayout>
      </Show>
    );
  };
  