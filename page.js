const $btn = document.getElementById("mic")
console.log($btn)
let isRecording = false;
let mediaRecorder = null;
const audioArray = [];
var ameri = {
    temperature: "", 
    shot: 2, 
    syrup: false, 
    whipping: false, 
    cups: 0
}

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
                    console.log(result.text)
                    
                    if (result.text.includes('아메리카노') || result.text.includes('Americano') ||  result.text.includes('アメリカの')) {
                        if (result.text.includes('따뜻한') || result.text.includes('뜨거운') || result.text.includes('뜨신거') || result.text.includes('핫') || result.text.includes('따뜻한거')) {
                            ameri.temperature = 'hot';
                        } else if (result.text.includes('차가운') || result.text.includes('아이스') || result.text.includes('찬거') || result.text.includes('차가운거')) {
                            ameri.temperature = 'ice';
                        }
                        if (result.text.includes('한개') || result.text.includes('한 개') || result.text.includes('한 잔') || result.text.includes('한잔') || result.text.includes('하나') || result.text.includes('1')) {
                            ameri.cups = 1;
                        } else if (result.text.includes('두개') || result.text.includes('두 개') || result.text.includes('두 잔') || result.text.includes('두잔') || result.text.includes('2')) {
                            ameri.cups = 2;
                        } else if (result.text.includes('세개') || result.text.includes('세 개') || result.text.includes('세 잔') || result.text.includes('세잔') || result.text.includes('3')) {
                            ameri.cups = 3;
                        }
                        console.log(ameri)
                        console.log(JSON.stringify(ameri))
                        localStorage.setItem("ameri", JSON.stringify(ameri));
                        location.href='../menuOption/menuOption.html';
                    } else if (result.text.includes('초콜릿') || result.text.includes('추천')) {
                        location.href = '../search/search.html';
                    }
                    console.log('Upload successful:', result);
                } else {
                    console.error('Upload failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
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

