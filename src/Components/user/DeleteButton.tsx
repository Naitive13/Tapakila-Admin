import { Button, useDelete, useNotify, useRecordContext, useRedirect } from "react-admin";

export const DeleteButton = () => {
  const user = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();

  const [deleteOne] = useDelete(
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
