import { Admin, Resource } from "react-admin";
import authProvider from "./Provider/AuthProvider.";
import { UserDataProvider } from "./Provider/UserDataProvider";
import { UserList } from "./Components/UserComponents";

function App() {
  return (
    <>
      <Admin authProvider={authProvider} dataProvider={UserDataProvider}>
        <Resource name="User" list={UserList}></Resource>
      </Admin>
    </>
  );
}

export default App;
