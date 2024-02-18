import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hqS8g05ZHcCMorrOK1oGyTpHCtvYrHyZdj6nwMqTquFs62KJcer5ugjk9Rju168f";

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from "notiflix";

document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.querySelector(".loader");
  const errorDisplay = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");
  const breedSelect = document.querySelector("#single");

  try {
    loader.style.display = "block";

    const breeds = await fetchBreeds();

    if (breeds.length === 0) {
      Notiflix.Notify.failure('No cat breeds found. Please try reloading the page.');
      loader.style.display = "none";
      return;
    }
    
    const options = breeds.map(breed => ({ value: breed.id, text: breed.name }));
    options.unshift({ value: '', text: '- Select a breed -' });

    new SlimSelect({
      select: '#single',
      data: options,
    });

    loader.style.display = "none";
  } catch (error) {
    console.error("Error while fetching cat breeds:", error);
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  breedSelect.addEventListener("change", async event => {
    const breedId = event.target.value;
    loader.style.display = "block";
    errorDisplay.style.display = "none";
    catInfo.innerHTML = "";
    catInfo.style.display = "none";

    try {
      const catData = await fetchCatByBreed(breedId);
      
      if (!catData || catData.length === 0) {
        throw new Error("No cat data found.");
      }

      const catImg = document.createElement("img");
      catImg.src = catData[0].url;
      catInfo.appendChild(catImg);

      const catName = document.createElement("p");
      catName.innerHTML = `<strong>Name:</strong> ${catData[0].breeds[0].name}`;
      catInfo.appendChild(catName);

      const catDescription = document.createElement("p");
      catDescription.innerHTML = `<strong>Description:</strong> ${catData[0].breeds[0].description}`;
      catInfo.appendChild(catDescription);

      const catTemperament = document.createElement("p");
      catTemperament.innerHTML = `<strong>Temperament:</strong> ${catData[0].breeds[0].temperament}`;
      catInfo.appendChild(catTemperament);

      catInfo.style.display = "block";
    } catch (error) {
      console.error("Error while fetching cat information:", error);
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    } finally {
      loader.style.display = "none";
    }
  });
});