
import {Show, SimpleShowLayout, TextField } from "react-admin";
import { ToggleUserTypeButton } from "./ToggleUserTypeButton";


export const UserShow = () => {
    return (
      <Show>
        <SimpleShowLayout>
          <TextField source="id" /> {/* Doit être id et non userId */}
          <TextField source="userName" />
          <TextField source="userEmail" />
          <TextField source="type" label="type" />
          <ToggleUserTypeButton/>
        </SimpleShowLayout>
      </Show>
    );
  };
  