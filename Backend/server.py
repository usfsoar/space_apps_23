from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "SocketIO Server is Running"

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
