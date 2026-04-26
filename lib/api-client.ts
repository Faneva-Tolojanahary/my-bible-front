// lib/api-client.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? "https://my-bible.onrender.com/api"
  : 'http://localhost:5000/api';

class APIClient {
  private async request(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Une erreur est survenue');
    }

    return response.json();
  }

  // Méthodes GET, POST, PUT, DELETE
  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

 
}

export const apiClient = new APIClient();