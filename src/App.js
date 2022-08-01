import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      starWarsChars: [],
      error: false,
      errorMessage: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log('submit event:',event);
      let starWarsCharacters = await axios.get(
        "https://swapi.dev/api/people/?pag=1"
      );
      console.log("star wars chars:", starWarsCharacters.data.results);
      this.setState({
        starWarsChars: starWarsCharacters.data.results,
      });
    } catch (error) {
      console.log("error", error);
      console.log("error message:", error.message);
      this.setState({
        error: true,
        errorMessage: `An error occurred: ${error.response.status}`,
      });
    }
  };

  submitCityHandler = async (event) => {
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_KEY}&q=${this.state.city}&format=json`;
    //url string
    let cityInfo = await axios.get(url);
    console.log("city info: ", cityInfo.data[0]);
  };

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
    });
  };
  // 13. show the url for an image in the browser build out
  //https://maps.locationiq.com/v3/staticmap?key=pk.9314aed33e5b0e10955bf1b4fc8570ef&center=41.9758872,-91.6704053&zoom=12

  render() {
    console.log("data to loop over?", this.state.starWarsChars);
    console.log("state from on change", this.state.city);

    let starWarsList = this.state.starWarsChars.map((characterName, index) => {
      return <li key={index}>{characterName.name}</li>;
    });
    return (
      <>
        <h1>Data from an STAR WARS API</h1>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Display Star Wars Data</button>
        </form>
        {/* WTF */}
        {
          this.state.error ? (
            <p>{this.state.errorMessage}</p>
          ) : (
            //render the error
            <ul> {starWarsList}</ul>
          )
          //render the star wars chars
        }

        <form onSubmit={this.submitCityHandler}>
          <label>
            Pick a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Get City Data</button>
        </form>
      </>
    );
  }
}

export default App;
