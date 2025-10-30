// Simple auth storage
export const auth = {
  setToken: (token) => sessionStorage.setItem('authToken', token),
  getToken: () => sessionStorage.getItem('authToken'),
  removeToken: () => sessionStorage.removeItem('authToken'),
  isLoggedIn: () => !!sessionStorage.getItem('authToken'),
};
