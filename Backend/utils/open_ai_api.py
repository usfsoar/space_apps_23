import os
import openai
import re
from dotenv import load_dotenv

# Load your API key from an environment variable or secret management service
load_dotenv()
key = os.getenv("OPENAI_API_KEY")
print(f'-----------------API key: {key}')
openai.api_key = key

cmd_list = "display_dots(requests): if the user requests a list of specific dates and years he wants to see moonquakes at you use this function and pass it the list as [{Year:requested_year_number, Day:requested_day_number}}...] then run this function to display the dots.\ndisplay_year_dots(request): this funciton shall be used for only one year\ndisplay_topography(): If the user asks to see the topography of the moon, then we can return him this\naddPointInSpace(lon, lat): the user indicates a latitude and longitude and requests that we place an object there\nrespondToUser(resp): User sends a string that will be used to generate a response from the app. The app will return a string that will be sent to the user\n"

def parse_request(request_string):
    context = "Our app has the following commands available:\n" + cmd_list
    prompt = "\nAn user has just requested: "+request_string+"Return the appropiate command AND what argument should it include, the command shall be in the format: << {command to run} >>\nThe arguments shall be in the form -:- {argument} -:-\nIf our app is not capable of running the command, respond in a natural way that the command is not available."
    res = openai.ChatCompletion.create(model="gpt-4", messages=[{"role":"user", "content":context}, {"role":"user", "content":prompt}])
    response = res.choices[0].message.content
    regex_pattern = r'<< (.+?) >>'
    command_list = re.findall(regex_pattern, response)
    arg_pattern = r'-:- (.+?) -:-'
    arg_list = re.findall(arg_pattern, response)
    print(f'-----------------command_list: {command_list}')
    print(f'-----------------arg_list: {arg_list}')
    return command_list[0], arg_list
# chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])
