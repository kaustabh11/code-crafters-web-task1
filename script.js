document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (query !== '') {
            try {
                const response = await fetch(`https://corsproxy.io/?https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${query}`);
                const data = await response.json();
                displayResults(data.query.search);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            searchResults.innerHTML = '<p class="text-red-600 font-bold custom-error">Enter a query to search!!!</p>';
        }
        searchInput.value = ''
    });

    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<p class="text-gray-600 font-bold custom-error">No results found!!!</p>';
        } else {
            const resultsSection = document.createElement('section');
            resultsSection.innerHTML = `<h1 class="text-2xl font-bold my-8">Displaying results for "${searchInput.value}"</h1>`;
            searchResults.appendChild(resultsSection);
    
            results.forEach(result => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <h3 class="text-blue-600 font-bold custom-head">${result.title}</h3>
                    <p class="mb-6">${result.snippet}</p>
                `;
                resultsSection.appendChild(li);
            });
        }
    }
});
