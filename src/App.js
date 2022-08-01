import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: ''
    };
  }



  render() {
    return (
      <>
        <h1>Data from an STAR WARS API</h1>
        <form>
          <button>Display Star Wars Data</button>
        </form>
      </>
     
    )
  }
}

export default App;
