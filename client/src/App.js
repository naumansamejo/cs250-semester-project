import React, {useState, useEffect} from 'react';
import './App.css';
import Home from './home';
import axios from 'axios';


import {
	BrowserRouter,
	Switch,
	Route,
  useParams,
  Link
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
    <BrowserRouter>
      <div className={`search-engine ${appState.active ? "active" : ""}`} >

        <Switch>
          
          <Route path="/" exact>
            <Home appState={appState} handleAppState={handleAppState}/>
          </Route>
          
          <Route path="/page/:id" >
            <Page />
          </Route>

        </Switch>

        
      </div>
    </BrowserRouter>
    
  );
}






function Page(){

  const [page, setPage] = useState(null);
  const pageID = useParams().id;

  useEffect(()=>{
    if(!page){
      getPage(pageID);
    }
  });


  // Functions for fetching the page data
  async function fetchPage(q){
    let res = await axios.get(`/files/${q}.json`);
    return res.data;
  }
  function getPage(pageID){
    let data = fetchPage(pageID);
    data.then(d=> setPage(d) );
  }
  

  return (
    <div className="page-main" >
      
      <div className="link-back">
        <Link to="/" > &lt; go back</Link>
      </div>


    { page == null ? "Loading..." :
    
      <div className="page-inner">
        <h1> {page.title} </h1>

        <p>
          {page.content}
        </p>
      </div>
    
    }
    </div>
  );

}

export default App;
