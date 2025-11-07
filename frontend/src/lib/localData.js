let dataPromise;

const API_BASE_URL = (import.meta.env?.VITE_API_URL || "http://localhost:5050").replace(/\/$/, "");
const DATA_ENDPOINT = `${API_BASE_URL}/api/data`;

export function resetLocalDataCache() {
  dataPromise = undefined;
}

export async function getAppData() {
  if (!dataPromise) {
    dataPromise = fetch(DATA_ENDPOINT, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar dados da API");
        }
        return response.json();
      })
      .catch((error) => {
        dataPromise = undefined;
        throw error;
      });
  }
  return dataPromise;
}
