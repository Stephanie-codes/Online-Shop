document.addEventListener("DOMContentLoaded", function() {
  generateShop();
});

let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, desc, img, price } = x;
    return `
    <div id="product${id}" class="item">
      <img src=${img} alt="${name} product image">
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quant">
          <p>£ ${price} GBP</p>
          <div class="buttons">
            <i class="minus">-</i>
            <div class="quantity">0
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

