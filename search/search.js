function changeIcon() {
    document.getElementById("mic").innerHTML = "<i class='material-icons'>graphic_eq</i>";
}

document.addEventListener("DOMContentLoaded", () => {
  const menuData = [
      {
          name: "아이스 초콜릿 라떼",
          amount: "250ml",
          price: "4000원",
          imageUrl: "https://i.pinimg.com/564x/bc/0c/ff/bc0cffc8b21c24b4b571e98b9ab5da12.jpg"
      },
      {
          name: "핫초코",
          amount: "250ml",
          price: "4000원",
          imageUrl: "https://i.pinimg.com/736x/c0/85/5f/c0855f7cc3c83eaee8404196862f7e7a.jpg"
      },
  ];

  const menuList = document.getElementById("menu-list");
  menuData.forEach(menu => {
      const menuDiv = document.createElement("div");
      menuDiv.classList.add("menu");
      menuDiv.innerHTML = `
          <div class="menu-image" style="background-image: url('${menu.imageUrl}');"></div>
          <div class="menu-info">
              <div class="menu-name-list">
                  <p class="menu-name">${menu.name}</p>
                  <p class="menu-amount">${menu.amount}</p>
              </div>
              <div class="menu-price">
                  <p class="price">${menu.price}</p>
              </div>
          </div>
      `;
      menuList.appendChild(menuDiv);
  });
});
