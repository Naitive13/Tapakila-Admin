import { Admin, Resource } from "react-admin";
import { authProvider } from "./Provider/AuthProvider.";
import { dataProvider } from "./Provider/DataProvider";
import {
  TicketCreate,
  TicketList,
  TicketShow,
} from "./Components/TicketComponents";
import { UserList } from "./Components/user/UserList";
import { UserShow } from "./Components/user/UserShow";
import { ReservationList } from "./Components/reservation/ReservationList";
import { ReservationShow } from "./Components/reservation/ReservationShow";
import { UserCreate } from "./Components/user/UserCreate";
import { EventList } from "./Components/event/EventList";
import { EventShow } from "./Components/event/EventShow";
import { EventCreate } from "./Components/event/EventCreate";
import { MyLayout } from "./screen/Layout";
import { theme } from "./screen/Theme";
import { EventEdit } from "./Components/event/eventPoster/EventEdit";

function App() {
  return (
    <>
      <Admin
        theme={theme}
        authProvider={authProvider}
        dataProvider={dataProvider}
        layout={MyLayout}
      >
        <Resource
          name="User"
          list={UserList}
          show={UserShow}
          create={UserCreate}
        ></Resource>
        <Resource
          name="Reservation"
          list={ReservationList}
          show={ReservationShow}
        ></Resource>
        <Resource
          name="Ticket"
          list={TicketList}
          show={TicketShow}
          create={TicketCreate}
          ></Resource>
        <Resource
          name="Event"
          list={EventList}
          show={EventShow}
          create={EventCreate}
          edit={EventEdit}
        ></Resource>
      </Admin>
    </>
  );
}

export default App;
