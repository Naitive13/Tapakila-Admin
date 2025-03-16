import { Admin, Resource } from "react-admin";
import authProvider from "./Provider/AuthProvider.";

function App() {
  return (
    <>
      <Admin authProvider={authProvider}>
        <Resource name="post"></Resource>
      </Admin>
    </>
  );
}

export default App;
