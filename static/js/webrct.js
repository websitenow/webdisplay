const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Conectado ao servidor WebSocket');
};

ws.onmessage = event => {
    console.log('Mensagem recebida:', event.data);
};

ws.onclose = () => {
    console.log('Conexão encerrada');
};

ws.onerror = error => {
    console.error('Erro:', error);
};
