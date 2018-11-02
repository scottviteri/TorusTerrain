import sys
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator, FormatStrFormatter
# This import registers the 3D projection, but is otherwise unused.
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 unused import


tor  = np.array([list(map(float, line.split(' '))) for line in sys.stdin])
fig = plt.figure()
ax = fig.gca(projection='3d')

# Make data.
X = np.arange(0, len(tor[0]), 1)
Y = np.arange(0, len(tor), 1)
X, Y = np.meshgrid(X, Y)
#R = np.sqrt(X**2 + Y**2)
#Z = np.sin(R)

# Plot the surface.
#surf = ax.plot_surface(X, Y, tor, cmap=cm.coolwarm,
#                       linewidth=0, antialiased=False)

surf = ax.plot_surface(X, Y, tor, cmap=cm.coolwarm)

# Customize the z axis.
ax.set_zlim(-1.01, 1.01)
ax.zaxis.set_major_locator(LinearLocator(10))
ax.zaxis.set_major_formatter(FormatStrFormatter('%.02f'))

# Add a color bar which maps values to colors.
fig.colorbar(surf, shrink=0.5, aspect=5)
fig.savefig('Output/torus.png')


