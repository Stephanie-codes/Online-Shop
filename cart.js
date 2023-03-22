//Generates items in the cart into another page: cart.html
let cartHTML = document.getElementById("cartHTML"); 

const generateCartHTML = () => {
  let cartItems = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith("item_")) {
      let id = key.substring(5, 8);
      let item = products.find((x) => x.id == id);

      if (item) {
        let quantity = parseInt(localStorage.getItem(key));

        if (quantity > 0) {
          item.quantity = quantity;
          cartItems.push(item);
        }
      }
    }
  }

  const cartHTML = cartItems
    .map((item) => {
      const { id, name, desc, img, price, quantity } = item;
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
                <div class="quantity">${quantity}</div>
                <i class="plus">+</i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return cartHTML;
};

document.addEventListener("DOMContentLoaded", function() {
  const cartHTML = generateCartHTML();
  const cartContainer = document.querySelector('#cartHTML');
  cartContainer.innerHTML = cartHTML;
});

//Clear localStorage
const clearCartButton = document.getElementById("clear-cart");

clearCartButton.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
  updateQuantitiesFromStorage();
  const cartHTML = generateCartHTML();
  const cartContainer = document.querySelector('#cartHTML');
  cartContainer.innerHTML = cartHTML;
});



// function to update cart counter with total items in cart
const updateQuantitiesFromStorage = () => {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key.startsWith("item_")) {
        let quantity = parseInt(localStorage.getItem(key));
        total += quantity;
      }
    }
    cartCounter.textContent = total;
  };

  
const cartCounter = document.getElementById("counter");

document.addEventListener("DOMContentLoaded", function() {
  updateQuantitiesFromStorage();
  const cartHTML = generateCartHTML();
  const cartContainer = document.querySelector("#cartHTML");
  cartContainer.innerHTML = cartHTML;

  // add event listeners for plus and minus buttons
  const plusButtons = document.querySelectorAll(".plus");
  const minusButtons = document.querySelectorAll(".minus");
  plusButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemDiv = button.closest(".item");
      const quantitySpan = itemDiv.querySelector(".quantity");
      const x = products.find(x => x.id == itemDiv.id);
      x.quantity++;
      quantitySpan.textContent = x.quantity;
      cartCounter.textContent = parseInt(cartCounter.textContent) + 1;
      localStorage.setItem(`item_${x.id}`, x.quantity);
      updateTotal(); //to update total amount automatically
    });
  });
  minusButtons.forEach(button => {
    button.addEventListener("click", () => {
      const itemDiv = button.closest(".item");
      const quantitySpan = itemDiv.querySelector(".quantity");
      const x = products.find(x => x.id == itemDiv.id);
      if (x.quantity > 0) {
        x.quantity--;
        quantitySpan.textContent = x.quantity;
        cartCounter.textContent = parseInt(cartCounter.textContent) - 1;
        localStorage.setItem(`item_${x.id}`, x.quantity);
        updateTotal(); //to update total amount automatically
      }
    });
  });
});


// function to update the total based on the current quantities in the cart
const updateTotal = () => {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("item_")) {
      let id = key.substring(5, 8);
      let item = products.find((x) => x.id == id);
      if (item) {
        let quantity = parseInt(localStorage.getItem(key));
        total += item.price * quantity;
      }
    }
  }
  document.getElementById("total").innerHTML = "Total: £" + total.toFixed(2);
};

// Get the cart items from localStorage
let cartItems = [];
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if (key.startsWith("item_")) {
    let id = key.substring(5, 8);
    let item = products.find((x) => x.id == id);
    if (item) {
      let quantity = parseInt(localStorage.getItem(key));
      if (quantity > 0) {
        item.quantity = quantity;
        cartItems.push(item);
      }
    }
  }
}

// Calculate the total
let total = 0;
for (let i = 0; i < cartItems.length; i++) {
  total += cartItems[i].price * cartItems[i].quantity;
}

// Display the total
document.getElementById("total").innerHTML = "Total: £" + total.toFixed(2);



// NEXT STEP MAKE CART ITEMS DISAPPEAR IF QUANTITY REDUCED TO ZERO