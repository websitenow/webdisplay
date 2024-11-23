// let peerConnection = new RTCPeerConnection({
//     iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun1.l.google.com:19302" },
//         { urls: "stun:stun2.l.google.com:19302" },
//         { urls: "stun:stun3.l.google.com:19302" },
//         { urls: "stun:stun4.l.google.com:19302" }
//     ]
// });

// let socket = io('')
// let localStream;
// let remoteStream;
// let offerSended = false;
// let offersObj = {}

// const offerList = document.getElementById("offerslist")


// socket.on('connect', () => {
//     console.log('Conectado ao servidor!');
// });

// socket.on('offerAdded', (data) => {
//     console.log(`Offer added: ${data}`);
// });

// socket.on("offers", (data) => {
//     offersObj = JSON.parse(data)
//     update(offersObj)
// });

// socket.on('disconnect', () => {
//     console.log('Desconectadpo do servidor! \nClosing socket...');
//     socket.close()
// });

// socket.on('answer', (data) => {
//     console.log('Answer Received');
//     addAnswer(data)

//     socket.emit('removesid')
// });

// let update = (obj) => {
//     offerList.innerHTML = "<sub>Offers List</sub>"
//     Object.keys(obj).forEach(key => {
//         if (key != socket.id) {
//             const offerButton = document.createElement('button')
//             offerButton.innerText = key
//             offerButton.addEventListener('click', async () => {
//                 await createAnswer(key)
//             })
//             offerList.appendChild(offerButton)
//         }
//     })
// }

// let init = async () => {
// }

// let start = async () => {
//     if (navigator.mediaDevices.getDisplayMedia) {
//         localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     } else if (navigator.mediaDevices.getUserMedia) {
//         localStream = await navigator.mediaDevices.getUserMedia({ video: true , audio: true});
//     }
//     remoteStream = new MediaStream()
//     document.getElementById('user-1').srcObject = localStream
//     document.getElementById('user-2').srcObject = remoteStream
//     localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//     });

//     peerConnection.ontrack = (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track);
//         });
//     };
// }

// let createOffer = async () => {
//     peerConnection.onicecandidate = async (event) => {
//         //Event that fires off when a new offer ICE candidate is created
//         if (event.candidate) {
//             const localOffer = JSON.stringify(peerConnection.localDescription)
//             if (localOffer && !offerSended) {
//                 offerSended = true
//                 socket.emit('offer', localOffer)
//             }
//             document.getElementById('offer-sdp').value = localOffer
//         }
//     };

//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
// }

// let createAnswer = async (sid) => {

//     if (sid) {
//         let stroffer = offersObj[sid]
//         let offer = JSON.parse(stroffer)
//         document.getElementById('offer-sdp').value = stroffer

//         peerConnection.onicecandidate = async (event) => {
//             //Event that fires off when a new answer ICE candidate is created
//             if (event.candidate) {
//                 console.log('Adding answer candidate...:', event.candidate)
//                 document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)
//             }
//         };

//         await peerConnection.setRemoteDescription(offer);

//         let answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", sid, JSON.stringify(answer))
//     }
// }

// let addAnswer = async (answer) => {
//     console.log('Add answer triggerd')
//     if (!answer) {
//         answer = document.getElementById("answer-sdp").value
//     }
//     let answerParsed = JSON.parse(answer)
//     if (!peerConnection.currentRemoteDescription) {
//         peerConnection.setRemoteDescription(answerParsed);
//         console.log("Remote Description OK!")
//     } else {
//         console.log("Remote Description FAIL!")

//     }
// }

// document.getElementById('create-offer').addEventListener('click', createOffer)
// document.getElementById('create-answer').addEventListener('click', createAnswer)
// document.getElementById('add-answer').addEventListener('click', addAnswer)

// init()






let peerConnection = new RTCPeerConnection({
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" }
    ]
});

let socket = io('https://rendersocketio-xsk6.onrender.com')
let localStream;
let remoteStream;
let offerSended = false;
let offersObj = {}

const offerList = document.getElementById("offerslist")


socket.on('connect', () => {
    console.log('Conectado ao servidor!');
});

socket.on('offerAdded', (data) => {
    console.log(`Offer added: ${data}`);
});

socket.on("offers", (data) => {
    offersObj = JSON.parse(data)
    update(offersObj)
});

socket.on('disconnect', () => {
    console.log('Desconectadpo do servidor! \nClosing socket...');
    socket.close()
});

socket.on('answer', (data) => {
    console.log('Answer Received');
    addAnswer(data)

    socket.emit('removesid')
});

socket.on('iceCandidate', (data) => {
    addIceCandidate(JSON.parse(data))
});


let update = (obj) => {
    offerList.innerHTML = "<sub>Offers List</sub>"
    Object.keys(obj).forEach(key => {
        if (key != socket.id) {
            const offerButton = document.createElement('button')
            offerButton.innerText = key
            offerButton.addEventListener('click', async () => {
                await createAnswer(key)
            })
            offerList.appendChild(offerButton)
        }
    })
}


let start = async () => {
    localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
    remoteStream = new MediaStream()
    document.getElementById('user-1').srcObject = localStream
    document.getElementById('user-2').srcObject = remoteStream
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };
}

let createOffer = async () => {
    peerConnection.onicecandidate = async (event) => {
        //Event that fires off when a new offer ICE candidate is created
        if (event.candidate) {
            const localOffer = JSON.stringify(peerConnection.localDescription)
            if (localOffer && !offerSended) {
                offerSended = true
                socket.emit('offer', localOffer)
            }
            document.getElementById('offer-sdp').value = localOffer
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
}

let createAnswer = async (sid) => {

    if (sid) {
        let stroffer = offersObj[sid]
        let offer = JSON.parse(stroffer)
        document.getElementById('offer-sdp').value = stroffer

        peerConnection.onicecandidate = async (event) => {
            //Event that fires off when a new answer ICE candidate is created
            if (event.candidate) {
                socket.emit("ice-candidate", JSON.stringify(event.candidate))
                document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)
            }
        };

        await peerConnection.setRemoteDescription(offer);

        let answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", sid, JSON.stringify(answer))
    }
}

let addIceCandidate = async (iceObj) => {
    if (peerConnection) {
        peerConnection.addIceCandidate(iceObj)
        console.log("ICE ADD!");
        
    }
}

let addAnswer = async (answer) => {
    console.log('Add answer triggerd')
    if (!answer) {
        answer = document.getElementById("answer-sdp").value
    }
    let answerParsed = JSON.parse(answer)
    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answerParsed);
        console.log("Remote Description OK!")
    } else {
        console.log("Remote Description FAIL!")

    }
}

document.getElementById('create-offer').addEventListener('click', createOffer)
document.getElementById('create-answer').addEventListener('click', createAnswer)
document.getElementById('add-answer').addEventListener('click', addAnswer)
