import { useState } from "react";
import { List, Datagrid, TextField, RichTextField, Show, SimpleShowLayout, useDelete, useRecordContext, Button, useRedirect, useNotify, Confirm } from "react-admin";

const DeleteButton = () => {
  const user = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();

  const [deleteOne, { isPending, error}] = useDelete(
      'user',
      { id: user && user.id },
      {
        onSuccess: () =>{
          notify(`user ${user && user.id} has been removed`, {type: "success"});
          redirect("/")
         },
        onError: (error) =>{
            notify(
              `user ${user && user.id} has not been removed : ${error && error.message}`, {type: "error"})
        }
      }
    );

  

  const handleClick = () => {
    
    deleteOne();
  };

  return (
        <Button label="Delete" onClick={handleClick} />
);
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
        <DeleteButton />
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
