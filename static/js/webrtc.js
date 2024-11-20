const startCaptureButton = document.getElementById('startCapture');
const startMiniatureButton = document.getElementById('startMiniature');
const stopCapture = document.getElementById('stopCapture');
const videoElement = document.getElementById('screenVideo');
let stream;

async function startCapture() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: 'always'
            },
            audio: true
        });
        videoElement.srcObject = stream;
    } catch (err) {
        console.error('Erro ao capturar a tela:', err);
    }
}

stopCapture.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
        console.log('Transmissão desligada');
        stream = null
    }
})

startCaptureButton.addEventListener('click', () => {
    startCapture();
});

startMiniatureButton.addEventListener('click', async () => {
    try {
        // Verifica se o navegador suporta Picture-in-Picture 
        if (!document.pictureInPictureEnabled) {
            console.log('Picture-in-Picture não é suportado por este navegador.'); return;
        }
        // Sai do Picture-in-Picture, se já estiver ativado 

        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            // Entra no modo Picture-in-Picture 
            await videoElement.requestPictureInPicture();
        }
    } catch (error) {
        console.error('Erro ao tentar ativar/desativar Picture-in-Picture:', error);
    }
});