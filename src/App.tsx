import { Admin, Resource } from "react-admin";
import { authProvider } from "./Provider/AuthProvider.";
import { dataProvider } from "./Provider/DataProvider";
import {
  ReservationList,
  ReservationShow,
} from "./Components/ReservationComponents";
import { TicketList, TicketShow } from "./Components/TicketComponents";
import { UserList } from "./Components/user/UserList";
import { UserShow } from "./Components/user/UserShow";
import { UserCreate } from "./Components/user/UserCreate";

function App() {
  return (
    <>
      <Admin authProvider={authProvider} dataProvider={dataProvider}>
        <Resource name="User" list={UserList} show={UserShow} create={UserCreate}></Resource>
        <Resource
          name="Reservation"
          list={ReservationList}
          show={ReservationShow}
        ></Resource>
        <Resource name="Ticket" list={TicketList} show={TicketShow}></Resource>
      </Admin>
    </>
  );
}

export default App;
