import React from 'react';
import {HashRouter as Router, Route, Redirect} from "react-router-dom";
import { useCookies } from 'react-cookie';

//child components
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Review from '../Review/Review';
import Submitted from '../Submitted/Submitted';
import UserBar from '../UserBar/UserBar'
import EditRaw from '../EditRaw/EditRaw';
import AuthModal from '../AuthModal/AuthModal';


//styling
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
      <Route exact path='/feeling'>
          {userEmail && authToken ? 
            <Feeling /> 
            :    
            <Redirect to="/" />}
      </Route>

      <Route exact path='/understanding'>
          {userEmail && authToken ? 
            <Understanding /> 
            :    
            <Redirect to="/" />}
      </Route>

      <Route exact path='/support'>
          {userEmail && authToken ? 
            <Support /> 
            :    
            <Redirect to="/" />}
      </Route>

      <Route exact path='/comments'>
          {userEmail && authToken ? 
            <Comments /> 
            :    
            <Redirect to="/" />}
      </Route>

      <Route exact path='/review'>
          {userEmail && authToken ? 
            <Review /> 
            :    
            <Redirect to="/" />}
      </Route>

      <Route exact path='/submitted'>
          {userEmail && authToken ? 
            <Submitted /> 
            :    
            <Redirect to="/" />}
      </Route>
      <Route exact path='/edit'>
          {userEmail && authToken ? 
            <EditRaw /> 
            :    
            <Redirect to="/" />}
      </Route>

      {/* routes for login & auth */}
      <Route path='/entersite' exact>
        <AuthModal />
      </Route>

    </Router>
  );
  
}

export default App;
