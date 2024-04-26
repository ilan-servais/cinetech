const apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=57be7838f9d1d893350a3227c0e862a5";
const tvList = document.getElementById("tv-list");
const tvCard = document.getElementById("tv-card");

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(tv => {
            const tvItem = document.createElement("li");
            tvItem.innerHTML = `
                <div id="tv-card">
                <a href="film-detail.html?id=${tv.id}">
                        <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}">
                    </a>
                </div>
            `;
            tvList.appendChild(tvItem);
        });
    })
    .catch(error => {
        console.error(error);
    });


function paginationOnScroll() {
    let page = 1;
    let totalPages = 500;
    let isLoading = false;

    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && page < totalPages && !isLoading) {
            isLoading = true;
            page++;
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=57be7838f9d1d893350a3227c0e862a5&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach(tv => {
                        const tvItem = document.createElement("li");
                        tvItem.innerHTML = `
                            <div id="tv-card">
                            <a href="film-detail.html?id=${tv.id}">
                                    <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}">
                                </a>
                            </div>
                        `;
                        tvList.appendChild(tvItem);
                    });
                    isLoading = false;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });
}

paginationOnScroll();