import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";

//import components
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Review from '../Review/Review';
import Submitted from '../Submitted/Submitted';
import NavBar from '../NavBar/NavBar';
import EditRaw from '../EditRaw/EditRaw';


//import styling
import './App.css';

function App() {

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Feedback!</h1>
        </header>
        <div>
          <NavBar />
        </div>
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
      <Route path='/submitted' exact>
        <Submitted />
      </Route>
      <Route path='/edit' exact>
        <EditRaw />
      </Route>

    </Router>
  );
  
}

export default App;
