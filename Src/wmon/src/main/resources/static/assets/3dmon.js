/**
 * 3d monitoring with Three.js
 */

Mon3D = function() 
{
	var _robots = [];
	
	this.initStats = function() 
	{
		var stats = new Stats();
		stats.setMode(0); // 0: fps, 1: ms
	    // Align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
	    document.getElementById("Stats-output").appendChild(stats.domElement);
	    return stats;
	}
	
	// update robot position
	this.setRobotPos = function(robotId, x, y, z) 
	{
		for (var i=0; i < _robots.length; ++i)
		{
			if (_robots[i].id == Number(robotId))
			{
				_robots[i].rcv += 1;
				_robots[i].mesh.position.x = x;
				_robots[i].mesh.position.y = y;
				_robots[i].mesh.position.z = z;
				
				switch (Number(robotId))
				{
				case 0: _controls.robotRcv0 += 1; break;
				case 1: _controls.robotRcv1 += 1; break;				
				case 2: _controls.robotRcv2 += 1; break;
				case 3: _controls.robotRcv3 += 1; break;
				case 4: _controls.robotRcv4 += 1; break;
				case 5: _controls.robotRcv5 += 1; break;
				case 6: _controls.robotRcv6 += 1; break;
				case 7: _controls.robotRcv7 += 1; break;
				case 8: _controls.robotRcv8 += 1; break;
				case 9: _controls.robotRcv9 += 1; break;
				}
			}
		}
	}
	
	this.onWindowResize = function() 
	{
		_camera.aspect = window.innerWidth / window.innerHeight;
		_camera.updateProjectionMatrix();
		_renderer.setSize( window.innerWidth - 20, window.innerHeight - 20);
	}
	
	this.render = function() 
	{
	    _stats.update();
	    _orbit.update();
	    _renderer.clear();
	    _renderer.render(_scene, _camera);
	}	
	

	
	var _stats = this.initStats();
	var _scene = new THREE.Scene();
	var _camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	var _renderer = new THREE.WebGLRenderer();
	_renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	_renderer.setSize(window.innerWidth-20, window.innerHeight-20);
	_renderer.shadowMapEnabled = true;
	
	var planeGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = -0.01;
	plane.position.z = 0;
	_scene.add(plane);
	
	var lookAt = new THREE.Vector3(0,0,0)
	_camera.position.x = -50.30815606782114;
	_camera.position.y = 51;
	_camera.position.z = 69.9671279843572;
	_camera.lookAt(lookAt);
	
	//var clock = new THREE.Clock();
	var _orbit = new THREE.CameraControls(_camera);	
	_orbit.center = lookAt;
	
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
	_scene.add(ambientLight);
	
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(60, 60, 60);
	spotLight.castShadow = true;
	_scene.add(spotLight);
	
    var points = [];
    var z = 0.01;
    for (var i=0; i < 50; ++i)
    {
        points.push({x: i, y: 0, z: z});
        points.push({x: i, y: 50, z: z});
    }
    for (var i=0; i < 50; ++i)
    {
        points.push({x: 0, y: i, z: z});
        points.push({x: 50, y: i, z: z});
    }	
    
    var lines = new THREE.Geometry();
    var i = 0;
    points.forEach(function (e) {
        lines.vertices.push(new THREE.Vector3(e.x, e.z, e.y));
        i++;
    });

    var material = new THREE.LineBasicMaterial({
        opacity: 1.0,
        linewidth: 1,
        vertexColors: THREE.VertexColors
    });

    var line = new THREE.Line(lines, material);
    line.position.set(-25, 0, -25);
    line.mode = THREE.Lines;
    _scene.add(line);
    
    var colors = [0xff0000, 0x00ff00];
    for (var i=0; i < 10; ++i)
	{
        var size = 1;
        var cubeGeometry = new THREE.BoxGeometry(size,size,size);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: colors[i%2]});
        //var wireFrameMat = new THREE.MeshBasicMaterial({color: 0x000000});
        //var cube = THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [cubeMaterial, wireFrameMat]);
    	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    	cube.castShadow = true;
    	cube.position.x = i * 2;
    	cube.position.y = 0.5;
    	cube.position.z = 0;
    	_scene.add(cube);
    	
    	_robots.push( {id:i, rcv:0, mesh:cube} );
	}
    
	
	// add the output of the renderer to the html element
	document.getElementById("WebGL-output").appendChild(_renderer.domElement);
	
	// dat.GUI
	//var step = 0;
	var _controls = new function () {
	    this.rotationSpeed = 0.02;
	    this.bouncingSpeed = 0.03;
	    //this.effect = true;
	    this.robotRcv0 = 0;
	    this.robotRcv1 = 0;
	    this.robotRcv2 = 0;
	    this.robotRcv3 = 0;
	    this.robotRcv4 = 0;
	    this.robotRcv5 = 0;
	    this.robotRcv6 = 0;
	    this.robotRcv7 = 0;
	    this.robotRcv8 = 0;
	    this.robotRcv9 = 0;
	};

	var gui = new dat.GUI();
	var ids = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	for (var i=0; i < 10; ++i)
	{
		var rcv = gui.add( _controls, 'robotRcv' + ids[i] ).listen();
		rcv.domElement.style.pointerEvents = 'none';
	}
	
	this.render(); 	// call the render function
	
	window.addEventListener('resize', this.onWindowResize, false );
	
}
