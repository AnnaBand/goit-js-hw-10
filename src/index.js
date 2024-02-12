import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hqS8g05ZHcCMorrOK1oGyTpHCtvYrHyZdj6nwMqTquFs62KJcer5ugjk9Rju168f";

import { fetchBreeds } from "./cat-api.js";

import SlimSelect from "slim-select";
import Notiflix from "notiflix";

// DOM
const breedSelect = new SlimSelect(".breed-select");
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function renderBreeds(breeds) {
  select.innerHTML = '';
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    select.appendChild(option);
  });
}

// Cat Info
function renderCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="${cat.breeds[0].name}" />
    <p><strong>Name:</strong> ${cat.breeds[0].name}</p>
    <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
  `;
}

// Errors
function handleError(error) {
  error.style.display = 'block';
  loader.style.display = 'none';
  select.disabled = true;
}

// List
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetchBreeds();
    const breeds = response.data;
    renderBreeds(breeds);
    loader.style.display = 'none';
    error.style.display = 'none';
  } catch (error) {
    handleError(error);
  }
});

select.addEventListener('change', async (event) => {
  const breedId = event.target.value;
  loader.style.display = 'block';
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    const cat = response.data[0];
    renderCatInfo(cat);
    loader.style.display = 'none';
  } catch (error) {
    handleError(error);
  }
});