import { RichTextField, Show, SimpleShowLayout, TextField, useDelete, useRecordContext } from "react-admin";
import { UserDeleteButton } from "./DeleteButton";

const DeleteButton = () => {
  const user = useRecordContext();
  const [deleteOne, { isPending, error }] = useDelete();
  const handleClick = () => {
    console.log(user?.id);
    
      deleteOne(
          'user',
          { id: user && user.id , previousData: user }
      );
  }
  if (error) { return <p>ERROR</p>; }
  return <button disabled={isPending} onClick={handleClick}>Delete</button>;
};

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
        <DeleteButton/>
      </Show>
    );
  };
  