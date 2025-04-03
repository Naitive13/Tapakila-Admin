import { useState } from "react";
import { useRecordContext, useNotify, useRedirect, Button } from "react-admin";
import { EventDataProvider } from "../../Provider/EventDataProvider";

export const EventDeleteButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = async () => {
    if (!record?.id) {
      notify("No user selected", { type: "warning" });
      return;
    }

    if (window.confirm(`Are you sure you want to delete user ${record.id}?`)) {
      setIsDeleting(true);
      setError(null);

      try {
        // Directly call userDataProvider.delete
        await EventDataProvider.delete("user", { id: record.id });
        notify(`Event ${record.id} deleted successfully`, { type: "success" });
        redirect("/events"); 
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Deletion failed"));
        notify(`Delete failed: ${error.message}`, { type: "error" });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleClick}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};
