import { List, Datagrid, TextField, RichTextField} from "react-admin";
import { DeleteButton } from "./DeleteButton";

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
  
