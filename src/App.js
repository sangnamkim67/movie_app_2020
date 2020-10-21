import { HashRouter, Route } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import Search from "./routes/Search";
import React, { Component } from "react";
import Navigation from "./Components/Navigation";
import MovieInfo from "./routes/MovieInfo";
class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Navigation />
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/search" exact={true} component={Search} />
                    <Route
                        path="/movieinfo/:name"
                        exact={true}
                        component={MovieInfo}
                    />
                    <Route path="/about" component={About} />
                </HashRouter>
            </div>
        );
    }
}

export default App;
