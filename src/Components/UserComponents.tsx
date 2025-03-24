import { List, Datagrid, TextField, RichTextField, Show, SimpleShowLayout } from "react-admin";

export const UserList = () => {
  return (
    <List>
      <Datagrid>
        {/* <TextField source="userId" /> */}
        <TextField source="userName" />
        <TextField source="email" />
        <RichTextField source="type" label="type" />
        <RichTextField source="creationDate" label="creation date" />
      </Datagrid>
    </List>
  );
};

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
