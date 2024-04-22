const button = document.getElementById('calculate');
button.addEventListener('click', sendImageAndCalculateCalories);

function loadImageBlob(imgSrc) {
    return fetch(imgSrc)
        .then(response => response.blob())
        .catch(error => {
            console.error('Error fetching image:', error);
            throw error;
        });
}

function sendImageToServer(imageBlob) {
    const image = new Blob([imageBlob], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('imagen', image);

    return fetch('http://localhost:8081/calorietracking/subirarchivo', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error sending image to server:', error);
            throw error;
        });
}

function calculateCalories() {
    return fetch('http://localhost:8081/calorietracking/calculatecalories', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error calculating calories:', error);
            throw error;
        });
}

function sendImageAndCalculateCalories() {
    const img = document.getElementById('box').getElementsByTagName('img')[0];

    loadImageBlob(img.src)
        .then(imageBlob => sendImageToServer(imageBlob))
        .then(() => calculateCalories())
        .then(data => showCalories())
        .then(data => {
            // console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function showCalories() {

    console.log("imprimiendo gemini", data)
    // fetch('http://localhost:8081/calorietracking/askgemini', {
    //     method: 'POST',
    //     body: JSON.stringify({ text: text }),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         // sendImageAndCalculateCalories();
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
}