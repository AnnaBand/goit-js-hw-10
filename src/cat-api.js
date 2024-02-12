import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hqS8g05ZHcCMorrOK1oGyTpHCtvYrHyZdj6nwMqTquFs62KJcer5ugjk9Rju168f";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds");
}