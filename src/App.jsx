import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import './index.css';
import BooksComponent from './components/BooksComponent/BooksComponent';
import CreateBookComponent from './components/CreateBookComponent/CreateBookComponent';
import BookDetailsComponent from './components/BookDetailsComponent/BookDetailsComponent';


function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/book/new" component={CreateBookComponent} />
          <Route path="/book/:bookId" component={BookDetailsComponent} />
          <Route path="/" component={BooksComponent} />
        </Switch>
      </Router >
    </div>
  );
}

export default App;
