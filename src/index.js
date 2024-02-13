import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hqS8g05ZHcCMorrOK1oGyTpHCtvYrHyZdj6nwMqTquFs62KJcer5ugjk9Rju168f";

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");

  try {
    // Ukryj select i wyświetl loader podczas pobierania listy ras
    breedSelect.style.display = "none"; // <-- Zmiana: Dodane wyłączenie selecta
    loader.style.display = "block";

    // Pobierz kolekcję ras kota
    const breeds = await fetchBreeds();

    // Sprawdź, czy lista ras jest pusta
    if (breeds.length === 0) {
      // Jeśli lista jest pusta, wyświetl komunikat o błędzie
      error.textContent = "No cat breeds found. Please try reloading the page.";
      error.style.display = "block";
      loader.style.display = "none"; // Ukryj loader
      return; // Wyjdź z funkcji, aby zapobiec dalszemu wykonywaniu
    }

    // Wypełnij select opcjami ras kota
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Wyświetl select i ukryj loader po zakończeniu pobierania listy ras
    breedSelect.style.display = "block"; // <-- Zmiana: Dodane włączenie selecta
    loader.style.display = "none";
    
    // Obsługa zmiany wybranej opcji w select
    breedSelect.addEventListener("change", async event => {
      const breedId = event.target.value;
      loader.style.display = "block";
      error.style.display = "none";
      catInfo.innerHTML = ""; // Wyczyść zawartość bloku z informacjami o kocie
      catInfo.style.display = "none"; // Ukryj div.cat-info podczas pobierania informacji o kocie
      
      try {
        // Pobierz informacje o kocie na podstawie wybranej rasy
        const catData = await fetchCatByBreed(breedId);
        
        // Wyświetl informacje o kocie
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
        
        // Wyświetl div.cat-info po pomyślnym pobraniu informacji o kocie
        catInfo.style.display = "block";
      } catch (error) {
        console.error("Błąd podczas pobierania informacji o kocie:", error);
        error.style.display = "block";
      } finally {
        loader.style.display = "none"; // Ukryj loader po zakończeniu żądania
      }
    });
  } catch (error) {
    console.error("Błąd podczas pobierania ras kota:", error);
    error.style.display = "block";
  }
});