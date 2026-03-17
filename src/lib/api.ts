
const API_URL = '/api';

export const api = {
  cars: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/cars`);
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/cars/${id}`);
      return res.json();
    }
  },
  inquiries: {
    create: async (inquiry: any) => {
      const res = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      return res.json();
    }
  },
  contacts: {
    create: async (contact: any) => {
      const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      return res.json();
    }
  },
  dealer: {
    getInfo: async () => {
      const res = await fetch(`${API_URL}/dealer`);
      return res.json();
    }
  }
};
