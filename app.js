
// Displays products from data.js to index.html
let shop = document.getElementById("shop");

let generateShop = () => {
  return (shop.innerHTML = products.map((x) => {
    let { id, name, desc, img, price, quantity } = x;
    return `
    <div id="${id}" class="item">
      <img src=${img} alt="${name} product image">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quant">
          <p>£ ${price} GBP</p>
          <div class="buttons">
            <i class="minus">-</i>
            <div class="quantity">${quantity}
            </div>
            <i class="plus">+</i>
          </div>
        </div>
      </div>
    </div>
    `;
  })
  .join(""));
};

generateShop();


document.addEventListener("DOMContentLoaded", function() {
  generateShop();
});

let insertShopIntoDOM = () => {
  let shopHTML = generateShop();
  let shop = document.querySelector('#shop');
  shop.innerHTML = shopHTML;
};

insertShopIntoDOM();

//Shows quantities from localStorage incase page or tab is closed 
let updateQuantitiesFromStorage = () => {
  products.forEach((x) => {
    const storedQuantity = localStorage.getItem(`item_${x.id}`);
    if (storedQuantity !== null) {
      x.quantity = parseInt(storedQuantity);
      cartCounter.textContent = parseInt(cartCounter.textContent) + x.quantity; // update cartCounter
      const itemDiv = document.getElementById(x.id);
      const quantitySpan = itemDiv.querySelector('.quantity');
      quantitySpan.textContent = x.quantity; // update quantity displayed for item
    }
  });
};

//Updates products quanitites and cart icon total quantity 
let cartCounter = document.getElementById("counter");

shop.addEventListener('click', event => {
  const button = event.target;
  if (button.classList.contains('plus')) {
    const itemDiv = button.closest('.item');
    const quantitySpan = itemDiv.querySelector('.quantity');
    const x = products.find(x => x.id == itemDiv.id);
    x.quantity++;
    quantitySpan.textContent = x.quantity;
    cartCounter.textContent = parseInt(cartCounter.textContent) + 1; // update cart total
    localStorage.setItem(`item_${x.id}`, x.quantity); // store updated quantity in localStorage
  } else if (button.classList.contains('minus')) {
    const itemDiv = button.closest('.item');
    const quantitySpan = itemDiv.querySelector('.quantity');
    const x = products.find(x => x.id == itemDiv.id);
    if (x.quantity > 0) {
      x.quantity--;
      quantitySpan.textContent = x.quantity;
      cartCounter.textContent = parseInt(cartCounter.textContent) - 1; // update cart total
      localStorage.setItem(`item_${x.id}`, x.quantity); // store updated quantity in localStorage
    }
  }
});

updateQuantitiesFromStorage();
