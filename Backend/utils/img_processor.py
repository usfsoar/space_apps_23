from PIL import Image
import io
import base64
import matplotlib.pyplot as plt
import json

def plot_quakes(lat_lon, _color='red'):
    moon_image = Image.open('./moon.jpg')
    moon_width, moon_height = moon_image.size

    fig = plt.figure(frameon=False, figsize=(1.024, 0.512), dpi=1000)
    ax = plt.Axes(fig, [0., 0., 1., 1.])
    ax.set_axis_off()
    fig.add_axes(ax)

    plt.imshow(moon_image, aspect='auto')
    for tup in lat_lon:
        try:
            latitude, longitude = tup
            if longitude > 180:
                longitude -= 360
            image_x = (longitude + 180) * (moon_width / 360)
            image_y = (90 - latitude) * (moon_height / 180)
            plt.scatter(image_x, image_y, color=_color, marker='o', s=0.1)
        except:
            pass

    # Save the image into a BytesIO object instead of saving it to the disk
    buf = io.BytesIO()
    plt.savefig(buf, format="JPEG")
    buf.seek(0)
    
    # Convert the BytesIO stream to base64
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return image_base64

def get_location(request, noday=False):
    year=request['Year']
    day = 1
    if noday is not False:
        day=request['Day']

    f = open('locations.json')
 
    data = json.load(f)
    f.close()
    for i in data:
        if(i['Year']==year and (i['Day']==day and noday==True)):
            print(type(i['Lat']), i['Long'])
            return (i['Lat'], i["Long"])
    

def process_quake_requests(requests):
    points = [get_location(request) for request in requests]
    texture_image_base64 = plot_quakes(points)
    with open("moon_bump.jpg", "rb") as image_file:
        bump_image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    return texture_image_base64, bump_image_base64

def process_year_request(year):
    #create a list of all the days in the yeary based on locations.json
    points = [get_location(request={'Year':year}) ]
    
# f = open('locations.json')
# data=json.load(f)
# print(data)
# process(data)