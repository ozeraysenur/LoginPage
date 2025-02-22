
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Success from "./components/Success";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
}

export default App;

