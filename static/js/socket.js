document.addEventListener('DOMContentLoaded', () => {
    const socket = io(window.location.origin);

    socket.on('connect', () => {
        console.log('Conectado ao servidor WebSocket');
        socket.send('Olá, servidor!');

        // Exemplo de envio de dados customizados
        socket.emit('custom_event', { data: 'Alguns dados' });
    });

    socket.on('message', message => {
        console.log('Mensagem recebida do servidor:', message);

        // Processar a mensagem recebida
        console.log(message);
    });

    socket.on('response', data => {
        console.log('Resposta do servidor:', data);
    });

    socket.on('disconnect', () => {
        console.log('Desconectado do servidor WebSocket');
        socket.close()
    });
});
