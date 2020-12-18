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
    Cloths: [],
    current: []
  };

  componentDidMount() {
    fetch("/data.json")
      .then(res => res.json())
      .then(Cloths => this.setState({ Cloths }));
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
    const { Cloths, current } = this.state;

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
                  {JSON.stringify(this.state.Cloths, null, 2)}
                </pre>
              </div> */}
              <div className="col-6">
                <Route
                  path={["/:ClothID", "/"]}
                  render={({ match }) => (
                    <LeftSideBar
                      match={match}
                      Cloths={Cloths}
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
                {this.state.Cloths.length > 0 && (
                  <Route
                    path="/:ClothID"
                    render={({ match }) => (
                      <Cloth
                        cloth={this.state.Cloths.find(
                          cloth => cloth.ClothCost === match.params.ClothID
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

const Cloth = ({ cloth }) => {
  const { Cloth: Cloth, ClothCost, Brand } = cloth;
  return (
    <div className="Cloth">
      <h1>{Cloth}</h1>
      <p>
        The Cloth is {Cloth} that has a price of <code>{ClothCost}</code>, Its
        brand is {Brand}.
      </p>
    </div>
  );
};

const LeftSideBar = ({ Cloths, match }) => {
  return (
    <div className="list-group mt-2">
      {Cloths.map((cloth, key) => (
        <Link
          to={cloth.ClothCost}
          key={key}
          className={
            "list-group-item list-group-item-action" +
            (match.params.ClothID === cloth.ClothCost ? " active" : "")
          }
        >
          {cloth.Cloth}
        </Link>
      ))}
    </div>
  );
};
