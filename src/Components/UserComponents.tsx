import { List, Datagrid, TextField, RichTextField, Show } from "react-admin";

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
      <Datagrid>
        {/* <TextField source="userId" /> */}
        <TextField source="userName" />
        <TextField source="email" />
        <RichTextField source="type" label="type" />
        <RichTextField source="creationDate" label="creation date" />
      </Datagrid>
    </Show>
  );
};
