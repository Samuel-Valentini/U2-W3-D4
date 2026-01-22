const urlOriginal = location.search;

const allParam = new URLSearchParams(urlOriginal);

const imageID = allParam.get("imageID");

const query = allParam.get("query");

const cardsBox = document.getElementById("cards-box");

fetch(`https://api.pexels.com/v1/photos/${imageID}`, {
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

        let originalURL = objectList.src.original;

        cardsBox.innerHTML = `
            <div class="col-12">
                <div class="card mb-4 shadow-sm">
                    <img
                        src="${originalURL}"
                        style="aspect-ratio:3/2; object-fit:cover"
                        class="bd-placeholder-img card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">${query}</h5>
                        <div
                            class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a
                                    href="./pexels-start.html"
                                    class="btn btn-sm btn-outline-secondary">
                                    Home
                                </a>
                            </div>
                            <small class="text-muted">ID: ${imageID}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;

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
