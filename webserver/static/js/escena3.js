const escena3 = {
	init: function(){
		
		this.xoffset = (this.xgrid / 2) * this.size * -1
		this.yoffset = (this.ygrid / 2) * this.size * -1
		console.log(this.xoffset, this.xgrid, this.size)
		this.initScene();
		this.addLight();
		this.addCubes();
		this.initControls()
		this.animate();


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
			let pointLight = new THREE.PointLight( 0xffffff, 0.75 );
			pointLight.position.y = Math.random() * 20 
			pointLight.castShadow = true
			pointLight.decay = 2

			pointLight.shadow.radius = 4
			this.scene.add( pointLight );
			this.parts.pointLight.push(pointLight)

			const t = Math.random() + 0.1
			const move = setInterval(()=>{
				pointLight.position.x = Math.sin(t *  escena3.clock.getElapsedTime()) * 150
				pointLight.position.z = Math.cos(t * escena3.clock.getElapsedTime()) * 150
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

		
		escena3.parts.cubesMatrix = []
		escena3.parts.cubes = []

		for(let yi=0; yi<ygrid; yi++){
			escena3.parts.cubesMatrix.push([])

			for(let xi=0; xi<xgrid; xi++){
				let grey = Math.random()/4 + 0.1
				let shader = THREE.ShaderLib["basic"];
				
				let parameters = {
				}
				let geom = new THREE.BoxBufferGeometry( size, size, size );
				let mat = new THREE.MeshBasicMaterial(parameters)


				let mesh = new THREE.Mesh(geom, mat)

				mesh.position.x = xi * size + 1 + xoffset
				mesh.position.y = yi * size + 1 + yoffset
				mesh.position.z = 4
				mesh.faceTexture = 0


				mesh.dx = 0.001 * ( 0.5 - Math.random() );
				mesh.dy = 0.001 * ( 0.5 - Math.random() );
				escena3.scene.add(mesh)
				escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length-1].push(mesh)
				escena3.parts.cubes.push(mesh)
			}
		}
		
		getCaras().then((data)=>{

			let faces = data.caras;
			faces = faces.slice(0, xgrid*ygrid)
			
			let carasPromises = Promise.all(
				faces.map((face,i)=>{
					return new Promise( (resolve, reject)=>{
						let textureLoader = new THREE.TextureLoader();
						textureLoader.load(`/caras/${face}`,
							function(texture){
								//escena3.parts.cubesMatrix[i][j].material = new THREE.MeshStandardMaterial({envMap: texture})
								escena3.parts.cubes[i].material.map =  texture
								escena3.parts.cubes[i].material.needsUpdate = true
								escena3.parts.cubes[i].faceTexture = texture
								resolve()
							})
					})

				})
			).then(()=>{
				setTimeout(()=>{
					escena3.cubeInterval = setInterval(this.cubesExpand, 110)
					setTimeout(()=>{
						clearInterval(escena3.cubeInterval)
						setTimeout(()=>{
							escena3.cubeInterval = setInterval(this.cubesCompress(escena3.nCount), 110)
						},5000)
					}, 25000)
				}, 5000)
			})
		})

	},
	cubesExpand: function(){
		escena3.nCount++;
		escena3.parts.cubesMatrix.forEach((cubes_row)=>{
			cubes_row.forEach((mesh)=>{
				
				mesh.rotation.x += 10 * mesh.dx;
				mesh.rotation.y += 10 * mesh.dy;

				mesh.position.x -= 150 * mesh.dx;
				mesh.position.y += 150 * mesh.dy;
				mesh.position.z += 300 * mesh.dx;
			
			})
		})
	},
	cubesCompress: function(n){
		console.log("compressing",n)
		return function(){
				escena3.nCount--;
				if(escena3.nCount < 1){
					clearInterval(escena3.cubeInterval)
					setTimeout(escena3.webcamShow, 3000)
					return
				}
		escena3.parts.cubesMatrix.forEach((cubes_row)=>{
			cubes_row.forEach((mesh)=>{
				mesh.rotation.x -= 10 * mesh.dx;
				mesh.rotation.y -= 10 * mesh.dy;

				mesh.position.x += 150 * mesh.dx;
				mesh.position.y -= 150 * mesh.dy;
				mesh.position.z -= 300 * mesh.dx;
			})
		})
		}
	},
	webcamShow: function(){

		if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
			let video;
			if( document.querySelector('#webcam')){
				video = document.querySelector("#webcam")
			}else{
				video = document.createElement("video")
				video.style.transform = "rotate(-90deg)";

				        deg = 90

    video.style.webkitTransform = 'rotate('+deg+'deg)';
    video.style.mozTransform    = 'rotate('+deg+'deg)';
    video.style.msTransform     = 'rotate('+deg+'deg)';
    video.style.oTransform      = 'rotate('+deg+'deg)';
    video.style.transform       = 'rotate('+deg+'deg)';

				video.autoplay = true
				video.id = "webcam"
				document.body.appendChild(video)
			}


			let constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };
			navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
				// apply the stream to the video element used in the texture

				video.srcObject = stream;
				video.play();

				console.log(video)

				video.oncanplay = ()=>{
					let canvas = []


					for(let yi=0; yi<escena3.ygrid; yi++){
						canvas.push([])
						for(let xi=0; xi<escena3.xgrid; xi++){
							let c = document.createElement('canvas')
							c.width = video.videoWidth/escena3.xgrid
							c.height = video.videoHeight/escena3.ygrid

							canvas[canvas.length -1 ].push(c)
							document.body.append(c)

						}
					}
					canvas.forEach((row_canvas, i)=>{
						row_canvas.forEach((c, j)=>{
							let texture = new THREE.CanvasTexture(c)
							escena3.parts.cubesMatrix[i][j].material.map = texture
							escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.map = texture

						})
					})
					function loop() {
						canvas.forEach((row_canvas, i)=>{
							row_canvas.forEach((c, j)=>{

								const loopPixel = function(){


									const test = escena3.webcamReplaceMatrix.map((wcam)=>{
										if(wcam[0] == i  && wcam[1] == j){
											return true
										}else{
											return false
										}
									}).some((e)=>e)

									if(test) {
										//escena3.parts.cubesMatrix[i][j].material.map = escena3.parts.cubesMatrix[i][j].faceTexture
										//escena3.parts.cubesMatrix[i][j].material.needsUpdate = true
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.map =  escena3.parts.cubesMatrix[i][j].faceTexture
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.needsUpdate = true
										return
									}else{
									
										var ctx = c.getContext('2d');
										
										ctx.rotate(Math.PI/2)
										ctx.drawImage(video, -i * c.width, -j * c.height);
										ctx.rotate(-Math.PI/2)
										let texture = new THREE.CanvasTexture(c)
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.map = texture
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.needsUpdate = true
										requestAnimationFrame(loopPixel)
									}
								}
								requestAnimationFrame(loopPixel)
							})	
						})
					}
					loop()
					setTimeout(escena3.blendTextures, 5000)
				}
				
				/*

				*/

					} ).catch( function ( error ) {

						console.error( 'Unable to access the camera/webcam.', error );

					} );

				} 

	},
	blendTextures: function(){
		let lij = []
		for(let i=0;i<escena3.xgrid;i++){
			for(let j=0;j<escena3.ygrid;j++){
				lij.push([i,j])
			}
		}
		
		lij = lij.sort(() => Math.random() - 0.5);
		let draw = function(lij){
			if(lij.length>0){
				indx = lij.shift()
				escena3.webcamReplaceMatrix.push(indx)
				/*
				let i = indx[0]
				let j = indx[1]
				escena3.parts.cubesMatrix[i][j].material.map = escena3.parts.cubesMatrix[i][j].faceTexture
				escena3.parts.cubesMatrix[i][j].material.needsUpdate = true
*/
				setTimeout(()=>draw(lij), 500)
			}else{
				return
			}
		}
		draw(lij)

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
	animate: function(){
		requestAnimationFrame( escena3.animate );
		escena3.renderer.render( escena3.scene, escena3.camera );
	},
	parts: {},
	mouse: new THREE.Vector2(),
	overHelp: false,
	clock: new THREE.Clock(),
	xgrid: 10,
	ygrid: 10,
	size: 2,
	xoffset:0,
	yoffset:0,
	nCount : 0,
	webcamReplaceMatrix : []
}


escena3.init()
escena3.webcamShow()
