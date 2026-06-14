async function obtenerAtracciones(lat, lon, pais) {

    console.log("PAÍS RECIBIDO EN TOURISM:", `"${pais}"`);

    if (!pais) return;

    // Usamos función global de app.js para estandarizar el nombre del país
    if (typeof normalizarPais === "function") {
        pais = normalizarPais(pais);
    }

    // Convertimos a minúsculas y limpiamos espacios para comparar de forma segura
    pais = pais.toLowerCase().trim();
    console.log("PAÍS NORMALIZADO EN TOURISM:", `"${pais}"`);

    let datos = { features: [] };
    let esPaisSimulado = false;

    //  FRANCIA (Detecta si viene de la API como "france" o si el usuario escribió "francia")
    if (pais === "francia" || pais === "france") {
        esPaisSimulado = true;
        datos.features = [
            { 
                properties: { 
                    name: "Torre Eiffel", 
                    kinds: "Monumento", 
                    description: "Icónica estructura de hierro ubicada en el Campo de Marte junto al río Sena.",
                    image: "assets/images/France/The_Eiffel_Tower_by_Night.jpg"
                } 
            },
            { 
                properties: { 
                    name: "Museo del Louvre", 
                    kinds: "Museo", 
                    description: "El museo de arte más grande del mundo, hogar de la famosa Mona Lisa.",
                    image: "assets/images/France/museo-louvre-1072536.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Arco del Triunfo", 
                    kinds: "Monumento", 
                    description: "Famoso monumento que honra a los caídos en la Revolución Francesa y Guerras Napoleónicas.",
                    image: "assets/images/France/800px-Arc_Triomphe.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Palacio de Versalles", 
                    kinds: "Palacio / Histórico", 
                    description: "Antigua residencia real con majestuosos jardines y la Galería de los Espejos.",
                    image: "assets/images/France/Versalles-6.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Mont Saint-Michel", 
                    kinds: "Histórico / Isla", 
                    description: "Espectacular pueblo medieval situado sobre una pequeña isla rocosa estuárica.",
                    image: "assets/images/France/mont-saint-michel-en-crepúsculo-en-la-oscuridad-normandía-francia-59634362.jpg" 
                } 
            }
        ];
    }

    //  COLOMBIA
    else if (pais === "colombia" || pais === "republica de colombia") {
        esPaisSimulado = true;
        datos.features = [
            { 
                properties: { 
                    name: "Ciudad Amurallada de Cartagena", 
                    kinds: "Histórico", 
                    description: "Hermoso centro histórico colonial protegido por murallas de piedra frente al mar.",
                    image: "assets/images/Colombia/1-Cartagena-y-Baru-en-helicoptero-con-Pasaporte-Express.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Parque Tayrona", 
                    kinds: "Naturaleza / Playa", 
                    description: "Santuario natural donde la selva tropical se une con el oleaje del Mar Caribe.",
                    image: "assets/images/Colombia/pnn-tayrona.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Monserrate (Bogotá)", 
                    kinds: "Montaña / Mirador", 
                    description: "Cerro icónico que ofrece la mejor vista panorámica y religiosa de la capital.",
                    image: "assets/images/Colombia/monserrate-navidad.jpeg" 
                } 
            },
            { 
                properties: { 
                    name: "Castillo San Felipe", 
                    kinds: "Fortaleza", 
                    description: "La fortificación militar española más grande construida en América.",
                    image: "assets/images/Colombia/Castillo_De_San_Felipe.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Caño Cristales", 
                    kinds: "Río / Naturaleza", 
                    description: "Conocido como el río de los siete colores debido a sus plantas acuáticas endémicas.",
                    image: "assets/images/Colombia/CAÑO_CRISTALES,_EL_RÍO_DE_COLORES.jpg" 
                } 
            }
        ];
    }

    //  ESTADOS UNIDOS 
    else if (pais === "united states" || pais === "usa" || pais === "eeuu" || pais === "estados unidos" || pais === "united states of america") {
        esPaisSimulado = true;
        datos.features = [
            { 
                properties: { 
                    name: "Estatua de la Libertad", 
                    kinds: "Monumento", 
                    description: "Famoso monumento de Nueva York que simboliza la libertad y la bienvenida mundial.",
                    image: "assets/images/USA/Estatua_de_La_Libertad.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Central Park", 
                    kinds: "Parque urbano", 
                    description: "Inmenso pulmón verde urbano situado en pleno corazón de Manhattan.",
                    image: "assets/images/USA/photo-1602087564121-ecda2f6c7ee9.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Times Square", 
                    kinds: "Urbano / Entretenimiento", 
                    description: "Intersección famosa llena de carteles luminosos, teatros de Broadway y luces digitales.",
                    image: "assets/images/USA/Times_Square_New_York_At_Dusk.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Gran Cañón", 
                    kinds: "Naturaleza / Parque Nacional", 
                    description: "Impresionante desfiladero natural tallado durante millones de años por el río Colorado.",
                    image: "assets/images/USA/el-gran-cañón-magnífica-vista-vertical-del-río-colorado-que-recorre-las-profundidades-con-sol-de-última-hora-la-tarde-241065958.jpg" 
                } 
            },
            { 
                properties: { 
                    name: "Golden Gate Bridge", 
                    kinds: "Puente / Estructura", 
                    description: "El icónico puente colgante de color naranja que cruza la bahía de San Francisco.",
                    image: "assets/images/USA/Golden-Gate-Bridge-San-Francisco.jpg" 
                } 
            }
        ];
    }

    //  CASO DEFAULT (Si no coincide con ninguno de los 3 países simulados)
    if (!esPaisSimulado) {
        datos.features = [
            { 
                properties: { 
                    name: "No hay datos para este país", 
                    kinds: "Desconocido", 
                    description: "Por favor introduce un país de la lista de simulación activa. (USA, Francia, Colombia)",
                    image: "img/no-data.jpg" 
                } 
            }
        ];
    }

    function renderizarAtraccionesFavoritas() {
    const contenedor = document.getElementById("detallesDeAtracciones");
    if (!contenedor) return; // Si no estamos en la página correcta, no hacer nada

    const atraccionesFav = JSON.parse(localStorage.getItem("atraccionesFav")) || [];
    
    // Limpiamos el contenedor antes de renderizar
    contenedor.innerHTML = "";

    if (atraccionesFav.length === 0) {
        contenedor.innerHTML = "<li>No tienes atracciones favoritas aún.</li>";
        return;
    }

    // Creamos la lista de elementos
    atraccionesFav.forEach(nombre => {
        const li = document.createElement("li");
        li.textContent = `⭐ ${nombre}`;
        contenedor.appendChild(li);
    });
}

    // LIMPIAR LISTA EN INTERFAZ
    const lista = document.getElementById("detallesDeAtracciones");
    if (!lista) return;
    lista.innerHTML = "";

    // Traer favoritos actuales para comprobar estados visuales (Clase estrella amarilla)
    const atraccionesFav = JSON.parse(localStorage.getItem("atraccionesFav")) || [];

    // MOSTRAR RESULTADOS
    datos.features.forEach(lugar => {
        const li = document.createElement("li");
        li.className = "tarjeta-atraccion"; 

        li.innerHTML = `
            <div class="atraccion-contenido">
                <img src="${lugar.properties.image}" alt="${lugar.properties.name}" class="atraccion-imagen" onerror="this.src='https://placehold.co/100x100?text=Sin+Foto'">
                <div class="atraccion-detalles">
                    <div class="atraccion-encabezado">
                        <span class="atraccion-nombre">${lugar.properties.name}</span>
                        <span class="atraccion-categoria">${lugar.properties.kinds}</span>
                    </div>
                    <p class="atraccion-descripcion">${lugar.properties.description}</p>
                </div>
            </div>
        `;

        // Solo creamos el botón si realmente es una atracción válida
        if (esPaisSimulado) {
            const btn = document.createElement("button");
            btn.textContent = "⭐";
            btn.className = "btn-favorito-atraccion";
            
            // Si ya está guardado en favoritos, le ponemos color amarillo de entrada
            if (atraccionesFav.includes(lugar.properties.name)) {
                btn.classList.add("activo");
            }

            // Evento Click asignado correctamente pasando el nodo del botón actual
            btn.onclick = (e) => agregarAtraccionFavorita(lugar.properties.name, e.currentTarget);
            li.appendChild(btn);
        }

        lista.appendChild(li);
    });
}

// GESTOR DE FAVORITOS (Añadir / Quitar de LocalStorage + Cambio Visual Activo)
function agregarAtraccionFavorita(nombreAtraccion, botonPresionado) {
    let atraccionesFav = JSON.parse(localStorage.getItem("atraccionesFav")) || [];
    
    const index = atraccionesFav.indexOf(nombreAtraccion);
    
    if (index === -1) {
        //  Guardar
        atraccionesFav.push(nombreAtraccion);
        localStorage.setItem("atraccionesFav", JSON.stringify(atraccionesFav));
        if (botonPresionado) botonPresionado.classList.add("activo");
        alert(`¡${nombreAtraccion} se guardó en tus atracciones favoritas!`);
    } else {
        //  Quitar
        atraccionesFav.splice(index, 1);
        localStorage.setItem("atraccionesFav", JSON.stringify(atraccionesFav));
        if (botonPresionado) botonPresionado.classList.remove("activo");
        alert(`¡${nombreAtraccion} se quitó de tus atracciones favoritas!`);
    }
    
    // Sincronizar contadores del dashboard superiores inmediatamente
    if (typeof actualizarResumen === "function") {
        actualizarResumen();
    }
}