import React from 'react';
import SearchBox from './components/search-box/search-box';
import SearchResults from './components/search-results/search-results';

function Home({appState, handleAppState}){
  
    return (
        <div className="main-wrap">
            <SearchBox appState={appState} handleAppState={handleAppState}/>
            <SearchResults appState={appState} handleAppState={handleAppState}/>
        </div>
    );

}


export default Home;