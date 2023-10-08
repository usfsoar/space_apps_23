from config.setup import app, socketio
from utils import img_processor, open_ai_api
import base64

@socketio.on('user_request')
def user_request(request_str):
    command, args = open_ai_api.parse_request(request_str)
    #switch case for which command to run, if the command has arguments, then spread them out
    if command == "display_dots(requests)":
        display_dots(args)
    elif command == "display_topography()":
        display_topography()
    elif command == "respondToUser(resp)":
        respondToUser(args[0])
    else:
        socketio.emit('UserResponse', "Command not available")
    
    
@socketio.on('year_request')
def year_request(year):
    texture, bump = img_processor.process_year_request(year)
    socketio.emit('ChangeMap', {
        'texture': f"data:image/jpeg;base64,{texture}",
        'bump': f"data:image/jpeg;base64,{bump}"
    })
def display_dots(requests):
    texture, bump = img_processor.process_quake_requests(requests)
    
    socketio.emit('ChangeTexture', {
        'texture': f"data:image/jpeg;base64,{texture}",
        'bump': f"data:image/jpeg;base64,{bump}"
    })
def display_topography():
    with open("moon_topography.jpg", "rb") as image_file:
        texture = base64.b64encode(image_file.read()).decode('utf-8')
    with open("moon_bump.jpg", "rb") as image_file:
        bump = base64.b64encode(image_file.read()).decode('utf-8')
    socketio.emit('ChangeTexture', {
        'texture': f"data:image/jpeg;base64,{texture}",
        'bump': f"data:image/jpeg;base64,{bump}"
    })

def respondToUser(resp):
    socketio.emit('UserResponse', resp)

def addPointInSpace(lat, lon):
    color = 'blue'
    img_processor.plot_quakes([(lat, lon)], color)
    
