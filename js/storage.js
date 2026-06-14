//  Al cargar la pantalla de inicio de sesión (index.html)
window.onload = function() {
    const nombreGuardado = localStorage.getItem("nombre");
    
    // Si el usuario ya se registró antes, lo mandamos directo al dashboard
    if (nombreGuardado) {
        window.location.href = "dashboard.html";
    }
};

//  Capturar el evento de envío del formulario de registro
document.getElementById("formDeSesion").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const pais = document.getElementById("pais").value.trim();

    // Guardar de manera persistente en LocalStorage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    localStorage.setItem("pais", pais);
    
    // Redireccionar al panel principal
    window.location.href = "dashboard.html";
});

