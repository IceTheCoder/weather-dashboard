import 'dotenv/config';

// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (request, context) => {
  try {
    const url = new URL(request.url)
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    if (!lat || !lon) {
      return new Response('Latitude and longitutde are required.', { status: 400 });
    }

    console.log(lat);
    console.log(lon);

    console.log("Hello, world!");

    const apiKey = process.env.API_KEY;

    // Fetch weather data using lat and lon (assuming you're making a request to an API, e.g., OpenWeatherMap)
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    return new Response(JSON.stringify(weatherData), {
      headers: { 'Content-Type': 'application/json'},
    });

  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    })
  }
};
