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
  getDealList(title) {
    return this.axios.get(`/api/1.0/games?title=${title}`).then((res) => res.data);
  }

  getGameDeal(id) {
    return this.axios.get(`/api/1.0/deals?id=${id}`).then((res) => res.data);
  }

}

module.exports = new gamesService();
