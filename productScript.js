"use strict";

const container = document.getElementById("container")

// Global variable
const getAllProductsUrl = "https://fair-red-bighorn-sheep-wrap.cyclic.app/api/v1/products";

// Functions
const init = () => {
    getAllProducts();
};

const getAllProducts = async () => {
    try {
        const response = await fetch(getAllProductsUrl);
        const res = await response.json();
        console.log(res.data);
        displayProducts(res.data)
    } catch (err) {
        console.error("Error fetching data:", err);
        container.textContent = "Sorry Something Went Wrong!!";
    }
};

const displayProducts = (products) => {
    const productsEle = products.map((product) => {
        const formId = `updateForm-${product._id}`;
        return (
            `<div id=${product.id} class="mb-2">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex gap-2">
                            <button id=${product._id} type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#display-${product._id}">show More</button>
                            <button class="btn btn-danger" id=${product._id} onclick="deleteProduct(event)">Delete</button>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update-${product._id}">
                            Update
                            </button>
                        </div>
                        </div>
                    </div>

                    
                    <!-- Display Product Modal -->
                    <div class="modal fade" id="display-${product._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${product.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>${product.description}</p>
                                <p>${product.price}</p>
                                <p>${product.category}</p>
                                <p>${product.image}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- Update Form -->
                    <div class="modal fade" id="update-${product._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update : ${product.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <form action="#" id="${formId}">
                            <div class="container d-flex flex-column gap-3">
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="title"
                                  name="title"
                                  placeholder="title"
                                  value="${product.title}"
                                />
                                <label for="title">Title:</label>
                              </div>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="description"
                                  name="description"
                                  placeholder="description"
                                  value="${product.description}"
                                />
                                <label for="description">Description:</label>
                              </div>
                              <div class="form-floating">
                                <input
                                  type="number"
                                  class="form-control"
                                  id="price"
                                  name="price"
                                  placeholder="price"
                                  value="${product.price}"
                                />
                                <label for="price">Price:</label>
                              </div>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="category"
                                  name="category"
                                  placeholder="category"
                                  value="${product.category}"
                                />
                                <label for="category">Category:</label>
                              </div>
                              <div class="form-floating">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="image"
                                  name="image"
                                  placeholder="image"
                                  value="${product.image}"
                                />
                                <label for="image">Image Url:</label>
                              </div>
                            </div>
                          </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id=${product._id} onclick="updateFun(event)">Update</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        )
    });
    container.innerHTML = productsEle.join("")
}

const deleteProduct = async (event) => {
    event.preventDefault();
    const { id } = event.target

    if (confirm("Are you sure to delete this product ?")) {
        await fetch(`https://fair-red-bighorn-sheep-wrap.cyclic.app/api/v1/products/${id}`, {
            method: "DELETE",
        })
        getAllProducts()
    }
}

const updateFun = async (event) => {
    const { id } = event.target; // Use event.target.id to get the correct id
    const formId = `updateForm-${id}`;
    const updateForm = document.getElementById(formId);

    try {
        let res = await fetch(`https://fair-red-bighorn-sheep-wrap.cyclic.app/api/v1/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(new FormData(updateForm)),
        });

        if (res.ok) {
            alert("Product updated successfully");
            window.location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

init();