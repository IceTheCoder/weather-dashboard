async function handleSubmit(event) {
  event.preventDefault();

  const lon = document.getElementById("longitude").value;
  const lat = document.getElementById("latitude").value;

  try {
    const response = await fetch(`.netlify/functions/weather?lat=${lat}&lon=${lon}`);
    if (!response.ok) throw new Error("Network response was not ok");
    console.log(response);

    const weatherData = await response.json();
    alert(`City: ${weatherData.name}
      \nCountry: ${weatherData.sys.country}
      \nTemperature: ${weatherData.main.temp}°C
      \nDescription: ${weatherData.weather[0].description}`);  
  } 
  catch (error) {
    console.error("Error: ", error);
    alert("Failed to fetch weather data.")
  }
}