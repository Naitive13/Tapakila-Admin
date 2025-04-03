import { Button, useDelete, useNotify, useRecordContext, useRedirect } from "react-admin";

export const UserDeleteButton = () => {
  const record = useRecordContext();
    const [deleteOne, { isPending, error }] = useDelete();
    const handleClick = () => {
        deleteOne(
            'user',
            { id: record.id , previousData: record }
        );
    }
    if (error) { return <p>ERROR</p>; }
    return <button disabled={isPending} onClick={handleClick}>Delete</button>;
};


