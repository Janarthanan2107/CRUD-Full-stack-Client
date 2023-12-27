"use strict";

const productForm = document.getElementById("productForm");

const submit = document.getElementById("submit");

submit.addEventListener("click", async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:5000/api/v1/products/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        // Add the request body here if you're sending data
        body: new URLSearchParams(
            new FormData(productForm)
        ),
    })

    if (res.status === 201) {
        alert("Products added successfully");
        window.location.reload()
    }
});
