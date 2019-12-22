import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBox from './components/search-box/search-box';
import SearchResults from './components/search-results/search-results';


import {
	BrowserRouter,
	Switch,
	Route
} from "react-router-dom";

function App() {

  const [appState, setAppState] = useState({
    active: false, 
    query: "",
    results: 0
  });

  
  
  useEffect(function(){
    document.title = "DSA Search Engine";
  }, []);

  let handleAppState = function(obj){
    setAppState(obj);
  }

  return (
    <div className={`search-engine ${appState.active ? "active" : ""}`} >

      <div className="main-wrap">

        <SearchBox appState={appState} handleAppState={handleAppState}/>

        <SearchResults appState={appState} handleAppState={handleAppState}/>

      </div>

      
    </div>
  );
}

export default App;
