import axios from 'axios';
import React, { useState, useEffect } from 'react';


let SearchResults = function({appState, handleAppState}){
    const [results, setResults] = useState(null);

    async function getResults(q){
        handleAppState({...appState, loading: true});
        let res = await axios.get(`/query/${q}`);
        
        setResults( res.data || [] );
        handleAppState({...appState, loading: false});
    }

    useEffect(()=>{
        if(appState.query ){
            getResults(appState.query);
            


           
        }
    }, [appState.query]);

    

    return (
        <div className={`search-results ${appState.active ? "active" : ""}`} >

            <ul>
                {
                    results ? 
                    results.map(r=> 
                        <li key={r.id}> 
                            <a href={`/page/${r.id}`} >{r.title}</a> 
                            <p>
                                { r.content.substring(0, 140) + "..." }
                            </p>
                        </li> 
                    )
                    :

                    (
                        appState.loading ?
                        ""
                        :
                        <li>
                            <p>No results found</p>    
                        </li>

                    )
                }
            </ul>
        </div>
    );
}

export default SearchResults;