// Dummy data for ordered drinks
const orderedDrinks = [
    { name: "아메리카노", type: "따뜻한", image: "./assets/americano.png", shot: 2, syrup: true, cups: 2},
    { name: "바닐라라떼", type: "시원한", image: "./assets/vanillaLatte.png", shot: 2, syrup: false, whipping: true, cups: 1},
];

const orderedDrinksContainer = document.getElementById("orderedDrinksContainer");

// orderedDrinks를 순회하며 각 음료에 대한 컨테이너 생성
orderedDrinks.forEach((drink, index) => {
    
    // Drink Container
    const drinkContainer = document.createElement("div");
    drinkContainer.classList.add("drink-container");

    // 메뉴 대표 사진
    const drinkImage = document.createElement("img");
    drinkImage.src = drink.image;
    drinkImage.width = 200;
    drinkImage.height = 200;
    drinkContainer.appendChild(drinkImage);

    // 차가운 거, 뜨거운 거
    const drinkTypeImage = document.createElement("img");
    if (drink.type === "따뜻한") {
        drinkTypeImage.src = "./assets/hot.png"; // 따뜻한 음료이면 hot.png
    } else if (drink.type === "시원한") {
        drinkTypeImage.src = "./assets/cold.png"; // 시원한 음료이면 cold.png
    }
    drinkTypeImage.width = 100;
    drinkTypeImage.height = 100;
    drinkContainer.appendChild(drinkTypeImage);

    // 샷 개수(추후 샷 개수에 따른 이미지 생성 필요)
    const shotsImage = document.createElement("img");
    shotsImage.src = `./assets/${drink.shot}shot.png`;
    shotsImage.width = 100;
    shotsImage.height = 100;
    drinkContainer.appendChild(shotsImage);

    // 시럽 추가
    const syrupImage = document.createElement("img");
    if (drink.syrup) {
        syrupImage.src = "./assets/syrup.png";
        syrupImage.width = 100;
        syrupImage.height = 100;
        drinkContainer.appendChild(syrupImage);
    }

    // 휘핑 추가
    const whippingImage = document.createElement("img");
    if (drink.whipping) {
        whippingImage.src = "./assets/whipping.png";
        whippingImage.width = 100;
        whippingImage.height = 100;
        drinkContainer.appendChild(whippingImage);
    }
    
    // 잔 개수(추후 잔 개수에 따른 이미지 생성 필요)
    const cupsImage = document.createElement("img");
    cupsImage.src = `./assets/${drink.cups}cup.png`;
    cupsImage.width = 100;
    cupsImage.height = 100;
    drinkContainer.appendChild(cupsImage);


    // 메뉴 이름
    const drinkName = document.createElement("span");
    drinkName.textContent = drink.name;
    drinkContainer.appendChild(drinkName);

    // 차가운 거, 뜨거운 거
    const drinkType = document.createElement("span");
    drinkType.textContent = drink.type;
    drinkContainer.appendChild(drinkType);

    // ordered drink Container에 추가
    orderedDrinksContainer.appendChild(drinkContainer);

    // 구분선 (마지막 메뉴엔 X)
    if (index < orderedDrinks.length - 1) {
        const horizontalLine = document.createElement("hr");
        orderedDrinksContainer.appendChild(horizontalLine);
    }
});
