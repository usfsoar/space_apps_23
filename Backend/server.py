from config.setup import app, socketio
from flask import send_from_directory
from flask_socketio import SocketIO, emit, join_room


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/admin')
def admin():
    # Return the admin page html file
    return send_from_directory(app.static_folder, 'admin.html')

@socketio.on('connect')
def handle_connect():
    emit("emit_identify")

@socketio.on('identify')
def handle_identify(data):
    if data == "APP":
        join_room("app_room")
    elif data == "MAP":
        join_room("map_room")

@socketio.on('request_update_data')
def handle_update_data(data):
    # Here, you can process the JSON data as you like.
    print(data)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
