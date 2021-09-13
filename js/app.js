// load each product on html
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src=${product.image}></img>
      </div>
      <h3 class="fw-bold">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <div class="d-flex justify-content-around">
        <p title="average rating"><i class="fas fa-star text-warning"></i> ${product.rating.rate}</p>
        <p title="user count"><i class="fas fa-users"></i> ${product.rating.count}</p>
      </div>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success"><i class="fas fa-shopping-cart"></i> Add to cart</button>
      <a onclick="singleProductDetails(${product.id})" id="details-btn" class="btn btn-danger" href="#top"><i class="fas fa-info-circle"></i> Details</a>  
    </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};

// single product details
const singleProductDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(single => {
      const div = document.createElement('div');
      document.getElementById('single-product-details').textContent = '';
      div.innerHTML = `
      <div class="card mx-auto w-50 border border-3 rounded-2 shadow p-3 mb-5 bg-body rounded">
        <h3 class="card-title text-center">${single.title}</h3>
        <img src="${single.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <p class="text-center">Categories: ${single.category}</p>
          <p class="card-text">${single.description}</p>
          <div class="d-flex justify-content-between">
            <p><i class="fas fa-star text-warning"></i>Rating: ${single.rating.rate}</p>
            <p title="user count"><i class="fas fa-users"></i>User Count: ${single.rating.count}</p>
          </div>
          <h2>Price: $ ${single.price}</h2>
          <hr>
          <div class="d-flex justify-content-end">
            <button onclick="addToCart(${single.id},${single.price})" id="addToCart-btn" class="buy-now btn btn-success"><i class="fas fa-shopping-cart"></i> Add to cart</button>
          </div>
        </div>
      </div>
      `
      document.getElementById('single-product-details').appendChild(div);
    });
}

let count = 0;
// caling addToCart function to calculate product prices
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

// common funtion to get innertext and set it into a number
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};