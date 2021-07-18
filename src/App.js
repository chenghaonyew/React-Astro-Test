import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Header from "./components/Header";
import SavedChannel from "./components/SavedChannel";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/Detail/:id">
          <Detail />
        </Route>
        <Route path="/savedChannel">
          <SavedChannel />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
