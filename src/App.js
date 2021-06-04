import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import './index.css';
import BooksComponent from './components/BooksComponent';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={BooksComponent} />
        </Switch>
      </Router >
    </div>
  );
}

export default App;
