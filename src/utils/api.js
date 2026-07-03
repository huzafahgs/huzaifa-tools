const API_URL = "http://127.0.0.1:8000";

export const api = {
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return {
        offline: true,
        message: error.message,
      };
    }
  },
};