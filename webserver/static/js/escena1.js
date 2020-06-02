const escena1 = {
	init: function(){
		this.initScene();
		this.addFloor();
		this.addScreen();
		this.addLight();
		this.animate();
		this.initControls()
		this.initSound()
		this.initRaycaster()

		this.clock = new THREE.Clock();
		window.addEventListener( 'resize', this.handleResize);
		document.querySelector("#help").addEventListener( 'click', this.handleHelp);
		document.querySelector("#help").addEventListener( 'mouseover', ()=> escena1.overHelp = true);
		document.querySelector("#help").addEventListener( 'mouseout', ()=> escena1.overHelp = false);
	},
	initScene: function(){
		// create scene, camera and renderer
		this.scene = new THREE.Scene();

		this.scene.background = new THREE.CubeTextureLoader().setPath( '/static/images/' ).load( [
			'px.png',
			'nx.png',
			'py.png',
			'ny.png',
			'pz.png',
			'nz.png'
		]);

	
		let loader = new THREE.TextureLoader();
		this.parts.background = this.scene.background
		this.camera = new THREE.PerspectiveCamera(45,  window.innerWidth / window.innerHeight, 0.1, 1000);


		this.renderer = new THREE.WebGLRenderer(
			{
				antialias: true,
			});
		this.renderer.sortObjects= false
		// this.renderer = new THREE.CSS3DRenderer({antialias:true})

		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.camera.position.set(-50, 2, 100)
		
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowmap // default THREE.PCFShadowMap


		this.camera.lookAt(10, 1.75, 10)
		document.body.appendChild( this.renderer.domElement );
		document.body.margin = "0px";
	},
	initControls: function(){
		a = (navigator.userAgent||navigator.vendor||window.opera)
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
		
			// check if its a mobile

			this.camera.position.y +=3
			controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

			controls.dampingFactor = 0.05;
			controls.enableDamping = true;
			controls.screenSpacePanning = false;

			this.controls = controls
			return
		}
		
		
		this.controls = new THREE.PointerLockControls( this.camera, document.body );
		document.body.addEventListener( 'click', (event)=>{
			escena1.controls.moveForward(0.001);
			escena1.controls.moveRight(0.001);
			escena1.controls.lock()
			escena1.mouse.clientX = event.clientX
			escena1.mouse.clientY = event.clientY

			Terminal.offset += Terminal.scroll * 20;
			Terminal.generateTexture()
		});
		document.body.addEventListener( 'keydown', this.handleKeydown);

		this.controls.addEventListener( 'lock', function () {


			if(!document.querySelector('#cursordiv')){
				const cursordiv = document.createElement('div')

				cursordiv.id = 'cursordiv';
				cursordiv.style.width = "5px"
				cursordiv.style.height = "5px"
				cursordiv.style.background = "red"
				cursordiv.style.position = "absolute"
				cursordiv.style.top = escena1.mouse.clientY + 'px'
				cursordiv.style.left = escena1.mouse.clientX + 'px'
				cursordiv.style.right = "0"
				cursordiv.style.bottom = "0"
				cursordiv.style.zIndex= "99"
				document.body.appendChild(cursordiv)
			}
			if(escena1.overHelp){
				escena1.controls.unlock()
			}
		
		});
		
		this.controls.addEventListener( 'unlock', function () {
			const cursordiv = document.querySelector('#cursordiv')
			cursordiv.remove()

		})
		
	},
	initRaycaster: function(){
		this.raycaster = new THREE.Raycaster();

		window.document.addEventListener( 'mousemove', this.handleMouseMove);
	},

	initSound: function(){
		// create an AudioListener and add it to the camera
		const listener = new THREE.AudioListener();
		this.camera.add( listener );
		
		let sounds = ['1.wav', '2.wav', '3.wav', '3.wav', 'voz1.wav', 'voz2.wav', 'voz3.wav', 'voz4.wav']
		let soundsVolume = [0.4, 0.75, 1,1 ,0.1 , 0.1, 0.1, 0.1]

		for (let k=0;k<7; k++){
		    const sphere = new THREE.SphereBufferGeometry( 50/2, 55, 100 ,100);
		    //const sphere = new THREE.SphereBufferGeometry( 25/2, 25/2, 50/2 
			const material = new THREE.MeshBasicMaterial({ 
				color: 0xffffff,
				envMap: escena1.scene.background,
				refractionRatio: 0.75,
			});
			material.envMap.mapping = THREE.CubeRefractionMapping;
		
		    const mesh = new THREE.Mesh( sphere, material );
		    mesh.position.x  = Math.random() * 200 + 50 
		    mesh.position.y  = Math.random() * 30 + 3
		    mesh.position.z  = Math.random() * 200 + 50
		    
		    escena1.scene.add(mesh)
		
			const tx = Math.random() * 1/4 + 1e-8
			const ty = Math.random() + 0.001
			const tz = Math.random() * 1/4 + 1e-8
			const move = setInterval(()=>{
				mesh.position.x = Math.sin(escena1.clock.getElapsedTime() * tx ) * 400 + 210
				mesh.position.y = Math.sin(escena1.clock.getElapsedTime() * ty ) * 50 + 1100
				mesh.position.z = Math.cos(escena1.clock.getElapsedTime() * tz ) * 400 + 210
			}, 10)
		}

		this.parts.soundMesh = sounds.map((sound_file, i)=>{
			const sound = new THREE.PositionalAudio( listener );
			const audioLoader = new THREE.AudioLoader();

			audioLoader.load( `/static/sounds/memorial/${sound_file}`, function( buffer ) {
				sound.setBuffer( buffer );
				sound.setLoop(true);
				sound.setRefDistance( 50 );
				sound.setVolume( soundsVolume[i] );
				sound.play();
			});

			// create an object for the sound to play from
			const sphere = new THREE.SphereBufferGeometry( 50/2, 55, 100,100 );
			const material = new THREE.MeshBasicMaterial({ 
				envMap: escena1.scene.background,
				refractionRatio: 0.95
			});
			const mesh = new THREE.Mesh( sphere, material );
			mesh.position.x  = Math.random() * 200 + 50 
			mesh.position.y  = Math.random() * 30 + 3
			mesh.position.z  = Math.random() * 200 + 50 
			mesh.add( sound );
			escena1.scene.add(mesh)


			const tx = Math.random() * 1/2 + 1e-8
			const ty = Math.random() + 0.001
			const tz = Math.random() * 1/2 + 1e-8
			
			const x0 = Math.random() * -100
			const y0 = Math.random() * 2
			const z0 = Math.random() * -100
			const move = setInterval(()=>{
				mesh.position.x = x0 + Math.sin(escena1.clock.getElapsedTime() * tx ) *  100
				mesh.position.y = 25 + y0 + Math.abs(Math.sin(escena1.clock.getElapsedTime() * ty )) * 50
				mesh.position.z =  z0 + Math.sin(escena1.clock.getElapsedTime() * tz ) *  100
				
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
		    const sphere = new THREE.SphereBufferGeometry( 50/2, 55, 100 ,100);
			const material = new THREE.MeshBasicMaterial({ 
				envMap: escena1.scene.background,
				refractionRatio: 0.5
			});
			const mesh = new THREE.Mesh( sphere, material );
			mesh.position.x  = Math.random() * 200 + 50 
			mesh.position.y  = Math.random() * 30 + 3
			mesh.position.z  = Math.random() * 200 + 50 
			mesh.add( sound );
			escena1.scene.add(mesh)


			const tx = Math.random() * 1/4 + 1e-8
			const ty = Math.random() + 0.001
			const tz = Math.random() * 1/4 + 1e-8

			const x0 = Math.random() * 10
			const y0 = Math.random() * 2
			const z0 = Math.random() * 10

			const move = setInterval(()=>{
				mesh.position.x = 20 + x0 + Math.abs(Math.sin(escena1.clock.getElapsedTime() * tx )) *  200
				mesh.position.y = 25 + y0 + Math.abs(Math.sin(escena1.clock.getElapsedTime() * ty )) * 50
				mesh.position.z = -50 + z0 + Math.abs(Math.sin(escena1.clock.getElapsedTime() * tz )) *  200
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
			let position = escena1.parts.floor.geometry.attributes.position;
			let time = escena1.clock.getElapsedTime() * 10;
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
		var AmbientLight = new THREE.AmbientLight( 0xfafbfd, 0.25 ); // soft white light
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
			let pointLight = new THREE.PointLight(  0xfafbfd, 0.25 );
			pointLight.position.y = Math.random() * 20 + 50
			pointLight.castShadow = true
			pointLight.decay = 2

			pointLight.shadow.radius = 4
			this.scene.add( pointLight );
			this.parts.pointLight.push(pointLight)

			const t = Math.random() + 0.1
			const move = setInterval(()=>{
				pointLight.position.x = Math.sin(t *  escena1.clock.getElapsedTime()) * 150
				pointLight.position.z = Math.cos(t * escena1.clock.getElapsedTime()) * 150
			}, 50)
		
		}


	},
	addScreen: function(){
		// draw floor
		
		let geom = new THREE.BoxBufferGeometry(20, 42, 1);
		
		let mat = new THREE.MeshPhysicalMaterial( 
			{
				color: 0x120458,
				side: THREE.DoubleSide,
				reflectivity: 1,
				refractionRatio: 1,
				clearcoat:1
			});

	    /*
		let mat0 = new THREE.MeshPhysicalMaterial( 
			{
				color: 0x1f04f8,
				side: THREE.DoubleSide,
				reflectivity: 1,
				refractionRatio: 1,
				clearcoat:1
			});
*/
	    
	    const mat0 = new THREE.MeshBasicMaterial({ 
		envMap: escena1.scene.background,
		refractionRatio: 0.5
	    });

//		mat0.opacity = 0.9
// 		mat0.transparent = true
		
		mat.opacity = 0.75
		mat.transparent = true

		let screen = new THREE.Mesh(geom, mat0);
		screen.rotateX(Math.PI * 1/8)
		screen.position.x = 10
		screen.position.y = 10.1
		screen.position.z = 10

		screen.receiveShadow = false
		screen.castShadow = true

		this.parts.screen = [screen];
		this.scene.add(screen);

		for(let k=0; k<15; k++){
			let screen = new THREE.Mesh(geom, mat);

			screen.position.x = 5 + (Math.ceil(Math.random() * 40) * 5 - 100 )
			screen.position.y = 10.1
			screen.position.z = 5 + (Math.ceil(Math.random() * 40) * 5 - 100 )

			screen.rotateX(Math.random() * Math.PI/8)
			screen.rotateY(Math.random() * Math.PI)
			screen.rotateZ(Math.random() * Math.PI/8 - Math.PI * 3/16)

			screen.receiveShadow = false
			screen.castShadow = true

			this.parts.screen.push(screen);
			this.scene.add(screen);

		}
		
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
		let intersects = escena1.raycaster.intersectObjects( [escena1.parts.arrowUp, escena1.parts.arrowDown] );

		if(intersects.length == 0){
			escena1.parts.arrowDown.material.color = new THREE.Color(0,0,0)
			escena1.parts.arrowUp.material.color = new THREE.Color(0,0,0)
			Terminal.scroll = 0;
		}else if(intersects[0].object.uuid == escena1.parts.arrowUp.uuid){
			escena1.parts.arrowUp.material.color = new THREE.Color(0.5, 0,0)
			Terminal.scroll = -1;
		}else if(intersects[0].object.uuid == escena1.parts.arrowDown.uuid){
			escena1.parts.arrowDown.material.color = new THREE.Color(0.5, 0,0)	
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
		requestAnimationFrame( escena1.animate );
		escena1.renderer.render( escena1.scene, escena1.camera );
	},

	parts: {},
	mouse: new THREE.Vector2(),
	cursor: {},
	overHelp: false
}


escena1.init()
escena1.addMarkovText()



