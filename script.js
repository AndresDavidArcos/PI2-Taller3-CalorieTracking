import { GoogleGenerativeAI } from "@google/generative-ai";

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
        .then(data => showCalories(data)) // Pass data to showCalories function
        .catch(error => {
            console.error('Error:', error);
        });
}

function showCalories(data) {
    // console.log("Printing data:", data.data);

    async function run() {

        const genAI = new GoogleGenerativeAI("AIzaSyD_3UsseiVPzZAQlC0khCb1YRPmCfa_5C4");

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat();

        const prompt = "I want you to simulate the ingredients and aprox calories of the following food: " + data.data + ". Answer with the following format: Ingredient1: Calories1; " +
            "\nIngredient2: Calories2;" +
            "\nIngredient3: Calories3;...";

        const result = await chat.sendMessage(prompt);

        const response = result.response;
        const text = await response.text();
        console.log(text);

        const lines = text.split('\n');

        console.log(lines);

        const mealTitleElement = document.querySelector('.meal-title');

        const capitalizedText = data.data.charAt(0).toUpperCase() + data.data.slice(1);

        mealTitleElement.textContent = capitalizedText;

        const mealAttributeElement = document.querySelector('.meal-attribute:nth-child(1) p');

        const ulElement = document.createElement('ul');

        lines.forEach(line => {
            const liElement = document.createElement('li');
            liElement.textContent = line;
            ulElement.appendChild(liElement);
        });

        mealAttributeElement.appendChild(ulElement);

    }

    run();
}

function handleFileSelect(event) {
    var files = event.target.files;
    
    if (files.length === 1 && files[0].type.startsWith('image/')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('box').innerHTML = ''; // Limpiamos el contenido actual
            document.getElementById('box').appendChild(img);
        };
        reader.readAsDataURL(files[0]);
        document.getElementById('calculate').style.display = 'inline-block';
    } else {
        alert('Por favor, selecciona solo una imagen');
    }
}