const productDisplay = document.querySelector(".product-display");
const modalItem = document.querySelector(".modal-item");

const data = [
  {
    id: "1",
    product: "/images/image-product-1.jpg",
    thumbnail: "/images/image-product-1-thumbnail.jpg",
  },
  {
    id: "2",
    product: "/images/image-product-2.jpg",
    thumbnail: "/images/image-product-2-thumbnail.jpg",
  },
  {
    id: "3",
    product: "/images/image-product-3.jpg",
    thumbnail: "/images/image-product-3-thumbnail.jpg",
  },
  {
    id: "4",
    product: "/images/image-product-4.jpg",
    thumbnail: "/images/image-product-4-thumbnail.jpg",
  },
];

productDisplay.innerHTML = `
  <div class="screen-wrapper">
  <img class="screen" src="${data[0].product}" alt="">
  <div class="modal-change">
        <div class="prevImg"><img src="/images/icon-previous.svg" alt=""></div>
        <div class="nextImg"><img src="/images/icon-next.svg" alt=""></div>
    </div>
    </div>
  <div class="thumbnail">
    ${data
      .map(item => `<img class="btn" src="${item.thumbnail}" alt="">`)
      .join("")}
  </div>
`;

const btn = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

btn[0].classList.add("clicked");

btn.forEach((button, i) => {
  button.addEventListener("click", () => {
    btn.forEach(btn => btn.classList.remove("clicked"));
    button.classList.add("clicked");

    screen.src = data[i].product;
  });
});

modalItem.innerHTML = `
  <div class="closeModal"><img src="/images/icon-close.svg" alt=""></div>

  <div class="modal-screen">
    <img class="modalScreenImg" src="${data[0].product}" alt="">
    <div class="change">
        <div class="prev"><img src="/images/icon-previous.svg" alt=""></div>
        <div class="next"><img src="/images/icon-next.svg" alt=""></div>
    </div>
  </div>

  <div class="modal-thumbnail">
    ${data
      .map(item => `<img class="modal-btn" src="${item.thumbnail}" alt="">`)
      .join("")}
  </div>
`;

const modalBtn = document.querySelectorAll(".modal-btn");
const modalScreenImg = document.querySelector(".modalScreenImg");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".closeModal");

screen.addEventListener("click", () => {
  const currentSrc = new URL(screen.src).pathname;
  const currentIndex = data.findIndex(item => item.product === currentSrc);

  modalScreenImg.src = data[currentIndex].product;
  modal.classList.add("showModal");
  updateModalActive(currentIndex);
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("showModal");
  modalBtn.forEach(btn => btn.classList.remove("clicked"));
});

function updateModalActive(index) {
  modalBtn.forEach(btn => btn.classList.remove("clicked"));
  modalBtn[index].classList.add("clicked");
}

modalBtn.forEach((button, i) => {
  button.addEventListener("click", () => {
    modalScreenImg.src = data[i].product;
    updateModalActive(i);
  });
});

let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", () => {
  const currentSrc = new URL(modalScreenImg.src).pathname;
  const current = data.findIndex(item => item.product === currentSrc);

  let nextIndex = current + 1;
  if (nextIndex >= data.length) nextIndex = 0;

  modalScreenImg.src = data[nextIndex].product;
  updateModalActive(nextIndex);
});

prev.addEventListener("click", () => {
  const currentSrc = new URL(modalScreenImg.src).pathname;
  const current = data.findIndex(item => item.product === currentSrc);

  let prevIndex = current - 1;
  if (prevIndex < 0) prevIndex = data.length - 1;

  modalScreenImg.src = data[prevIndex].product;
  updateModalActive(prevIndex);
});

let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
const counter = document.querySelector(".counter");
let count = 0;

plus.addEventListener("click", () => {
  counter.innerHTML = count += 1;
});
minus.addEventListener("click", () => {
  if (counter.innerHTML != 0) {
    count -= 1;
    counter.innerHTML = count;
  } else {
    counter.innerHTML = 0;
  }
});

const cartIcon = document.querySelector(".cart");
const cartNum = document.querySelector(".cart-num");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartContent = document.querySelector(".cart-content");
const addToCartBtn = document.querySelector(".add-to-cart");
cartDropdown.style.display = "none";

const showCart = () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "block" ? "none" : "block";
    
}
cartIcon.addEventListener("click", () => {
showCart()
 handleHideNav()
});

let itemCount = 0;

addToCartBtn.addEventListener("click", () => {
  if (count === 0) return;

  itemCount = count;

  cartContent.querySelector("p").style.display = "none";
  cartContent.classList.remove("empty");
  cartContent.innerHTML += `
    <div class="wrap">
    <div class="cart-item">
      <img src=${screen.src} class="thumb">
      <div class="details">
        <p>Fall Limited Edition Sneakers</p>
        <p>$125.00 x ${count} 
        <span class="total">$${125 * count}.00</span></p>
      </div>
      <img src="/images/icon-delete.svg" class="delete">
    </div>

    <button class="checkout">Checkout</button>
    </div>
  `;

  cartNum.style.display = "block";
  const cartItem = document.querySelectorAll(".cart-item");
  cartNum.textContent = cartItem.length;

  const deleteBtn = document.querySelectorAll(".delete");

  deleteBtn.forEach(item => {
    item.addEventListener("click", e => {
      const wrap = e.currentTarget.parentElement.parentElement;
      wrap.remove();

      const itemsLeft = document.querySelectorAll(".wrap").length;
      cartNum.textContent = itemsLeft;

      if (itemsLeft === 0) {
        cartContent.innerHTML = `<p>Your cart is empty.</p>`;
        cartNum.style.display = "none";
      }
    });
  });
});

let nextImg = document.querySelector(".nextImg");
let prevImg = document.querySelector(".prevImg");

nextImg.addEventListener("click", () => {
  const currentSrc = new URL(screen.src).pathname;
  const current = data.findIndex(item => item.product === currentSrc);

  let nextIndex = current + 1;
  if (nextIndex >= data.length) nextIndex = 0;

  screen.src = data[nextIndex].product;
  updateModalActive(nextIndex);
});

prevImg.addEventListener("click", () => {
  const currentSrc = new URL(screen.src).pathname;
  const current = data.findIndex(item => item.product === currentSrc);

  let prevIndex = current - 1;
  if (prevIndex < 0) prevIndex = data.length - 1;

  screen.src = data[prevIndex].product;
  updateModalActive(prevIndex);
});

const show = document.querySelector(".show");
const hide = document.querySelector(".hide");
const nav = document.querySelector(".navbar ol");
const cover = document.querySelector(".cover");

const handleShowNav = () => {
  document.body.style.overflow = "hidden";
  nav.style.display = "flex";
  show.style.display = "none";
  hide.style.display = "block";
  cover.classList.add("showCover");
  cartDropdown.style.display = "none"
  
};
show.addEventListener("click", handleShowNav);

const handleHideNav = () => {
  document.body.style.background = "hsl(36, 100%, 99%)";
  document.body.style.overflow = "auto";
  nav.style.display = "none";
  show.style.display = "block";
  hide.style.display = "none";
  cover.classList.remove("showCover");
};
hide.addEventListener("click", handleHideNav);
