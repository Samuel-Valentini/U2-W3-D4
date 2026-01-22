console.log("script.js online");

let query = "family";

const cardsBox = document.getElementById("cards-box");
const loadImagesBtn = document.getElementById("load-images");
const loadImages2Btn = document.getElementById("load-images2");
const searchValue = document.getElementById("Search");
const searchBtn = document.getElementById("button-search");

// la funzione generateGallery genera la galleria a partire da una query

const generateGallery = (query) => {
    const url = `https://api.pexels.com/v1/search?query=${query}`;

    fetch(url, {
        headers: {
            authorization:
                "4741wqBpG8bQWoxrPyTG3lF7X9XRZAgcpBjIKuLdNKLKB7dujgCNePM3",
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else throw new Error("Error in .then");
        })
        .then((res) => {
            const objectList = res;
            console.log(objectList);

            // inserire codice su oggetto objectlist
            // cardsBox.innerHTML = null;

            const arrayOfUrl = [];
            const arrayOfUrlMedium = [];
            const idOfUrl = [];
            cardsBox.innerHTML = null;

            for (let i = 0; i < objectList.photos.length; i++) {
                arrayOfUrl[i] = objectList.photos[i].src.original;
                arrayOfUrlMedium[i] = objectList.photos[i].src.medium;
                idOfUrl[i] = objectList.photos[i].id;
                cardsBox.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img
                        src="${arrayOfUrlMedium[i]}"
                        style="aspect-ratio:3/2; object-fit:cover"
                        class="bd-placeholder-img card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">${query} - ${i}</h5>
                        <div
                            class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a
                                    href="./original-image.html?imageID=${idOfUrl[i]}&query=${query}"
                                    class="btn btn-sm btn-outline-secondary">
                                    View
                                </a>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary hide-btn">
                                    Hide
                                </button>
                            </div>
                            <small class="text-muted">ID: ${idOfUrl[i]}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
            }

            // creiamo la scomparsa con il button

            const hideBtn = document.querySelectorAll(".hide-btn");

            hideBtn.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.closest("div.col-md-4").classList.add("d-none");
                });
            });

            // fine codice
        })
        .catch((err) => {
            console.log(err);
        });
};

loadImagesBtn.addEventListener("click", () => {
    cardsBox.innerHTML = `<div class="text-center">
                            <div
                                class="spinner-border"
                                role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`;

    generateGallery(query);
});

loadImages2Btn.addEventListener("click", () => {
    cardsBox.innerHTML = `<div class="text-center">
                            <div
                                class="spinner-border"
                                role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>`;

    generateGallery("tigers");
});

searchBtn.addEventListener("click", () => {
    generateGallery(searchValue.value);
});
