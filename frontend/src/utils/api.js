export const fetchProviders = async () => {
  const response = await fetch('/api/providers');
  if (!response.ok) {
    throw new Error('Failed to fetch providers');
  }
  return response.json();
};

export const fetchProvider = async (id) => {
  const response = await fetch(`/api/providers/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch provider with id ${id}`);
  }
  return response.json();
};

export const addReview = async (id, review) => {
  const response = await fetch(`/api/providers/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error('Failed to submit review');
  }
  return response.json();
};

export const createBooking = async (booking) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
  if (!response.ok) {
    throw new Error('Failed to confirm booking');
  }
  return response.json();
};
