import { List, Datagrid, TextField, RichTextField, Show, SimpleShowLayout, useDelete, useRecordContext } from "react-admin";

const DeleteButton = () => {
  const user = useRecordContext();
  const [deleteOne, { isPending, error }] = useDelete(
      'user',
      { id: user.id, previousData: user }
  );
  const handleClick = () => {
      deleteOne();
  }
  if (error) { return <p>ERROR</p>; }
  return <button disabled={isPending} onClick={handleClick}>Delete</button>;
};

export const UserList = () => {
  return (
    <List>
      <Datagrid>
        {/* <TextField source="userId" /> */}
        <TextField source="userName" />
        <TextField source="email" />
        <RichTextField source="type" label="type" />
        <RichTextField source="creationDate" label="creation date" />
        <DeleteButton/>
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
