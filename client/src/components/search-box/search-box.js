import React, { useEffect } from 'react';
import search_ico from '../../search.svg';



let SearchBox = function({appState, handleAppState}){
    
    let _query;

    let handleSubmit = (e)=>{
        e.preventDefault();
        handleAppState({...appState, active: true, query: _query.value});
    }


    useEffect(()=>{
        
        _query.value = appState.query;

    }, []);

    return (
        <div>
            <div className="logo-main">
                <span>S</span>
                <span>a</span>
                <span>e</span>
                <span>e</span>
                <span>n</span>
            </div>
            <form onSubmit={ handleSubmit }>
                <div className={`searchbox-main ${appState.active ? "active" : ""} ${appState.loading ? "loading" : ""}`} >
                    <input tabIndex="1" autoFocus ref={(q) => _query = q  } type="text" className="search-text" placeholder={`search, please...`} />
                    
                    <button type="submit" className="search-ico" >
                        <img src={search_ico} alt=""/>
                    </button>


                </div>

                <div className="button-main">
                    <button type="submit">
                        go, saeen
                    </button>
                    
                    <button type="submit">
                        no lucky ;_;
                    </button>

                </div>
            </form>

        </div>
    );

}





export default SearchBox;