// Dummy data for selected option
var selectedOption = [];

var ameri = JSON.parse(localStorage.getItem("ameri"));
selectedOption.push(ameri);
console.log(selectedOption)


// Function to update button backgrounds based on selected option
function updateButtonBackgrounds(option) {
    if (option.temperature === "hot") {
        const hotButton = document.querySelector('.hot-button');
        hotButton.style.backgroundImage = "url('../assets/selected_hot.png')";
        hotButton.style.backgroundSize = "contain";
    } else if (option.temperature === "ice") {
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

const $btn = document.getElementById("mic")
const $audio = document.querySelector("audio")
let isRecording = false;
let mediaRecorder = null;
const audioArray = [];
let currentIndex = 0;
let audioFiles = ['../voice/2.mp3','../voice/3.mp3','../voice/4.mp3','../voice/5.mp3'];
let fun = [temp, shot, select, cnt];

$btn.onclick = async function (event) {
    if (!isRecording) {
        document.getElementById("mic").innerHTML = "<i class='material-icons'>graphic_eq</i>";
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(mediaStream);

        mediaRecorder.ondataavailable = (event) => {
            audioArray.push(event.data);
        };

        mediaRecorder.onstop = async (event) => {
            document.getElementById("mic").innerHTML = "<i class='material-icons'>mic</i>";
            const blob = new Blob(audioArray, { type: "audio/mp3" });
            audioArray.length = 0;
            sendAudioToServer(blob, fun[currentIndex]);
            
        };

        mediaRecorder.start();
        isRecording = true;

        // Automatically stop recording after 10 seconds
        setTimeout(() => {
            if (isRecording) {
                mediaRecorder.stop();
                isRecording = false;
            }
        }, 10000);
    } else {
        // Stop recording if the button is pressed again
        mediaRecorder.stop();
        isRecording = false;
    }
    
};



function playAudio() {
    if (currentIndex < audioFiles.length) {
        $audio.src = audioFiles[currentIndex];
        $audio.play();
    }
}

async function sendAudioToServer(blob, f) {
    const formData = new FormData();
            formData.append('audio', blob, 'recording.mp3');
            console.log(blob);
            try {
                
                const response = await fetch('http://127.0.0.1:5000/api/stt', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    if (currentIndex < audioFiles.length) {
                        value = f(result.text)
                        console.log(value)
                        if (value == 'hot') {
                            const hotButton = document.querySelector('.hot-button');
                            hotButton.style.backgroundImage = "url('../assets/selected_hot.png')";
                            hotButton.style.backgroundSize = "contain";

                            const coldButton = document.querySelector('.cold-button');
                            coldButton.style.backgroundImage = "url('../assets/unselected_cold.png')";
                            coldButton.style.backgroundSize = "contain";
                            selectedOption[0].temperature = 'hot';
                        } else if (value == 'ice') {
                            const coldButton = document.querySelector('.cold-button');
                            coldButton.style.backgroundImage = "url('../assets/selected_cold.png')";
                            coldButton.style.backgroundSize = "contain";

                            const hotButton = document.querySelector('.hot-button');
                            hotButton.style.backgroundImage = "url('../assets/unselected_hot.png')";
                            hotButton.style.backgroundSize = "contain";
                            selectedOption[0].temperature = 'ice';
                        } else if (value == 'yes') {
                            const shotButton = document.querySelector('.add-noshot-button');
                            shotButton.style.backgroundImage = "url('../assets/unselected_noshot.png')";
                            shotButton.style.backgroundSize = "contain";
                            const yesshotButton = document.querySelector('.add-shot-button');
                            yesshotButton.style.backgroundImage = `url('../assets/selected_${selectedOption[0].shot-1}shot.png')`;
                            yesshotButton.style.backgroundSize = "contain";
                            selectedOption[0].shot = 3;
                        } else if (value == 0) {
                            location.href = '../confirm/confirm.html';
                        }
                        console.log('Upload successful:', result);
                        currentIndex++;
                        playAudio();
                    }
                } else {
                    console.error('Upload failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
}




function temp(text) {
    if (text.includes('따뜻한') || text.includes('뜨거운') || text.includes('뜨신거') || text.includes('핫') || text.includes('따뜻한거')) {
        return 'hot';
    } else if (text.includes('차가운') || text.includes('아이스') || text.includes('찬거') || text.includes('차가운거')) {
        return 'ice';
    }
    return 'asdf';
}

function shot(text) {
    if (text.includes('없음') || text.includes('안해') || text.includes('아니') || text.includes('없어') || text.includes('없어요')) {
        return 'no';
    } else if (text.includes('응') || text.includes('네') || text.includes('하나 추가') || text.includes('추가')) {
        return 'yes';
    }
    return 'sdff';
}

function select(text) {
    if (text.includes('안해') || text.includes('안함') || text.includes('없음') || text.includes('없어') || text.includes('없어요')) {
        return 'noAdd'
    }
    return 'fgh';
}

function cnt(text) {
    if (text.includes('맞아') || text.includes('맞음') || text.includes('맞아요')) {
        return 0;
    } else if (text.includes('한개') || text.includes('한 개') || text.includes('한 잔') || text.includes('한잔') || text.includes('하나')) {
        return 1;
    } else if (text.includes('두개') || text.includes('두 개') || text.includes('두 잔') || text.includes('두잔')) {
        return 2;
    } else if (text.includes('세개') || text.includes('세 개') || text.includes('세 잔') || text.includes('세잔')) {
        return 3;
    }
    return 4;
}


playAudio();
