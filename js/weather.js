async function obtenerClima(latitud, longitud) {

    try {

        console.log("===== CLIMA =====");
        console.log("Entrando a obtenerClima");
        console.log("Latitud:", latitud);
        console.log("Longitud:", longitud);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error al consultar Open-Meteo");
        }

        const datos = await respuesta.json();

        console.log(datos);

        document.getElementById("temperatura").textContent =
            datos.current.temperature_2m + " °C";

        document.getElementById("humedad").textContent =
            datos.current.relative_humidity_2m + "%";

        document.getElementById("viento").textContent =
            datos.current.wind_speed_10m + " km/h";

        document.getElementById("estado").textContent =
            obtenerEstado(datos.current.weather_code);

    } catch (error) {

        console.error("Error en el clima:", error);

        document.getElementById("temperatura").textContent = "--";
        document.getElementById("humedad").textContent = "--";
        document.getElementById("viento").textContent = "--";
        document.getElementById("estado").textContent = "--";

    }

}

function obtenerEstado(codigo) {

    const estados = {
        0: "Despejado",
        1: "Mayormente despejado",
        2: "Parcialmente nublado",
        3: "Nublado",

        45: "Niebla",
        48: "Niebla con escarcha",

        51: "Llovizna ligera",
        53: "Llovizna moderada",
        55: "Llovizna intensa",

        61: "Lluvia ligera",
        63: "Lluvia moderada",
        65: "Lluvia fuerte",

        71: "Nevada ligera",
        73: "Nevada moderada",
        75: "Nevada intensa",

        80: "Chubascos ligeros",
        81: "Chubascos moderados",
        82: "Chubascos fuertes",

        95: "Tormenta",
        96: "Tormenta con granizo",
        99: "Tormenta fuerte con granizo"
    };

    return estados[codigo] || "No disponible";

}