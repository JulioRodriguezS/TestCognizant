"use strict";

/**I import this because the async and await does not works correcly */
import 'regenerator-runtime/runtime';
import React, { Fragment } from 'react';

class Menu extends React.Component {
    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */ 
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            ls: [{}],
            searching: false,
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
        showSearchContainer(e) {
        
        e.preventDefault();

        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    async componentDidMount(){
        await fetch(`http://localhost:3035/`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(async (r) => {
            let tmp = await r.json()
            this.setState({ls:tmp})
        })
        .catch(e => {throw e});
    }
    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
     onSearch(e) {
        let productSearch = e.target.value; 

        let tmpArr = this.state.ls.filter((e)=>{
            if(e.name.includes(productSearch)) return e;
        });

        if(tmpArr.length > 0){
            this.setState({ls:tmpArr})
        }
    }

    render(){
        return(
            
        )
    }

}

module.exports = Menu;