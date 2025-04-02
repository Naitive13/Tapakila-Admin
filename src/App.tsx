import { Admin, Resource } from "react-admin";
import { authProvider } from "./Provider/AuthProvider.";
import { dataProvider } from "./Provider/DataProvider";
import { UserList, UserShow } from "./Components/UserComponents";
import { ReservationList } from "./Components/ReservationComponents";

function App() {
  return (
    <>
      <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="User" list={UserList} show={UserShow}></Resource>
        <Resource name="Reservation" list={ReservationList}></Resource>
      </Admin>
    </>
  );
}

export default App;
