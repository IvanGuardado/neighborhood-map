import React, { Component } from 'react';
import * as VenuesAPI from './VenuesAPI'
import Sidebar from './Sidebar'
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      locations: [],
      filteredLocations: []
    }
  }

  componentDidMount() {
    VenuesAPI.getAll()
      .then(response => {
        this.setState({locations: response.venues})
        console.log(this.state.locations)
      })
      .catch((error) => {
        console.error(error)
      })    
  }

  onMenuClick = () => {
    const menu = document.getElementById('burger-icon')
    const sidebar = document.getElementById('sidebar')
    menu.classList.toggle("change")
    sidebar.classList.toggle("open")
  }

  // If clicked on a place of the sidebar list, find the correspondent marker on the mapContainer
  handleSidebarPlaceClick = (place) => {
    this.mapContainer.markerFinder(place)
    console.log(this.mapContainer)
  }

  // handleSidebarFilterChange
  sidebarFilter = (event) => {
    let filteredVenues
    if (event === "all") {
      filteredVenues = this.state.locations
    } else {
      filteredVenues = this.state.locations.filter( location => location.categories[0].id === event)
      console.log(filteredVenues)
    }
    this.setState({filteredLocations : filteredVenues})
    // Close any infoWindow open
    this.mapContainer.setState({showingInfoWindow: false})
   }
 
  render() {
    const {filteredLocations, locations} = this.state
    let places = (filteredLocations.length >= 1) ? filteredLocations : locations

    return (
      <div className="App">
        <header className="app-header">
          <div id="burger-icon" onClick={this.onMenuClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <h1 className="app-title">Explore Santiago</h1>
        </header>
        <main>
          <Sidebar places={places} onUpdateCategory={this.sidebarFilter} handleSidebarPlaceClick={this.handleSidebarPlaceClick}/>
          <div className="map-container">
            <MapContainer places={places} onRef={instance => this.mapContainer = instance} /> 
          </div>
        </main>
      </div>
    );
  }
}

export default App;
