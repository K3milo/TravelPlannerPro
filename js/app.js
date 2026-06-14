//  Normalizar país ingresado para la simulación o respuestas de la API
function normalizarPais(pais) {
    if (!pais) return "";
    
    const mapa = {
        "usa": "United States",
        "united states": "United States",
        "estados unidos": "United States",
        "eeuu": "United States",
        "u.s.a": "United States",
        "colombia": "Colombia",
        "republica de colombia": "Colombia",
        "francia": "France",
        "france": "France",
        "spain": "Spain",
        "españa": "Spain"
    };

    const clave = pais.toLowerCase().trim();
    return mapa[clave] || pais;
}

//  Función Global para actualizar contadores y renderizar listas en la interfaz
function actualizarResumen() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const atraccionesFav = JSON.parse(localStorage.getItem("atraccionesFav")) || [];

    // Actualización de los 4 contadores de las tarjetas superiores
    if (document.getElementById("totalBusquedas")) {
        document.getElementById("totalBusquedas").textContent = historial.length;
    }
    if (document.getElementById("totalDestinos")) {
        document.getElementById("totalDestinos").textContent = favoritos.length;
    }
    if (document.getElementById("totalAtracciones")) {
        document.getElementById("totalAtracciones").textContent = atraccionesFav.length;
    }
    if (document.getElementById("totalPaises")) {
        const paisesUnicos = [...new Set(historial.map(item => item.pais))];
        document.getElementById("totalPaises").textContent = paisesUnicos.length;
    }

    //  Renderizar Historial de Búsquedas (De arriba a abajo)
    const listaHistorial = document.getElementById("listahistorial");
    if (listaHistorial) {
        listaHistorial.innerHTML = "";
        historial.forEach(item => {
            const li = document.createElement("li");
            const horaTexto = item.hora ? ` a las ${item.hora}` : "";
            li.textContent = `${item.fecha}${horaTexto} - ${item.pais}`;
            listaHistorial.appendChild(li);
        });
    }

    //  Renderizar Destinos Favoritos con Banderas
    const listaFavoritos = document.getElementById("listafavoritos");
    if (listaFavoritos) {
        listaFavoritos.innerHTML = "";
        favoritos.forEach(paisObj => {
            const div = document.createElement("div");
            div.className = "tarjeta-favorito"; 

            if (paisObj.bandera) {
                const img = document.createElement("img");
                img.src = paisObj.bandera;
                img.alt = `Bandera de ${paisObj.nombre}`;
                img.className = "minibandera";
                div.appendChild(img);
            }

            const spanNombre = document.createElement("span");
            spanNombre.textContent = paisObj.nombre;
            div.appendChild(spanNombre);

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "❌";
            btnEliminar.style.marginLeft = "10px";
            btnEliminar.style.cursor = "pointer";
            btnEliminar.onclick = () => eliminarFavorito(paisObj.nombre);

            div.appendChild(btnEliminar);
            listaFavoritos.appendChild(div);
        });
    }
}

//  Agregar País Completo a Favoritos
function agregarFavorito(nombrePais, urlBandera) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const existe = favoritos.some(fav => fav.nombre === nombrePais);
    
    if (!existe) {
        favoritos.push({ nombre: nombrePais, bandera: urlBandera });
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert(`¡${nombrePais} se ha añadido a tus destinos favoritos!`);
        actualizarResumen();
    } else {
        alert(`${nombrePais} ya está en tus favoritos.`);
    }
}

//  Eliminar País de Favoritos
function eliminarFavorito(nombrePais) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(fav => fav.nombre !== nombrePais);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    actualizarResumen();
}

//  SOLUCIÓN MÓVIL: Agrupamos la carga inicial bajo un único evento seguro de inicialización
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Ejecutar verificación de sesión y estados iniciales
    const nombre = localStorage.getItem("nombre");

    // SEGURO DE INICIO: Si no hay registro en LocalStorage, redirige
    if (!nombre) {
        window.location.href = "index.html";
        return; 
    }

    // Mostrar saludo personalizado
    const bienvenidaElement = document.getElementById("bienvenida");
    if (bienvenidaElement) {
        bienvenidaElement.textContent = `Bienvenido, ${nombre}`;
    }

    // Inicializar estructuras de datos limpias si están vacías en el teléfono
    if (!localStorage.getItem("historial")) localStorage.setItem("historial", JSON.stringify([]));
    if (!localStorage.getItem("favoritos")) localStorage.setItem("favoritos", JSON.stringify([]));
    if (!localStorage.getItem("atraccionesFav")) localStorage.setItem("atraccionesFav", JSON.stringify([]));

    // Persistencia de Modo Oscuro al arrancar
    const btnModoOscuroInit = document.getElementById("btnModoOscuro");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (btnModoOscuroInit) btnModoOscuroInit.textContent = "☀️ Modo Claro";
    } else {
        document.body.classList.remove("dark-mode");
        if (btnModoOscuroInit) btnModoOscuroInit.textContent = "🌙 Modo Oscuro";
    }

    // Renderizado inicial del panel de control
    actualizarResumen();

    // 2. Control Seguro de la Pantalla de Carga (Loader)
    const loader = document.getElementById("pantalla-carga");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("oculto");
        }, 1200); // Ajustado a 1.2s para una respuesta de interfaz más ágil en celular
    }
});

//  Escuchador del botón para Alternar Modo Oscuro
const btnModoOscuro = document.getElementById("btnModoOscuro");
if (btnModoOscuro) {
    btnModoOscuro.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            this.textContent = "☀️ Modo Claro";
        } else {
            localStorage.setItem("theme", "light");
            this.textContent = "🌙 Modo Oscuro";
        }
    });
}

//  Evento del botón Buscar País
const botonBuscar = document.getElementById("botonBuscar");
if (botonBuscar) {
    botonBuscar.addEventListener("click", function() {
        const buscadorInput = document.getElementById("buscadorpais");
        if (!buscadorInput) return;

        const paisInput = buscadorInput.value.trim();
        if (!paisInput) return;

        // Limpieza y estandarización del String antes de guardarlo o enviarlo a la API
        const pais = normalizarPais(paisInput);

        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        
        // Capturar la fecha y la hora exacta de la búsqueda
        const ahora = new Date();
        const fecha = ahora.toLocaleDateString();
        const hora = ahora.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: true 
        });

        // Colocar el país al inicio de la lista
        historial.unshift({ fecha, hora, pais });
        localStorage.setItem("historial", JSON.stringify(historial));

        // Consultar APIs externas y locales (Verificando que las funciones existan)
        if (typeof obtenerInfoPais === "function") {
            obtenerInfoPais(pais);
        }
        
        actualizarResumen();
    });
}

//  Cerrar sesión
const btnCerrarSesion = document.getElementById("cerrarSesion");
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function() {
        const temaActual = localStorage.getItem("theme");
        
        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("pais");

        if (temaActual) {
            localStorage.setItem("theme", temaActual); 
        }
        
        window.location.href = "index.html";
    });
}