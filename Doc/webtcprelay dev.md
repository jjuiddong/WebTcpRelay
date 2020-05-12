
WebTcpRelay Project Develop Log


- Java Spring Framework
	- Log In
		- user : jjuiddong
	- Object Position Relay Server
	- WebSocket Connection
		- web(js), websocket relay svr(c#)
	- MySQL Database
		- User table
			- id,passwd,name
		- Object table
			- name
		- Position Record table
			- position x,y
			- direction
			- velocity
			- datetime

- Web
	- Java Script
	- Three.js
	- 3D Object Rendering Realtime
	- 3D Object Position Tracking
	- WebSocket Connection

- WebSocket Relay Server
	- c#
	- Java Spring Framework Connection by WebSocket
	- Simulation Server Connection by TCP/IP

- Simualtion Server
	- C++
	- 3D Object Simulation
	- WebSocket Relay Server Connection by TCP/IP
	- Synchronize 3D Object Position WebServer by TCP/IP



---------------------------------------------------------------------
- Develop History

- create usr, robot, track db with eclipse schema.sql

- create mysql db user -> mon
	- create schema -> mon
		- charset/collation -> utf8, utf8_general_ci

- create controller
	- MonController (monitor controller)
	- create first web page binding

- create mon.html

- mon.html
	- websocket connection

- 3dmon.js javascript file creation
	- Mon3D class

- websocket test
	- webbrowser, spring boot websocket communication test

- create simulation server
	- vs2017 c++
	- tcp/ip communication with RelayServer
	- create RealTimeInfo Protocol 

- create RelayServer
	- vs2017 c#

- protocol test with simulation server, relay server
