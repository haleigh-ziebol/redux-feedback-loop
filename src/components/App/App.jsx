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
import AuthModal from '../AuthModal/AuthModal';


//import styling
import './App.css';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

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
      <Route path='/feeling' exact element ={
        cookies ? (
            <Feeling />
          ): (
            <Navigate replace to={'/'} />
          )
        }
      />

      <Route path='/understanding' exact element ={
        cookies ? (
            <Understanding />
          ): (
            <Navigate replace to={'/'} />
          )
        }
      />

      <Route path='/support' exact element ={
        cookies ? (
            <Support />
          ): (
            <Navigate replace to={'/'} />
          )
        }
      />
      <Route path='/comments' exact element ={
        cookies ? (
            <Comments />
          ): (
            <Navigate replace to={'/'} />
          )
        }
      />
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
        <AuthModal />
      </Route>

    </Router>
  );
  
}

export default App;
