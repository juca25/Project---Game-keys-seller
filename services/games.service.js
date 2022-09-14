const axios = require('axios');

class gamesService {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://www.cheapshark.com'
    });
  }

  getGameDeals() {
    return this.axios.get('/api/1.0/deals').then((res) => res.data);
  }

  //Gets info for a specific game
  getGameDeal(id) {
    return this.axios.get(`/api/1.0/games?id=${id}`).then((res) => res.data);
  }

  //Get a list of games that contain a given title or match
  getDealList(title) {
    return this.axios.get(`/api/1.0/games?title=${title}`).then((res) => res.data);
  }

  //Get a paged list of deals matching any number of criteria
  getStore(storeID) {
    return this.axios.get(`/api/1.0/deals?storeID=${storeID}`).then((res) => res.data);
  }

  getThumb(thumb) {
    return this.axios.get(`/api/1.0/thumb=${thumb}`).then((res) => res.data);
  }
  //Get redirect to original buy url
  getRedirect(dealID) {
    return this.axios.get(`/redirect?dealID=${dealID}`).then((res) => res.data);
  }





}

module.exports = new gamesService();
