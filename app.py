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


from flask import Flask, render_template
from flask_socketio import SocketIO, emit

class SocketIO_(SocketIO):
    def __call__(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> cabc.Iterable[bytes]:
        """The WSGI server calls the Flask application object as the
        WSGI application. This calls :meth:`wsgi_app`, which can be
        wrapped to apply middleware.
        """
        print(environ, start_response)

app_server = Flask(__name__)
app = SocketIO_(app_server, async_mode='eventlet')  # Usar eventlet

@app_server.route('/')
def home():
    return render_template('homepage.html')

@app_server.route('/receiver')
def receiver():
    return render_template('receiver.html')

@app.on('offer')
def handle_offer(data):
    emit('offer', data, broadcast=True)

@app.on('answer')
def handle_answer(data):
    emit('answer', data, broadcast=True)

@app.on('candidate')
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
