const escena3 = {
	init: function(){
		this.initScene();
		this.addLight();
		this.addCubes();
		this.initControls()
		this.animate();

		console.log(this.clock)
		window.addEventListener( 'resize', this.handleResize);
		document.querySelector("#help").addEventListener( 'click', this.handleHelp);
		document.querySelector("#help").addEventListener( 'mouseover', ()=> escena3.overHelp = true);
		document.querySelector("#help").addEventListener( 'mouseout', ()=> escena3.overHelp = false);
	},
	initScene: function(){
		// create scene, camera and renderer
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(45,  window.innerWidth / window.innerHeight, 0.1, 1000);


		this.renderer = new THREE.WebGLRenderer(
			{
				antialias: true,
			});
		this.renderer.sortObjects = false
		// this.renderer = new THREE.CSS3DRenderer({antialias:true})

		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.camera.position.set(0, 4, -30)
		
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowmap // default THREE.PCFShadowMap


		document.body.appendChild( this.renderer.domElement );
		document.body.margin = "0px";
	},
	initControls: function(){

			controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

			controls.dampingFactor = 0.05;
			controls.enableDamping = true;
			controls.screenSpacePanning = false;

			this.controls = controls
		
	},

	initSound: function(){
		// create an AudioListener and add it to the camera
		const listener = new THREE.AudioListener();
		this.camera.add( listener );
		
		let sounds = ['1.wav']

		for (let k=0;k<7; k++){
			const sphere = new THREE.SphereBufferGeometry( 50, 55, 100 ,100);
			const material = new THREE.MeshBasicMaterial({ 
				envMap: escena3.scene.background,
				refractionRatio: 0.95
			});
			const mesh = new THREE.Mesh( sphere, material );
			mesh.position.x  = Math.random() * 200 + 50 
			mesh.position.y  = Math.random() * 30 + 3
			mesh.position.z  = Math.random() * 200 + 50 
			escena3.scene.add(mesh)
		
			const tx = Math.random() * 1/4 + 1e-8
			const ty = Math.random() + 0.001
			const tz = Math.random() * 1/4 + 1e-8
			const move = setInterval(()=>{
				mesh.position.x = Math.sin(escena3.clock.getElapsedTime() * tx ) * 400 + 210
				mesh.position.y = Math.sin(escena3.clock.getElapsedTime() * ty ) * 50 + 1100
				mesh.position.z = Math.cos(escena3.clock.getElapsedTime() * tz ) * 400 + 210
			}, 10)
		}

		this.parts.soundMesh = sounds.map((sound_file)=>{
			const sound = new THREE.PositionalAudio( listener );
			const audioLoader = new THREE.AudioLoader();

			audioLoader.load( `/static/sounds/memorial/${sound_file}`, function( buffer ) {
				sound.setBuffer( buffer );
				sound.setLoop(true);
				sound.setRefDistance( 50 );
				if (sound_file == 'voz1.wav'){
					sound.setVolume(8)
				}
				sound.play();
			});

			// create an object for the sound to play from
			const sphere = new THREE.SphereBufferGeometry( 50, 55, 100 ,100);
			const material = new THREE.MeshBasicMaterial({ 
				envMap: escena3.scene.background,
				refractionRatio: 0.95
			});
			const mesh = new THREE.Mesh( sphere, material );
			mesh.position.x  = Math.random() * 200 + 50 
			mesh.position.y  = Math.random() * 30 + 3
			mesh.position.z  = Math.random() * 200 + 50 
			mesh.add( sound );
			escena3.scene.add(mesh)


			const tx = Math.random() * 1/4 + 1e-8
			const ty = Math.random() + 0.001
			const tz = Math.random() * 1/4 + 1e-8
			
			const x0 = Math.random() * 10
			const y0 = Math.random() * 2
			const z0 = Math.random() * 10
			const move = setInterval(()=>{

				mesh.position.x = 20 + x0 + Math.abs(Math.sin(escena3.clock.getElapsedTime() * tx )) *  200
				mesh.position.y = 25 + y0 + Math.abs(Math.sin(escena3.clock.getElapsedTime() * ty )) * 50
				mesh.position.z = -50 + z0 + Math.abs(Math.sin(escena3.clock.getElapsedTime() * tz )) *  200
			}, 10)
			return mesh
		})


		this.parts.soundMesh.push( ...sounds.map((sound_file)=>{
			const sound = new THREE.PositionalAudio( listener );
			const audioLoader = new THREE.AudioLoader();

			audioLoader.load( `/static/sounds/memorial/${sound_file}`, function( buffer ) {
				sound.setBuffer( buffer );
				sound.setLoop(true);
				sound.setRefDistance( 50 );
				if (sound_file == 'voz1.wav'){
					sound.setVolume(8)
				}
				sound.play();
			});

			// create an object for the sound to play from
			const sphere = new THREE.SphereBufferGeometry( 50, 55, 100 ,100);
			const material = new THREE.MeshBasicMaterial({ 
				envMap: escena3.scene.background,
				refractionRatio: 0.5
			});
			const mesh = new THREE.Mesh( sphere, material );
			mesh.position.x  = Math.random() * 200 + 50 
			mesh.position.y  = Math.random() * 30 + 3
			mesh.position.z  = Math.random() * 200 + 50 
			mesh.add( sound );
			escena3.scene.add(mesh)


			const tx = Math.random() * 1/4 + 1e-8
			const ty = Math.random() + 0.001
			const tz = Math.random() * 1/4 + 1e-8

			const x0 = Math.random() * 10
			const y0 = Math.random() * 2
			const z0 = Math.random() * 10

			const move = setInterval(()=>{
				mesh.position.x = 20 + x0 + Math.abs(Math.sin(escena3.clock.getElapsedTime() * tx )) *  200
				mesh.position.y = 25 + y0 + Math.abs(Math.sin(escena3.clock.getElapsedTime() * ty )) * 50
				mesh.position.z = -50 + z0 + Math.abs(Math.sin(escena3.clock.getElapsedTime() * tz )) *  200
			}, 10)
			return mesh
		}))
		
	},
	addFloor: function(){

		// draw floor
		
		let geom = new THREE.PlaneBufferGeometry(200, 200, 200, 200);
		geom.rotateX(-Math.PI/2);
		let position = geom.attributes.position;
		for ( var i = 0; i < position.count; i ++ ) {
			var y = 0.5 * Math.sin( i / 2 );
			position.setY( i, y );
		}
		
		const wave = setInterval(function(){
			let position = escena3.parts.floor.geometry.attributes.position;
			let time = escena3.clock.getElapsedTime() * 10;
			for ( var i = 0; i < position.count; i ++ ) {
				let y = 0.5 * Math.sin( i / 5 + ( time + i ) / 7 );
				position.setY( i, y );
			}
			position.needsUpdate = true;
		}, 100)

		var texture = new THREE.TextureLoader().load( '/static/images/grey-texture.jpg' );
		//texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		//texture.repeat.set( 5, 5 );


		let mat = new THREE.MeshStandardMaterial( { 
			color: 0x0044ff, 
			side:THREE.DoubleSide,
			map: texture
		});

		let plane = new THREE.Mesh(geom, mat)
		plane.receiveShadow = true
		this.parts.floor = plane;
		this.scene.add(plane);
		
	},

	addLight: function(){
		var AmbientLight = new THREE.AmbientLight( 0x404040, 0.75 ); // soft white light
		this.scene.add( AmbientLight );
		this.parts.AmbientLight = AmbientLight

		let light = new THREE.SpotLight( 0xffffff );
		light.castShadow = true;            // default false
		this.scene.add( light );


		//Set up shadow properties for the light
		light.shadow.mapSize.width = 2048*4;  // default
		light.shadow.mapSize.height = 2048*4; // default
		light.shadow.camera.near = 0.5;       // default
		light.shadow.camera.far = 500      // default

		light.intensity = 0.5
		light.position.y = 100
		light.penumbra = 1
		light.decay = 2

		this.parts.Light = light

		this.parts.pointLight = []

		for(let k=0; k<5; k++){
			let pointLight = new THREE.PointLight( 0xff00ff, 0.25 );
			pointLight.position.y = Math.random() * 20 + 50
			pointLight.castShadow = true
			pointLight.decay = 2

			pointLight.shadow.radius = 4
			this.scene.add( pointLight );
			this.parts.pointLight.push(pointLight)

			const t = Math.random() + 0.1
			const move = setInterval(()=>{
				pointLight.position.x = Math.sin(t *  escena3.clock.getElapsedTime()) * 15
				pointLight.position.z = Math.cos(t * escena3.clock.getElapsedTime()) * 15
			}, 50)
		
		}


	},
	addCubes: function(){
		const xgrid = this.xgrid;
		const ygrid = this.ygrid;
		const size = this.size

		const xoffset = this.xoffset
		const yoffset = this.yoffset

		const getCaras = function(){
			return fetch('https://notasdeausencia.cc/caras',{
				method: 'GET',
			}).then(async (response)=>{
				return response.json()
			})
		}

		getCaras().then((data)=>{
			console.log("asdfsdf",data)
		})
		
		escena3.parts.cubes = []

		for(let yi=0; yi<ygrid; yi++){
			for(let xi=0; xi<xgrid; xi++){
				let parameters = { color: new THREE.Color(Math.random(), Math.random(), Math.random()) };
				let geom = new THREE.BoxBufferGeometry( size, size, size );
				let mat = new THREE.MeshLambertMaterial( parameters );

				let mesh = new THREE.Mesh(geom, mat)

				mesh.position.x = xi * size + 1 + xoffset
				mesh.position.y = yi * size + 1 + yoffset
				mesh.position.z = 4
				escena3.scene.add(mesh)
				escena3.parts.cubes.push(mesh)
			}
		}

	},
	showMenu: function(){
		const menu = document.querySelector("#menu");

		if (escena3.controls.isLocked){
			escena3.controls.unlock();
		}

		if(menu.style.display == 'block'){
			menu.style.display = 'none';
			return
		}

		menu.style.display = 'block';
		menu.style.top = escena3.mouse.clientY + 'px'
		menu.style.left = escena3.mouse.clientX + 'px'
	},
	handleHelp: function(){

		
		const description = document.querySelector("#description");
		const help = document.querySelector("#help");
		
		if(description.style.display == "none"){
			help.style['background-color'] = "grey";
			help.style.border = "2px black solid";
			description.style.display = "block"
		}else{
			help.style['background-color'] = "";
			help.style.border = "";
			description.style.display = "none"
		
		}

	},
	handleResize: function(event){
		escena3.camera.aspect = window.innerWidth / window.innerHeight;
		escena3.camera.updateProjectionMatrix();
		escena3.renderer.setSize( window.innerWidth, window.innerHeight );
	
	},

	handleKeydown: function(event){
		switch(event.key){
			case 'w':
				escena3.controls.moveForward(0.5)
				break;
			case 's':
				escena3.controls.moveForward(-0.5);
				break;
			case 'a':
				escena3.controls.moveRight(-0.5)
				break;
			case 'd':
				escena3.controls.moveRight(0.5)
				break;
			case 'm':
				escena3.showMenu()
		}
	},
	handleMouseMove: function(event){

		escena3.mouse.clientX = event.clientX
		escena3.mouse.clientY = event.clientY
		escena3.mouse.x = (event.clientX / window.innerWidth) * 2 -1;
		escena3.mouse.y = -(event.clientY / window.innerHeight) * 2 +1;

		escena3.raycaster.setFromCamera( escena3.mouse, escena3.camera );
		let intersects = escena3.raycaster.intersectObjects( [escena3.parts.arrowUp, escena3.parts.arrowDown] );

		if(intersects.length == 0){
			escena3.parts.arrowDown.material.color = new THREE.Color(0,0,0)
			escena3.parts.arrowUp.material.color = new THREE.Color(0,0,0)
			Terminal.scroll = 0;
		}else if(intersects[0].object.uuid == escena3.parts.arrowUp.uuid){
			escena3.parts.arrowUp.material.color = new THREE.Color(0.5, 0,0)
			Terminal.scroll = -1;
		}else if(intersects[0].object.uuid == escena3.parts.arrowDown.uuid){
			escena3.parts.arrowDown.material.color = new THREE.Color(0.5, 0,0)	
			Terminal.scroll = 1;
		}


	},
	addMarkovText: function(){
		let markovText = document.querySelector('#markovText');
		if(!markovText){
			markovText = document.createElement('div')

			markovText.id = 'markovText';
			markovText.style.width = window.innerWidth ;
			markovText.style.height = window.innerHeight ;

			markovText.style.position = "fixed";
			markovText.style.display = "block";
			markovText.style.top = 0;
			markovText.style.left = 0;

			document.body.appendChild(markovText);
		}

		const getMarkov = function(callback){
			return fetch('/markov/16',{
				method: 'GET',
			}).then(async (response)=>{
				return response.text()
			}).then(callback)
		}

		const move = setInterval(
			function(){
				getMarkov(
					function(markovData){
						const x = Math.ceil(Math.random() * window.innerHeight % 10 * 50 ); 
						const y = Math.ceil(Math.random() * window.innerWidth  % 30 * 50 );
						const div = document.createElement('div')
						div.textContent = markovData
						
						div.classList.add('markov');
						div.style.opacity = 0
						div.style.top = x + 'px'
						div.style.left = y + 'px'
						div.style['line-height'] = '48px'
						
						const fadeIn = function(){
							const opacity = parseFloat(div.style.opacity);
							if(opacity < 1){
								div.style.opacity = opacity+0.1
								setTimeout(fadeIn, 100)
							}else{
								setTimeout(fadeOut, 5000)
							}
						}
						
						const fadeOut = function(){
							const opacity = parseFloat(div.style.opacity);
							if(opacity > 0){
								div.style.opacity = opacity - 0.1;
								setTimeout(fadeOut, 100)
							}else{
								div.remove()
							}
						}
						
						setTimeout(fadeIn, 5000)
						
						
						markovText.appendChild(div)
					})

			}, 10000)
	},

	animate: function(){
		requestAnimationFrame( escena3.animate );
		escena3.renderer.render( escena3.scene, escena3.camera );
	},
	parts: {},
	mouse: new THREE.Vector2(),
	overHelp: false,
	clock: new THREE.Clock(),
	xgrid: 20,
	ygrid: 20,
	size: 1,
	xoffset: -10,
	yoffset: -10,
}


escena3.init()



