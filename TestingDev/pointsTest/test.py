from PIL import Image
import matplotlib.pyplot as plt
import json
import math

# Load the Moon image
moon_image = Image.open('./moon.jpg')

# Get the dimensions of the Moon image
moon_width, moon_height = moon_image.size
 
# Opening JSON file
f = open('locations.json')
 
# returns JSON object as 
# a dictionary
data = json.load(f)

# Create a plot
plt.figure(figsize=(8,8))

# Display the Moon image
plt.imshow(moon_image)
 
# Iterating through the json
# list
for i in data:
    latitude=i['Lat']
    longitude=i['Long']
    # latitude=54
    # longitude=10
    if(not longitude):
        continue
    if longitude>180:
        longitude-=360
    # Convert latitude and longitude to image coordinates (adjust this as needed)
    image_x = (longitude + 180) * (moon_width / 360)
    image_y = (90 - latitude) * (moon_height / 180)
    # Plot points on the image
    plt.scatter(image_x, image_y, color='red', marker='o', label='Sample Points')
 
# Closing file
f.close()

# Show the plot
plt.show()
