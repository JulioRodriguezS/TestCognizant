/**
 * This file will hold the Main content that lives in the main body of the site
 * 
 */
/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
 "use strict";

/**I import this because the async and await does not works correcly */
import 'regenerator-runtime/runtime';
import React, { Fragment } from 'react';

class Home extends React.Component {

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
            this.setState({searching: true})
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof Home
    */
    render() {
        return (
            <Fragment>
                <header className="menu">
                    <div className="menu-container">
                        <div className="menu-holder">
                            <h1>ELC</h1>
                            <nav>
                                <a href="#" className="nav-item">HOLIDAY</a>
                                <a href="#" className="nav-item">WHAT'S NEW</a>
                                <a href="#" className="nav-item">PRODUCTS</a>
                                <a href="#" className="nav-item">BESTSELLERS</a>
                                <a href="#" className="nav-item">GOODBYES</a>
                                <a href="#" className="nav-item">STORES</a>
                                <a href="#" className="nav-item">INSPIRATION</a>

                                <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                    <i className="material-icons search">search</i>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                        <input type="text" onChange={(e) => this.onSearch(e)} />
                        <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                            <i className="material-icons close">close</i>
                        </a>
                    </div>
                </header>
                <section id="home">
                    <div className="content" >
                        {   
                            this.state.searching &&
                            this.state.ls.map(product=>{
                                return <div className="product">
                                    <div className="productTitle">
                                        <h4>{product.name}</h4>  
                                    </div>
                                    <div className="productDescription">
                                        <p src={`..${product.about}`}></p>
                                        <h5>{product.price}</h5>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </section>
            </Fragment>
        );
    }


}

// Export out the React Component
module.exports = Home;