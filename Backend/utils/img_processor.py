from PIL import Image
import matplotlib.pyplot as plt
import json

def plot_quakes(lat_lon):
    # Load the Moon image
    moon_image = Image.open('./moon.jpg')

    # Get the dimensions of the Moon image
    moon_width, moon_height = moon_image.size

    # Create a plot
    fig=plt.figure(frameon=False, figsize=(1.024, 0.512), dpi=1000)

    ax = plt.Axes(fig, [0., 0., 1., 1.])
    ax.set_axis_off()
    fig.add_axes(ax)

    # Display the Moon image
    plt.imshow(moon_image, aspect='auto')
    for tup in lat_lon:
        try:
            latitude=tup[0]
            longitude=tup[1]

            if longitude>180:
                longitude-=360
            # Convert latitude and longitude to image coordinates (adjust this as needed)
            image_x = (longitude + 180) * (moon_width / 360)
            image_y = (90 - latitude) * (moon_height / 180)

            # Plot points on the image
            plt.scatter(image_x, image_y, color='red', marker='o', s=0.1)

            plt.savefig('locations.jpg')
            print('success')
        except:
            pass

def get_location(request):
    year=request['Year']
    day=request['Day']

    f = open('locations.json')
 
    data = json.load(f)
    f.close()
    for i in data:
        if(i['Year']==year and i['Day']==day):
            print(type(i['Lat']), i['Long'])
            return (i['Lat'], i["Long"])
    

def process_quake_requests(requests):
    points=[]
    for request in requests:
        points.append(get_location(request))
    plot_quakes(points)
# f = open('locations.json')
# data=json.load(f)
# print(data)
# process(data)