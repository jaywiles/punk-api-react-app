import React, {Component} from 'react';
// import logo from '../media/thumbs-up.png';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      beers: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch ('https://api.punkapi.com/v2/beers')
    .then(response => response.json())
    // .then(parsedJSON => console.log(parsedJSON.map(beer => (
    //   {
    //     name: `${beer.name}`
    //   }
    // ))))
    .then(parsedJSON => parsedJSON.map(beer => ({
      name: `${beer.name}`,
      tagline: `${beer.tagline}`,
      abv: `${beer.abv}`,
      ibu: `${beer.ibu}`,
      // mash_temp_value_c: `${beer.method.mash_temp.temp.value}`
    })))
    .then(beers => this.setState({
      beers,
      isLoading: false
    }))
    .catch(error => console.log("parsing failed", error))
    }

  render() {
    const {isLoading, beers} = this.state;
    return (
      <div>
        <header>Good Beers</header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="beer-info">
            {
              // how to do if statement everything is wrapped in????
              !isLoading && beers.length > 0 ? beers.map(beer => {
                const {name, tagline, abv, ibu} = beer;
                return <div key={beer} title={name}>
                  <p>Name: {name} <button className="like-button">Like</button></p>
                  {/* <button><img src={logo} alt="like" className="img-responsive"></img></button> */}
                  <p>Tagline: {tagline}</p>
                  <p>ABV: {abv}</p>
                  <p>IBU: {ibu}</p>
                  <p>###</p>
                  </div>
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
