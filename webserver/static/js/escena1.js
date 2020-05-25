const escena1 = {
	init: function(){
		this.initScene();
		this.addFloor();
		this.addScreen();
		this.addLight();
		this.animate();
		this.initControls()
		this.initRaycaster()

		this.clock = new THREE.Clock();
		window.addEventListener( 'resize', this.handleResize);
	},
	initScene: function(){
		// create scene, camera and renderer
		this.scene = new THREE.Scene();
	
		let loader = new THREE.TextureLoader();
/*		this.scene.background = new THREE.CubeTextureLoader()
			.setPath( '/' )
			.load([
				'sky.png', 
				'sky.png', 
				'sky.png', 
				'sky.png', 
				'sky.png', 
				'sky.png', 
			])
*/
		this.scene.background = new THREE.Color(0x7a04eb)
		this.camera = new THREE.PerspectiveCamera(45,  window.innerWidth / window.innerHeight, 0.1, 1000);


		this.renderer = new THREE.WebGLRenderer({antialias: true});
		// this.renderer = new THREE.CSS3DRenderer({antialias:true})

		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.camera.position.set(0, 1, 0)
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowmap // default THREE.PCFShadowMap


		this.camera.position.set(10,1, 0)
		this.camera.lookAt(10, 1, 10)
		document.body.appendChild( this.renderer.domElement );
		document.body.margin = "0px";
	},
	initControls: function(){
		this.controls = new THREE.PointerLockControls( this.camera, document.body );
		document.body.addEventListener( 'click', ()=>{
			escena1.controls.moveForward(0.1);
			escena1.controls.lock()});
		document.body.addEventListener( 'keydown', this.handleKeydown);
	},
	initRaycaster: function(){
		this.raycaster = new THREE.Raycaster();

		window.document.addEventListener( 'mousemove', this.handleMouseMove);
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
			let position = escena1.parts.floor.geometry.attributes.position;
			let time = escena1.clock.getElapsedTime() * 10;
			for ( var i = 0; i < position.count; i ++ ) {
				let y = 0.5 * Math.sin( i / 5 + ( time + i ) / 7 );
				position.setY( i, y );
			}
			position.needsUpdate = true;
		}, 100)

		var texture = new THREE.TextureLoader().load( '/static/images/water.jpg' );
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 5, 5 );


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
		var AmbientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.scene.add( AmbientLight );
		this.parts.AmbientLight = AmbientLight

		let light = new THREE.SpotLight( 0xffffff );
		light.castShadow = true;            // default false
		this.scene.add( light );

		//Set up shadow properties for the light
		light.shadow.mapSize.width = 2048;  // default
		light.shadow.mapSize.height = 2048; // default
		light.shadow.camera.near = 0.5;       // default
		light.shadow.camera.far = 500      // default

		light.intensity = 0.5
		light.position.y = 100
		light.penumbra = 1
		this.parts.Light = light

	},
	addScreen: function(){
		// draw floor
		
		let geom = new THREE.BoxBufferGeometry(10, 21, 1);
		
		let mat = new THREE.MeshPhysicalMaterial( 
			{
				color: 0x120458,
				side: THREE.DoubleSide,
				reflectivity: 1,
				refractionRatio: 1,
				clearcoat:1
			});

		mat.opacity = 0.5
		mat.transparent = true

		let screen = new THREE.Mesh(geom, mat);
		screen.rotateX(Math.PI * 1/8)
		screen.position.x = 10
		screen.position.y = 10.1
		screen.position.z = 10

		screen.receiveShadow = false
		screen.castShadow = true

		this.parts.screen = screen;
		this.scene.add(screen);
		
	},
	showMenu: function(){
		const menu = document.querySelector("#menu");

		if (escena1.controls.isLocked){
			escena1.controls.unlock();
		}
		if(menu.style.display == 'block'){
			menu.style.display = 'none';
			return
		}

		menu.style.display = 'block';
		menu.style.top = escena1.mouse.clientY + 'px'
		menu.style.left = escena1.mouse.clientX + 'px'
	},
	handleResize: function(event){
		escena1.camera.aspect = window.innerWidth / window.innerHeight;
		escena1.camera.updateProjectionMatrix();
		escena1.renderer.setSize( window.innerWidth, window.innerHeight );
	
	},

	handleKeydown: function(event){
		switch(event.key){
			case 'w':
				escena1.controls.moveForward(0.5)
				break;
			case 's':
				escena1.controls.moveForward(-0.5);
				break;
			case 'a':
				escena1.controls.moveRight(-0.5)
				break;
			case 'd':
				escena1.controls.moveRight(0.5)
				break;
			case 'm':
				escena1.showMenu()
		}
	},
	handleMouseMove: function(event){

		escena1.mouse.clientX = event.clientX
		escena1.mouse.clientY = event.clientY
		escena1.mouse.x = (event.clientX / window.innerWidth) * 2 -1;
		escena1.mouse.y = -(event.clientY / window.innerHeight) * 2 +1;

		escena1.raycaster.setFromCamera( escena1.mouse, escena1.camera );
		let intersects = escena1.raycaster.intersectObjects( escena1.scene.children );
		
		let uuid = intersects.map((inter)=>inter.object.uuid)

		if (uuid.includes(escena1.parts.arrowDown.uuid)){
			console.log("aaaa ")
		}
		if(uuid.includes(escena1.parts.arrowUp.uuid)){
			console.log("eeeeee ")
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
						const x = Math.random() * window.innerHeight % 10 * 50 ; 
						const y = Math.random() * window.innerWidth  % 30 * 50;
						const div = document.createElement('div')
						div.textContent = markovData
						
						div.classList.add('markov');
						div.style.opacity = 0
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
						
						setTimeout(fadeIn, 100)
						
						div.style.top = x
						div.style.left = y
						
						markovText.appendChild(div)
					})

			}, 2000)
	},

	animate: function(){
		requestAnimationFrame( escena1.animate );
		escena1.renderer.render( escena1.scene, escena1.camera );
	},

	parts: {},
	mouse: new THREE.Vector2(),
}


escena1.init()
escena1.addMarkovText()
