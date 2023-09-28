export const handleErrorMessage = (error: any) => {
  return error?.detail || error?.message || 'Internal server error';
};

export const randomString = () => {
  return btoa(Math.random().toString(36)).substring(2, 10);
};
