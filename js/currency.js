async function convertirMoneda() {
	const cantidad = Number(document.getElementById("cantidad").value);
	const origen = document.getElementById("monedaOrigen").value;
	const destino = localStorage.getItem("monedaDestino");

	if (!cantidad || !destino) {
		document.getElementById("resultadoConversion").textContent = "Introduce una cantidad y busca un país destino primero.";
		return;
	}

	if (origen === destino) {
		document.getElementById("resultadoConversion").innerHTML = `<strong>${cantidad} ${origen}</strong> = ${cantidad} ${destino}`;
		return;
	}

	try {
		let tasa;

		// CONTROL SIMULADO SI EL ORIGEN ES COP
		if (origen === "COP") {
			const tasasDesdeCOP = {
				"USD": 0.00025,
				"EUR": 0.00023,
				"GBP": 0.00019,
				"COP": 1
			};
			tasa = tasasDesdeCOP[destino] || 0.00025;
		}
		// CONTROL SIMULADO SI EL DESTINO ES COP (ej: de USD a Colombia)
		else if (destino === "COP") {
			const tasasHaciaCOP = {
				"USD": 4000,
				"EUR": 4300,
				"GBP": 5100
			};
			tasa = tasasHaciaCOP[origen] || 4000;
		}
		// CASO STANDARD: Consumir API Real de Frankfurter para USD, EUR, GBP
		else {
			const respuesta = await fetch(
				`https://api.frankfurter.dev/v1/latest?from=${origen}&to=${destino}`
			);
			if (!respuesta.ok) throw new Error("Moneda no soportada por la API externa.");
			const datos = await respuesta.json();
			tasa = datos.rates[destino];
		}

		const valorConvertido = cantidad * tasa;
		const resultadoFormateado = destino === "COP" ? valorConvertido.toFixed(2) : valorConvertido.toFixed(4);

		document.getElementById("resultadoConversion").innerHTML = `<strong>${cantidad.toLocaleString()} ${origen}</strong> = ${Number(resultadoFormateado).toLocaleString()} ${destino}`;
	} catch (error) {
		document.getElementById("resultadoConversion").textContent = "Error al convertir la moneda.";
		console.error(error);
	}
}

// Asignar el evento al botón correcto
const btn = document.getElementById("btnConvertir");
if (btn) btn.addEventListener("click", convertirMoneda);