import React from 'react';
import {HashRouter as Router, Route, Link} from "react-router-dom";

//import components
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Review from '../Review/Review';
import Home from '../Home/Home'

//import styling
import './App.css';

function App() {

  return (
    <Router>
      <div className='App'>
        <div>
            <header className='App-header'>
                <h1 className='App-title'>Feedback!</h1>
                <h4>Don't forget it!</h4>
            </header>
        </div>
        <Home />
      </div>

      {/* set routes for parts of form */}
      <Route path='/feeling' exact>
        <Feeling />
      </Route>
      <Route path='/understanding' exact>
        <Understanding />
      </Route>
      <Route path='/support' exact>
        <Support />
      </Route>
      <Route path='/comments' exact>
        <Comments />
      </Route>
      <Route path='/review' exact>
        <Review />
      </Route>
      <Route path='/home' exact>
        <Home />
      </Route>

    </Router>
  );
}

export default App;
