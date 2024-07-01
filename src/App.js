import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate
} from 'react-router-dom';

import Results from './components/Results';
import Search from './components/Search';
import Nav from './components/Nav';

function SearchWithHooks(props) {
  const navigate = useNavigate();
  return <Search {...props} navigate={navigate} />;
}

function ResultsWrapper({ defaultSearchTerm }) {
  const { query } = useParams();
  return <Results query={query || defaultSearchTerm} />;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultSearchTerm: 'Cat'
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <SearchWithHooks />
            <Nav />
            <Routes>
              <Route
                exact
                path="/"
                element={<ResultsWrapper defaultSearchTerm={this.state.defaultSearchTerm} />}
              />
              <Route
                path="/:query"
                element={<ResultsWrapper defaultSearchTerm={this.state.defaultSearchTerm} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
