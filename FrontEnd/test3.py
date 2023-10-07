import matplotlib.pyplot as plt
from matplotlib import cm, colors
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.animation as animation
import numpy as np

# Create a sphere
r = 1
pi = np.pi
cos = np.cos
sin = np.sin
phi, theta = np.mgrid[0.0:pi:100j, 0.0:2.0*pi:100j]
x = r*sin(phi)*cos(theta)
y = r*sin(phi)*sin(theta)
z = r*cos(phi)

#Import data
data = np.genfromtxt('leb.txt')
theta, phi, r = np.hsplit(data, 3) 
theta = theta * pi / 180.0
phi = phi * pi / 180.0
xx = sin(phi)*cos(theta)
yy = sin(phi)*sin(theta)
zz = cos(phi)

#Set colours and render
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')


ax.scatter(xx,yy,zz,color="k",s=20)

for i in range(10):
    print(i)
    ax.scatter(xx[i], yy[i], zz[i], color="r", s=40)
    
    



ax.set_xlim([-1,1])
ax.set_ylim([-1,1])
ax.set_zlim([-1,1])
ax.set_aspect("equal")
plt.tight_layout()
plt.show()