import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { serviceImages } from './pixabay-api';

const elements = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  searchInput: document.querySelector('input[name="searchQuery"]'),
  searchButton: document.querySelector('button[type="submit"]'),
};

let loadedItems = 0;
let page = 1;
const itemsPerPage = 40;

const lightbox = new SimpleLightbox('.gallery a', {});
const observer = new IntersectionObserver(handlerLoadMore, {
  root: null,
  rootMargin: '300px',
  threshold: 0.3,
});

function handlerLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadData();
    }
  });
}

function onSearch() {
  elements.searchButton.disabled = !elements.searchInput.value.trim();
}

async function onSubmit(event) {
  event.preventDefault();

  loadedItems = 0;
  page = 1;
  elements.gallery.innerHTML = '';

  await loadData();
}

async function loadData() {
  const inputValue = elements.searchInput.value;

  try {
    const { hits, totalHits } = await serviceImages(
      inputValue,
      itemsPerPage,
      page
    );

    if (totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
      return;
    }

    if (totalHits > 0 && loadedItems === 0) {
      iziToast.success({
        title: 'Success',
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
    }

    renderGallery(hits);
    lightbox.refresh();
    loadedItems += hits.length;
    page += 1;

    const items = elements.gallery.querySelectorAll('.photo-card');
    const itemToObserve = items[items.length - 1];
    if (itemToObserve) {
      observer.observe(itemToObserve);
    }

    if (loadedItems >= totalHits) {
      observer.disconnect();
      iziToast.info({
        title: 'Info',
        message: 'You have viewed all available images.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topRight',
    });
  }
}

function renderGallery(cards) {
  const markup = cards
    .map(
      ({
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
        webformatURL,
      }) => {
        return `
        <a href="${largeImageURL}" class="card-link">
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="image" />
            <div class="info">
              <p class="info-item">
                <span><b>Likes</b></span>
                <span>${likes}</span>
              </p>
              <p class="info-item">
                <span><b>Views</b></span>
                <span>${views}</span>
              </p>
              <p class="info-item">
                <span><b>Comments</b></span>
                <span>${comments}</span>
              </p>
              <p class="info-item">
                <span><b>Downloads</b></span>
                <span>${downloads}</span>
              </p>
            </div>
          </div>
        </a>`;
      }
    )
    .join('');

  elements.gallery.insertAdjacentHTML('beforeend', markup);
}

elements.searchForm.addEventListener('submit', onSubmit, false);
elements.searchInput.addEventListener('input', onSearch, false);
