// Function to display emotions
function setEmotion(emotion) {
    const emotionImage = document.getElementById('emotion');
    const emotions = {
        happy: "images/happy.png",
        sad: "images/sad.png",
        angry: "images/angry.png",
        neutral: "images/neutral.png",
        surprised: "images/surprised.png",
    };

    emotionImage.src = emotions[emotion] || emotions['neutral'];
}

// Speak Function with Voice
function speak(message, emotion = "neutral") {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US"; // US English voice
    const voices = synth.getVoices();
    utterance.voice = voices.find(v => v.lang === "en-US") || voices[0];

    setEmotion(emotion);  // Change emotion when speaking

    synth.speak(utterance);
}

// Weather API Call using Open-Meteo
async function getWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.7184&longitude=-3.5336&current_weather=true');
        const data = await response.json();
        const temperature = data.current_weather.temperature;
        const weatherDescription = data.current_weather.weathercode;

        // Interpret weather condition
        let weatherMessage = `The current temperature in Exeter is ${temperature}°C.`;
        if (weatherDescription === 0) {
            weatherMessage += " The weather is clear and sunny.";
        } else if (weatherDescription === 1) {
            weatherMessage += " It’s partly cloudy.";
        } else {
            weatherMessage += " The weather is cloudy.";
        }

        speak(weatherMessage, "happy"); // Speak the weather update with happy emotion
    } catch (error) {
        console.error("Weather API error:", error);
        speak("Sorry, I couldn't fetch the weather right now. Please try again later.", "sad");
    }
}

// Commands
function executeCommand(command) {
    let response = "";
    let emotion = "neutral";
    switch (command) {
        case "weather":
            getWeather();
            break;
        case "train":
            response = "Here’s the latest train timetable for Cranbrook. I hope you have a safe journey!";
            emotion = "neutral";
            speak(response, emotion);
            break;
        case "greet":
            response = "Hello there! How can I brighten your day today?";
            emotion = "happy";
            speak(response, emotion);
            break;
        case "motivate":
            response = "You are doing amazing! Remember, every step forward counts.";
            emotion = "happy";
            speak(response, emotion);
            break;
        case "joke":
            response = "Why don’t skeletons fight each other? They don’t have the guts!";
            emotion = "surprised";
            speak(response, emotion);
            break;
        case "music":
            response = "Let’s vibe to some arcade beats. Enjoy the music!";
            emotion = "happy";
            enableAutoplay()
            speak(response, emotion);
            break;
        case "fact":
            response = "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old!";
            emotion = "surprised";
            speak(response, emotion);
            break;
        case "quote":
            response = "Here’s a thought for you: ‘The best way to predict the future is to create it.’";
            emotion = "neutral";
            speak(response, emotion);
            break;
        case "time":
            response = `It's currently ${new Date().toLocaleTimeString()}.`;
            emotion = "neutral";
            speak(response, emotion);
            break;
        case "date":
            response = `Today's date is ${new Date().toLocaleDateString()}.`;
            emotion = "neutral";
            speak(response, emotion);
            break;
        case "autoplay":
            enableAutoplay();
            response = "Autoplay has been turned on for the music!";
            emotion = "happy";
            speak(response, emotion);
            break;
        default:
            response = "Hmm, I don’t know that command yet.";
            emotion = "sad";
            speak(response, emotion);
            break;
    }
}

// Enable autoplay for the music playlist
function enableAutoplay() {
    const spotifyEmbed = document.getElementById('spotify-embed');
    const currentSrc = spotifyEmbed.src;
    const autoplaySrc = currentSrc.includes('autoplay=1') ? currentSrc : currentSrc + "&autoplay=1";
    spotifyEmbed.src = autoplaySrc; // Update iframe with autoplay enabled
}