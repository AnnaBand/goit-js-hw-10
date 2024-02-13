import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hqS8g05ZHcCMorrOK1oGyTpHCtvYrHyZdj6nwMqTquFs62KJcer5ugjk9Rju168f";

export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania ras kota:", error);
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania informacji o kocie:", error);
    throw error;
  }
}