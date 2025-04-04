import { Button, useRecordContext, useNotify, useRefresh } from 'react-admin';
import { userDataProvider } from "../../Provider/UserDataProvider";

// Define the UserType enum locally
enum UserType {
  STANDARD = "standard",
  ADMIN = "admin"
}

export const ToggleUserTypeButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const handleClick = async () => {
    try {
      const newType = record.type === UserType.STANDARD 
        ? UserType.ADMIN 
        : UserType.STANDARD;
      
      await userDataProvider.update('user', {
        id: record.id,
        data: { type: newType },
        previousData: record
      });

      notify(`User type changed to ${newType}`, { type: 'success' });
      refresh();
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Failed to update user type', { 
        type: 'error' 
      });
    }
  };

  return (
    <Button
      label={record.type === UserType.STANDARD ? 'Make Admin' : 'Make Standard'}
      onClick={handleClick}
      color={record.type === UserType.STANDARD ? 'primary' : 'secondary'}
      variant="contained"
      sx={{
        margin: '10px 0',
        fontWeight: 'bold'
      }}
    />
  );
};