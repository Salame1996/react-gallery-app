import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './../config.js';

// result components
import NotFound from './gallery/NotFound';
import Photo from './gallery/Photo';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 16,
      photos: [],
      loading: true,
    };
  }

  getPhotos = searchTerm => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&per_page=${
          this.state.perPage
        }&tags=${searchTerm}&format=json&nojsoncallback=1`
      )
      .then(response => {
        var photoData = response.data.photos.photo;
        this.setState({
          photos: photoData.map(photo => {
            var farmId = photo.farm;
            var serverId = photo.server;
            var id = photo.id;
            var secret = photo.secret;

            return {
              id: id,
              url: `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`
            };
          }),
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  componentDidMount() {
    this.getPhotos(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.getPhotos(this.props.query);
    }
  }

  render() {
    const { photos, loading } = this.state;
    return (
      <div className="photo-container">
        <h2>{this.props.query}</h2>
        <ul>
          {loading ? <p>Loading...</p> : photos.length > 0 ? <Photo photos={photos} /> : <NotFound />}
        </ul>
      </div>
    );
  }
}

export default Results;
