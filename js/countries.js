async function obtenerInfoPais(nombrePais) {
    try {
        console.log("CONSULTANDO API PARA:", nombrePais);

        // INFORMACIÓN GENERAL
        const respuesta = await fetch(
            "https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode"
        );

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const resultado = await respuesta.json();

        const pais = resultado.data.find(
            p => p.name.toLowerCase() === nombrePais.toLowerCase()
        );

        if (!pais) {
            throw new Error("País no encontrado");
        }

        // CAPITAL
        const respCapital = await fetch(
            "https://countriesnow.space/api/v0.1/countries/capital"
        );

        const datosCapital = await respCapital.json();

        const infoCapital = datosCapital.data.find(
            p => p.name.toLowerCase() === nombrePais.toLowerCase()
        );

        const capital = infoCapital ? infoCapital.capital : "No disponible";

        // POBLACIÓN
        const respPoblacion = await fetch(
            "https://countriesnow.space/api/v0.1/countries/population"
        );

        const datosPoblacion = await respPoblacion.json();

        const infoPoblacion = datosPoblacion.data.find(
            p => p.country.toLowerCase() === nombrePais.toLowerCase()
        );

        const poblacion = infoPoblacion
            ? infoPoblacion.populationCounts.at(-1).value.toLocaleString()
            : "No disponible";

        // GUARDAR MONEDA
        localStorage.setItem("monedaDestino", pais.currency);

        // MOSTRAR INFORMACIÓN
        document.getElementById("detallesDelPais").innerHTML = `
            <strong>País:</strong> ${pais.name}
            <button onclick="agregarFavorito('${pais.name}','${pais.flag}')">
                ⭐ Añadir a Favoritos
            </button><br>

            <img src="${pais.flag}" width="120"><br>

            <strong>Capital:</strong> ${capital}<br>
            <strong>Moneda:</strong> ${pais.currency}<br>
            <strong>Código telefónico:</strong> ${pais.dialCode}<br>
            <strong>Población:</strong> ${poblacion}
        `;

        // OBTENER COORDENADAS DE LA CAPITAL
        const geoResp = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(capital + " " + pais.name)}`
        );

        const geoDatos = await geoResp.json();

        console.log("GeoDatos:", geoDatos);

        if (geoDatos.length > 0) {

            const lat = parseFloat(geoDatos[0].lat);
            const lon = parseFloat(geoDatos[0].lon);

            console.log("Latitud:", lat);
            console.log("Longitud:", lon);

            // CLIMA
            if (typeof obtenerClima === "function") {
                await obtenerClima(lat, lon);
            }

            // ATRACCIONES
            if (typeof obtenerAtracciones === "function") {
                obtenerAtracciones(lat, lon, pais.name);
            }

        } else {

            console.log("No se encontraron coordenadas.");

        }

    } catch (error) {

        console.error("ERROR:", error);

        document.getElementById("detallesDelPais").textContent =
            "Error al consultar el país.";

    }
}