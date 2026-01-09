document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stops page reload

    const mensajeExito = document.getElementById('message');
    
    // Show the message
    mensajeExito.style.display = 'block';

    // Clean the form
    this.reset();

    // The message disappears after 5 seconds
    setTimeout(() => {
        mensajeExito.style.display = 'none';
    }, 5000);
});