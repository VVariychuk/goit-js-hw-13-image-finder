import './styles.css';
import imageList from './templates/image-list.hbs'
import FetchApi from './js/fetchApi'
import LoadMore from './js/loadMoreBtn'

const refs = {
    form: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.searchBtn'),
}

const loadMore = new LoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
})

const fetchApi = new FetchApi();

refs.form.addEventListener('submit', onSearch)
loadMore.refs.button.addEventListener('click', fetchItems);

function onSearch(e) {
    e.preventDefault()

    fetchApi.query = e.currentTarget.elements.query.value
    loadMore.show()
    fetchApi.resetPage()
    resetGallery()
    fetchItems()
    
}

function fetchItems() {
    loadMore.disable()
    fetchApi.fetchImg()
        .then(hits => {
            if (hits.length < 12) {
                loadMore.hide()
                createMarkup(hits)
                 window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
            } else {
                createMarkup(hits)
                loadMore.enable()
                 window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
            }
        })
    }

function createMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', imageList(hits))
 }


function resetGallery() {
    refs.gallery.innerHTML = ''
}
 
