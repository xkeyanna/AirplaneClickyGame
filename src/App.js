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
    clickedAirplanes: [],
    score: 0,
    highscore: 0
  };




  // when you click on a card... the airplane is taken out of the array
  imageClick = event => {
    const currentAirplanes = event.target.alt;
    console.log(event.target.val + " Event value");
    console.log("current airplanes:" + currentAirplanes);
    console.log("clicked airplanes:" + this.state.clickedAirplanes)
    const AirplanesAlreadyClicked = this.state.clickedAirplanes.indexOf(currentAirplanes) > -1;

    console.log("clicked:" + this.state.clickedAirplanes);
    console.log(currentAirplanes);
    console.log(event.target);
    // if you click on an airplane that has already been selected, the game is reset and cards reordered
    if (AirplanesAlreadyClicked) {
      this.setState({
        airplanes: this.state.airplanes.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedAirplanes: [],
        score: 0
      });
      alert("You lose. Play again?");
      // if you click on an available airplane, your score is increased and cards reordered
    } else {
      this.setState({
        airplanes: this.state.airplanes.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        clickedAirplanes: this.state.clickedAirplanes.concat(
          currentAirplanes
        ),
        score: this.state.score + 1
      },
        //if you get all 12 airplanes correct you get a congrats message and the game resets
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              airplanes: this.state.airplanes.sort(function (a, b) {
                return 0.5 - Math.random();
              }),
              clickedAirplanes: [],
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
