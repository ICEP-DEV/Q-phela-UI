import React, { Component } from 'react';
import Geolocated from 'react-geolocated';

class DangerZoneAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dangerZone: { lat: 40.7128, lon: -74.0060 }, // Default coordinates for New York City
      customLat: '',
      customLon: '',
    };
  }

  handleLatitudeChange = (e) => {
    this.setState({ customLat: e.target.value });
  };

  handleLongitudeChange = (e) => {
    this.setState({ customLon: e.target.value });
  };

  setCustomCoordinates = () => {
    const customLat = parseFloat(this.state.customLat);
    const customLon = parseFloat(this.state.customLon);

    if (!isNaN(customLat) && !isNaN(customLon)) {
      this.setState({
        dangerZone: { lat: customLat, lon: customLon },
        customLat: '',
        customLon: '',
      });
    }
  };

  render() {
    const { dangerZone, customLat, customLon } = this.state;

    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
      // Calculate the distance between the current location and the danger zone.
      const distance = this.getDistance(
        this.props.coords.latitude,
        this.props.coords.longitude,
        dangerZone.lat,
        dangerZone.lon
      );

      // You can adjust this threshold as needed.
      const dangerThreshold = 50; // Example distance in kilometers

      if (distance <= dangerThreshold) {
        return (
          <div className="danger-alert">
            <p>You are in a danger zone!</p>
          </div>
        );
      }
    }

    return (
      <div className="custom-location">
        <p>Enter custom latitude and longitude:</p>
        <input
          type="number"
          placeholder="Latitude"
          value={customLat}
          onChange={this.handleLatitudeChange}
        />
        <input
          type="number"
          placeholder="Longitude"
          value={customLon}
          onChange={this.handleLongitudeChange}
        />
        <button onClick={this.setCustomCoordinates}>Set Custom Coordinates</button>
      </div>
    );
  }

  getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

export default DangerZoneAlert({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(DangerZoneAlert);
