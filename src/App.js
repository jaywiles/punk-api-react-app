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
    .then(parsedJSON => parsedJSON.map(beer => ({
      name: `${beer.name}`,
      tagline: `${beer.tagline}`,
      abv: `${beer.abv}`,
      ibu: `${beer.ibu}`,
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
      <div className="whole-page">
        <header>Good Beers</header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="beer-info">
            {
              // how to do if statement everything is wrapped in????
              !isLoading && beers.length > 0 ? beers.map(beer => {
                const {name, tagline, abv, ibu} = beer;
                return <div key={beer} title={name}>
                  <p className="name-line">{name} <button onclick="likeClicked()" className="like-button">Like</button></p>
                  {/* <button><img src={logo} alt="like" className="img-responsive"></img></button> */}
                  <p className="tagline-line">Tagline: {tagline}</p>
                  <p className="abv-line">ABV: {abv}</p>
                  <p className="ibu-line">IBU: {ibu}</p>
                  <br></br>
                  </div>
              }) : null
            }
          </div>
        </div>
      </div>
    )
  }
}
{/* <input type="checkbox" name="like">Like</input> */}

export default App;
