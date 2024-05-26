// Dummy data for selected option
const selectedOption = [
    { temperature: "hot", shot: 3, syrup: false, whipping: true, cups: 1},
]

// Function to update button backgrounds based on selected option
function updateButtonBackgrounds(option) {
    if (option.temperature === "hot") {
        const hotButton = document.querySelector('.hot-button');
        hotButton.style.backgroundImage = "url('../assets/selected_hot.png')";
        hotButton.style.backgroundSize = "contain";
    } else {
        const coldButton = document.querySelector('.cold-button');
        coldButton.style.backgroundImage = "url('../assets/selected_cold.png')";
        coldButton.style.backgroundSize = "contain";
    }
    if (option.shot === 2) {
        const shotButton = document.querySelector('.add-noshot-button');
        shotButton.style.backgroundImage = "url('../assets/selected_noshot.png')";
        shotButton.style.backgroundSize = "contain";
    } else if (option.shot > 2) {
        const shotButton = document.querySelector('.add-shot-button');
        option.shot -= 2;
        shotButton.style.backgroundImage = `url('../assets/selected_${option.shot}shot.png')`;
        shotButton.style.backgroundSize = "contain";
    }
    if (option.syrup) {
        const syrupButton = document.querySelector('.add-syrup-button');
        syrupButton.style.backgroundImage = "url('../assets/selected_syrup.png')";
        syrupButton.style.backgroundSize = "contain";
    }
    if (option.whipping) {
        const whippingButton = document.querySelector('.add-whipping-button');
        whippingButton.style.backgroundImage = "url('../assets/selected_whipping.png')";
        whippingButton.style.backgroundSize = "contain";
    }
    if (option.cups) {
        const cupsButton = document.querySelector('.quantity-button');
        cupsButton.style.backgroundImage = `url('../assets/quantity_${option.cups}.png')`;
        cupsButton.style.backgroundSize = "contain";
    }
}

updateButtonBackgrounds(selectedOption[0]);