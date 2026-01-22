console.log("script.js online");

let query = "family";
const url = `https://api.pexels.com/v1/search?query=${query}`;

console.log(url);

const cardsBox = document.getElementById("cards-box");

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
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary">
                                    View
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-outline-secondary">
                                    Hide
                                </button>
                            </div>
                            <small class="text-muted">ID: </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }

        // fine codice
    })
    .catch((err) => {
        console.log(err);
    });
