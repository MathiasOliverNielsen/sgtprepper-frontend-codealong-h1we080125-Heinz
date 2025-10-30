export const LoginView = () => {
  const container = document.createElement('div');
  container.className = 'max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md';

  container.innerHTML = `
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Log ind</h2>
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Brugernavn</label>
        <input name="username" type="text" placeholder="Indtast brugernavn" required
               autocomplete="username"
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Adgangskode</label>
        <input name="password" type="password" placeholder="Indtast adgangskode" required
               autocomplete="current-password"
               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500">
      </div>
      <button type="submit" 
              class="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md transition-colors">
        Log ind
      </button>
    </form>
  `;

  return container;
};
