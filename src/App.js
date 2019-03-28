import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import airplanes from "./airplanes.json";
import "./App.css";

// sets state to 0 or empty
class App extends Component {
  state = {
    airplanes,
    clickedAirplane: [],
    score: 0
  };

  // when you click on a card... the airplane is taken out of the array
  imageClick = event => {
    const currentAirplane = event.target.addEventListener;
    const AirplaneAlreadyClicked = this.state.clickedAirplane.indexOf(currentAirplane) > -1;

    // if you click on an airplane that has already been selected, the game is reset and cards reordered
    if (AirplaneAlreadyClicked) {
      this.setState({
        airplane: this.state.airplane.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedAirplane: [],
        score: 0
      });
      alert("You lose. Play again?");
      // if you click on an available airplane, your score is increased and cards reordered
    } else {
      this.setState({
        airplane: this.state.airplanes.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedAirplane: this.state.clickedAirplane.concat(
          currentAirplane
        ),
        score: this.state.score + 1
      },
        //if you get all 12 airplanes correct you get a congrats message and the game resets
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              airplanes: this.state.airplane.sort(function (a, b) {
                return 0.5 - Math.random();
              }),
              clickedAirplane: [],
              score: 0
            });
          }
        }
      );
    }
  };

  //the reorder of components to be rendered: navbar, jumbotron, friendcard, footer

  render() {
    return (
      <div>
        <Navbar score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.airplanes.map(airplanes => (
            <FriendCard
              imageClick={this.imageClick}
              id={airplanes.id}
              key={airplanes.id}
              image={airplanes.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
