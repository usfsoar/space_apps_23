import os
import openai
import re

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

cmd_list = "display_dots(requests): If the user requests to see all the earthquakes or all the points on a specific year, and date, you should pass as argument these year and day in a list (in case there's many),. this is a list of objects so make sure to use all the days you can. and run this function to display the dots.\ndisplay_topography(): If the user asks to see the topography of the moon, then we can return him this\naddPointInSpace(lon, lat): the user indicates a latitude and longitude and requests that we place an object there\nrespondToUser(resp): User sends a string that will be used to generate a response from the app. The app will return a string that will be sent to the user\n"

def parse_request(request_string):
    context = "Our app has the following commands available:\n" + cmd_list
    prompt = "\nAn user has just requested: "+request_string+"Return the appropiate command AND what argument should it include, the command shall be in the format: << command to run >>\nThe arguments shall be in the form -:- argument -:-\nIf our app is not capable of running the command, respond in a natural way that the command is not available."
    response = openai.ChatCompletion.create(model="gpt-4", messages=[{"role":"user", "content":context}, {"role":"user", "content":prompt}])
    
    regex_pattern = r'<< (.+?) >>'
    command_list = re.findall(regex_pattern, response)
    arg_pattern = r'-:- (.+?) -:-'
    arg_list = re.findall(arg_pattern, response)
    
    return command_list[0], arg_list
# chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])
