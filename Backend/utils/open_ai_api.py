import os
import openai
import re

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

cmd_list = "img_processor"

def parse_request(request_string):
    context = "Our app has the following commands available:\n" + cmd_list
    prompt = "\nAn user has just requested: "+request_string+"Return the appropiate commands to run in a list, each command shall be in the format: << command to run >>"
    response = openai.ChatCompletion.create(model="gpt-4", messages=[{"role":"user", "content":context}, {"role":"user", "content":prompt}])
    
    regex_pattern = r'<< (.+?) >>'
    command_list = re.findall(regex_pattern, response)
# chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])
