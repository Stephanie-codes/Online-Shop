document.addEventListener("DOMContentLoaded", function() {
  generateShop();
});

let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
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

let insertShopIntoDOM = () => {
  let shopHTML = generateShop();
  let shop = document.querySelector('#shop');
  shop.innerHTML = shopHTML;
};

insertShopIntoDOM();

let cart = document.getElementById("counter");

shop.addEventListener('click', event => {
  const button = event.target;
  if (button.classList.contains('plus')) {
    const itemDiv = button.closest('.item');
    const quantitySpan = itemDiv.querySelector('.quantity');
    const x = shopItemsData.find(x => x.id == itemDiv.id);
    x.quantity++;
    quantitySpan.textContent = x.quantity;
    cart.textContent = parseInt(cart.textContent) + 1; // update cart total
  } else if (button.classList.contains('minus')) {
    const itemDiv = button.closest('.item');
    const quantitySpan = itemDiv.querySelector('.quantity');
    const x = shopItemsData.find(x => x.id == itemDiv.id);
    if (x.quantity > 1) {
      x.quantity--;
      quantitySpan.textContent = x.quantity;
      cart.textContent = parseInt(cart.textContent) - 1; // update cart total
    }
  }
});
