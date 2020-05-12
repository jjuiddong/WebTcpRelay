/**
 * 3d monitoring with Three.js
 */

Mon3D = function() 
{
	var robots = [];
	
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
		for (var i=0; i < robots.length; ++i)
		{
			if (robots[i].id == Number(robotId))
			{
				robots[i].mesh.position.x = x;
				robots[i].mesh.position.y = y;
				robots[i].mesh.position.z = z;
			}
		}
	}
	
	this.onWindowResize = function() 
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth - 20, window.innerHeight - 20);
	}
	
	this.render = function() 
	{
	    stats.update();
	    orbit.update();
	    renderer.clear();
	    renderer.render(scene, camera);
	}	
	

	
	var stats = this.initStats();
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	renderer.setSize(window.innerWidth-20, window.innerHeight-20);
	renderer.shadowMapEnabled = true;
	
	var planeGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = -0.01;
	plane.position.z = 0;
	scene.add(plane);
	
	var lookAt = new THREE.Vector3(0,0,0)
	camera.position.x = -50.30815606782114;
	camera.position.y = 51;
	camera.position.z = 69.9671279843572;
	camera.lookAt(lookAt);
	
	//var clock = new THREE.Clock();
	var orbit = new THREE.CameraControls(camera);	
	orbit.center = lookAt;
	
	var ambientLight = new THREE.AmbientLight(0x0c0c0c);
	scene.add(ambientLight);
	
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(60, 60, 60);
	spotLight.castShadow = true;
	scene.add(spotLight);
	
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
    scene.add(line);
    
    var colors = [0xff0000, 0x00ff00];
    for (var i=0; i < 2; ++i)
	{
        var size = 1;
        var cubeGeometry = new THREE.BoxGeometry(size,size,size);
        var cubeMaterial = new THREE.MeshLambertMaterial({color: colors[i]});
        //var wireFrameMat = new THREE.MeshBasicMaterial({color: 0x000000});
        //var cube = THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [cubeMaterial, wireFrameMat]);
    	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    	cube.castShadow = true;
    	cube.position.x = i * 2;
    	cube.position.y = 0.5;
    	cube.position.z = 0;    	
    	scene.add(cube);
    	
    	robots.push( {id:i, mesh:cube} );	
	}
    
	
	// add the output of the renderer to the html element
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	
	// call the render function
	//var step = 0;
	var controls = new function () {
	    this.rotationSpeed = 0.02;
	    this.bouncingSpeed = 0.03;
	    //this.effect = true;
	};

	var gui = new dat.GUI();
	//gui.add( controls, 'effect' );
	
	this.render();
	
	window.addEventListener('resize', this.onWindowResize, false );
	
}
