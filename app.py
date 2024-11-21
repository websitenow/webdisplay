# from flask import Flask, render_template
# from flask_socketio import SocketIO, emit

# server_app = Flask(__name__)
# socketio = SocketIO(server_app)  # Corrigido: Use 'socketio' para o objeto SocketIO

# @server_app.route('/')
# def home():
#     return render_template('homepage.html')

# @server_app.route('/receiver')
# def receiver():
#     return render_template('receiver.html')

# @socketio.on('offer')  # Corrigido: Use 'socketio' para eventos
# def handle_offer(data):
#     emit('offer', data, broadcast=True)

# @socketio.on('answer')  # Corrigido: Use 'socketio' para eventos
# def handle_answer(data):
#     emit('answer', data, broadcast=True)

# @socketio.on('candidate')  # Corrigido: Use 'socketio' para eventos
# def handle_candidate(data):
#     emit('candidate', data, broadcast=True)

# if __name__ == '__main__':
#     from gevent.pywsgi import WSGIServer
#     from geventwebsocket.handler import WebSocketHandler

#     http_server = WSGIServer(
#         ('0.0.0.0', 8080),
#         server_app,  # Corrigido: Passe 'server_app' para WSGIServer
#         handler_class=WebSocketHandler,
#         keyfile='server.key',
#         certfile='server.crt'
#     )
#     http_server.serve_forever()

"""
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')  # Usar eventlet

@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/receiver')
def receiver():
    return render_template('receiver.html')

@socketio.on('offer')
def handle_offer(data):
    emit('offer', data, broadcast=True)

@socketio.on('answer')
def handle_answer(data):
    emit('answer', data, broadcast=True)

@socketio.on('candidate')
def handle_candidate(data):
    emit('candidate', data, broadcast=True)

if __name__ == '__main__':
    import eventlet
    import eventlet.wsgi
    from eventlet.green import ssl

    # Carregar chave e certificado
    ssl_options = {
        'keyfile': 'server.key',
        'certfile': 'server.crt'
    }

    # Configurar e iniciar o servidor usando eventlet com suporte a SSL
    eventlet.wsgi.server(eventlet.wrap_ssl(eventlet.listen(('0.0.0.0', 5000)), **ssl_options), app)
"""


from flask import Flask, render_template, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
# from threading import Thread

class SocketIOFlask: 
    def __init__(self, name): 
        self.app = Flask(name) 
        CORS(self.app)
        self.socketIO = SocketIO(self.app, async_mode='eventlet', cors_allowed_origins='*') 
        # self.jsonapp = "" 
        # self.server_thread = Thread(target=self.run, args=('0.0.0.0',)) 
        # self.server_thread_started = False 
        
    def __call__(self, environ, start_response): 
        # self.jsonapp = str(environ) 
        # if not self.server_thread_started: 
        #     self.server_thread.start() 
        #     self.server_thread_started = True 
        call_response = self.app.__call__(environ, start_response) 
        print(call_response)
        return call_response
    
    def run(self, host, *a, **kw): 
        print("RUN SOCKET") 
        self.socketIO.run(self.app, host=host, *a, **kw)
    
app = SocketIOFlask(__name__)

@app.app.route('/')
def home():
    return render_template('homepage.html')

@app.app.route('/receiver')
def receiver():
    return render_template('receiver.html')

@app.socketIO.on('offer')
def handle_offer(data):
    emit('offer', data, broadcast=True)

@app.socketIO.on('answer')
def handle_answer(data):
    emit('answer', data, broadcast=True)

@app.socketIO.on('candidate')
def handle_candidate(data):
    emit('candidate', data, broadcast=True)

app.run()

if __name__ == '__main__':
    import eventlet
    import eventlet.wsgi
    from eventlet.green import ssl

    # Carregar chave e certificado
    ssl_options = {
        'keyfile': 'server.key',
        'certfile': 'server.crt'
    }

    # Configurar e iniciar o servidor usando eventlet com suporte a SSL
    eventlet.wsgi.server(eventlet.wrap_ssl(eventlet.listen(('0.0.0.0', 5000)), **ssl_options), app)
