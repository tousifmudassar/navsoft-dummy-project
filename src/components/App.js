import React, { Component } from "react";
import Header from "./Header";
import "../styles/App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Buttons from "./Buttons";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       current: 0
//     };
//   }

//   handleDown = e => {
//     e.preventDefault();
//     this.setState({
//       current: this.state.current - 1
//     });
//   };
//   handleUp = e => {
//     e.preventDefault();
//     this.setState({
//       current: this.state.current + 1
//     });
//   };

//   render() {
//     return (
//       <div className="App">
//         <div className="container">
//           <div className="row">
//             <div className="col-12 text-center">
//               <h1>Current Number:{this.state.current}</h1>
//               <Buttons handleUp={this.handleUp} handleDown={this.handleDown} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

class App extends Component {
  state = {
    Countries: [],
    current: []
  };

  componentDidMount() {
    fetch("/data.json")
      .then(res => res.json())
      .then(Countries => this.setState({ Countries }));
  }
  handleDown = e => {
    e.preventDefault();
    this.setState({
      current: this.state.current - 1
    });
  };
  handleUp = e => {
    e.preventDefault();
    this.setState({
      current: this.state.current + 1
    });
  };
  render() {
    const { Countries, current } = this.state;

    return (
      <Router>
        <div className="App">
          <Header dark={true}>
            <Link to="/" className="navbar-brand">
              BuyCloth.com
            </Link>
          </Header>
          <div className="container">
            <div className="row">
              {/* <div className="col-12">
                <pre className="border rounded bg-light p-3 mt-3">
                  {JSON.stringify(this.state.Countries, null, 2)}
                </pre>
              </div> */}
              <div className="col-6">
                <Route
                  path={["/:CountryID", "/"]}
                  render={({ match }) => (
                    <LeftSideBar
                      match={match}
                      Countries={Countries}
                      current={current}
                    />
                  )}
                />
                <div className="col-12">
                  <span className="text-center">Add to Cart</span>
                  <Buttons
                    handleUp={this.handleUp}
                    handleDown={this.handleDown}
                  />
                </div>
              </div>
              <div className="col-6">
                <Route path="/" exact={true}>
                  <h1>Welcome to BuyCloth.com</h1>
                  <p>Click on the Left Items to see more details</p>
                </Route>
                {this.state.Countries.length > 0 && (
                  <Route
                    path="/:CountryID"
                    render={({ match }) => (
                      <Country
                        country={this.state.Countries.find(
                          country =>
                            country.CountryCode === match.params.CountryID
                        )}
                      />
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

const Country = ({ country }) => {
  const { Country: CountryName, CountryCode, Capital } = country;
  return (
    <div className="Country">
      <h1>{CountryName}</h1>
      <p>
        The Cloth is {CountryName} that has a price of{" "}
        <code>{CountryCode}</code>, Its brand is {Capital}.
      </p>
    </div>
  );
};

const LeftSideBar = ({ Countries, match }) => {
  return (
    <div className="list-group mt-2">
      {Countries.map((country, key) => (
        <Link
          to={country.CountryCode}
          key={key}
          className={
            "list-group-item list-group-item-action" +
            (match.params.CountryID === country.CountryCode ? " active" : "")
          }
        >
          {country.Country}
        </Link>
      ))}
    </div>
  );
};
