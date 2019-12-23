import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


let SearchResults = function({appState, handleAppState}){
    const [results, setResults] = useState(null);

    
    useEffect(()=>{
        async function getResults(q){
            handleAppState({...appState, loading: true});
            let res = await axios.get(`/query/${q}`);
            
            setResults( res.data || [] );
            

            handleAppState({...appState, loading: false});
        }
        if(appState.query ){
            getResults(appState.query);
            
        }
    }, [appState.query]);

    

    return (
        <div className={`search-results ${appState.active ? "active" : ""}`} >

            {
                results ?
                    <p className="time-taken" >{results.count} results, {results.time} seconds</p>
                : "" 
            }
 
            <ul>
                {
                    results ? 
                        
                        results.count ?

                        results.results.map(r=> 
                            
                            <li key={r.id}> 
                                <Link to={`/page/${r.id}`} >{r.title}</Link> 
                                <p>
                                    { r.content }
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
                    :

                    ""

                }
            </ul>
        </div>
    );
}

export default SearchResults;