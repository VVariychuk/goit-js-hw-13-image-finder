const API_KEY = '19836909-16e58b6603fc5616f8f6edf37';
const BASE_URL = 'https://pixabay.com/api';

export default class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImg() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response  => response.json())                 
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
    .catch(error => console.error(error));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}