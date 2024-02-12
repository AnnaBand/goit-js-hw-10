import axios from "axios";
import { fetchBreeds } from "./cat-api.js";

axios.defaults.headers.common["x-api-key"] = "live_hqS8g05ZHcCMorrOK1oGyTpHCtvYrHyZdj6nwMqTquFs62KJcer5ugjk9Rju168f";

function populateBreedsSelect(breeds) {
  const select = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id; // Ustawia wartość opcji na id rasy
    option.textContent = breed.name; // Ustawia tekst opcji na nazwę rasy
    select.appendChild(option); // Dodaje opcję do listy rozwijanej
  });
}

// Funkcja do obsługi żądania pobrania ras
function handleBreedsRequest() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block'; // Pokazuje animację ładowania

  fetchBreeds()
    .then(response => {
      const breeds = response.data; // Pobiera dane o rasach z odpowiedzi
      populateBreedsSelect(breeds); // Wywołuje funkcję do wypełniania listy rozwijanej
    })
    .catch(error => {
      const errorElement = document.querySelector('.error');
      errorElement.style.display = 'block'; // Pokazuje komunikat o błędzie
      console.error('Error fetching breeds:', error);
    })
    .finally(() => {
      loader.style.display = 'none'; // Ukrywa animację ładowania po zakończeniu żądania
    });
}

// Obsługa zdarzenia submit formularza
document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault(); // Zapobiega domyślnej akcji formularza

  handleBreedsRequest(); // Wywołuje funkcję do obsługi żądania pobrania ras
});