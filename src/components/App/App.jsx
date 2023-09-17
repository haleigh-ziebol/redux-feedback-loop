import React, {useState} from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import { useCookies } from 'react-cookie';

//import components
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Review from '../Review/Review';
import Submitted from '../Submitted/Submitted';
import UserBar from '../UserBar/UserBar'
import EditRaw from '../EditRaw/EditRaw';
import LoginModal from '../AuthModal/AuthModal';


//import styling
import './App.css';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Feedback!</h1>
        </header>
        <div>
          <UserBar />
        </div>
      </div>

      {/* routes for feedback */}
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

      {/* routes for login & auth */}
      <Route path='/entersite' exact>
        <LoginModal />
      </Route>

    </Router>
  );
  
}

export default App;
