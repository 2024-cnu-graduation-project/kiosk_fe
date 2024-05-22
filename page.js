const $btn = document.getElementById("mic")
console.log($btn)
let isRecording = false;
let mediaRecorder = null;
const audioArray = [];

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
            audioArray.length = 0; // Clear the array

            // Create a FormData object and append the Blob
            const formData = new FormData();
            formData.append('audio', blob, 'recording.mp3');
            console.log(blob);
            try {
                // Send the Blob to the server using fetch
                const response = await fetch('http://127.0.0.1:5000/api/stt', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.text)
                    if (result.text.includes('아메리카노')) {
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

