import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import CustomersPage from "./components/CustomersPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div className="m-10">
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/add-customer" component={AddCustomer} />
          <Route path="/" exact component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
