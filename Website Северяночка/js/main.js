const discountedProducts = $("#discounts");
const newProducts = $("#news");
const recentlyboughts = $("#recently__bought");

import products from "./data.js";

render();

//! Star rating (yulduzchalarni render qilish uchun)
function starRating(rating) {
  let starContainer = "";
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  for (let i = 0; i < fullStars; i++) {
    starContainer += `<img src="/images/fullstar.svg" alt="" />`;
  }
  if (halfStars === 1) {
    starContainer += `<img src="/images/halfstar.svg" alt="" />`;
  }
  for (let i = 0; i < emptyStars; i++) {
    starContainer += `<img src="/images/emptystar.svg" alt="" />`;
  }
  return starContainer;
}

//! RENDER
function render() {
  // Filtering types
  const discountedItems = products.filter((item) => {
    return item.isDiscounted == true;
  });
  const newItems = products.filter((item) => {
    return item.isNew == true;
  });
  const recentlyBoughtItems = products.filter((item) => {
    return item.isRecentlybought == true;
  });

  // making cards

  //! Акции
  discountedItems.map((item) => {
    const stars = starRating(item.rating);
    const discountedItemCard = `
    <div class="card">
        <img class="item__img" src="${item.imgAdress}" alt="" />
        <img class="like__btn" src="/images/likeitem.png" alt="" />
        <div class="discount__amount">-50%</div>
        <div class="flex prices">
          <div>
            <h4>${item.newPrice}</h4>
            <p>С картой</p>
          </div>
          <div>
            <h6>${item.originalPrice}</h6>
            <p>Обычная</p>
          </div>
        </div>
        <p class="item__info">${item.info}</p>
        <div class="stars">
         ${stars}
        </div>
        <button class="addto__card">В корзину</button>
    </div>
      `;
    discountedProducts.innerHTML += discountedItemCard;
  });

  //! Новинки
  newItems.map((item) => {
    const stars = starRating(item.rating);
    const newItemcard = `
    <div class="card">
      <img class="item__img" src="${item.imgAdress}" alt="" />
      <img class="like__btn" src="/images/likeitem.png" alt="" />
      <div class="flex prices">
        <div>
          <h4>${item.originalPrice}</h4>
        </div>
      </div>
      <p class="item__info">${item.info}</p>
      <div class="stars">
        ${stars}
      </div>
      <button class="addto__card">В корзину</button>
    </div>
    `;
    newProducts.innerHTML += newItemcard;
  });

  //! Покупали раньше
  recentlyBoughtItems.map((item) => {
    const stars = starRating(item.rating);
    const recentsCard = `
    <div class="card">
      <img class="item__img" src="${item.imgAdress}" alt="" />
      <img class="like__btn" src="/images/likeitem.png" alt="" />

      <div class="flex prices">
        <div>
          <h4>${item.originalPrice}</h4>
        </div>
      </div>
      <p class="item__info">${item.info}</p>
      <div class="stars">
         ${stars}
      </div>
      <button class="addto__card">В корзину</button>
    </div>
    `;
    recentlyboughts.innerHTML += recentsCard;
  });
}
