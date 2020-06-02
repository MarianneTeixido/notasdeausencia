const escena3 = {
	init: function(){
		
		this.xoffset = (this.xgrid / 2) * this.size * -1
		this.yoffset = (this.ygrid / 2) * this.size * -1
		console.log(this.xoffset, this.xgrid, this.size)
		this.initScene();
		this.addLight();
		this.addCubes();
		this.initSound()
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

		this.scene.rotateZ(-Math.PI/2)

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
		
		
		const sound1 = new THREE.PositionalAudio( listener );
		const audioLoader1 = new THREE.AudioLoader();

		audioLoader1.load("/static/sounds/espejos/2.wav", function( buffer ) {
			sound1.setBuffer( buffer );
			sound1.setLoop(true);
			sound1.setRefDistance( 10 );
			sound1.play();
		});

		escena3.parts.cubesMatrix[escena3.xgrid-1][escena3.ygrid -1].add(sound1)
		escena3.parts.cubesMatrix[0][0].add(sound1)
		
		const sound2 = new THREE.PositionalAudio( listener );
		const audioLoader2 = new THREE.AudioLoader();

		audioLoader2.load("/static/sounds/espejos/3.wav", function( buffer ) {
			sound2.setBuffer( buffer );
			sound2.setLoop(true);
			sound2.setRefDistance( 10 );
			sound2.play();
		});

		escena3.parts.cubesMatrix[0][escena3.ygrid -1].add(sound2)
	
		const sound3 = new THREE.PositionalAudio( listener );
		const audioLoader3 = new THREE.AudioLoader();

		audioLoader3.load("/static/sounds/espejos/5.wav", function( buffer ) {
			sound3.setBuffer( buffer );
			sound3.setLoop(true);
			sound3.setRefDistance( 10 );
			sound3.play();
		});
	
		escena3.parts.cubesMatrix[escena3.xgrid-1][0].add(sound3)
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
			return fetch('/caras',{
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
			console.log(faces,"faces")
			faces = faces.slice(0, xgrid*ygrid)
			
			let carasPromises = Promise.all(
				faces.map((face,i)=>{
					return new Promise( (resolve, reject)=>{
						/*
						let textureLoader = new THREE.TextureLoader();
						textureLoader.load(`/caras/${face}`,
							function(texture){
								//escena3.parts.cubesMatrix[i][j].material = new THREE.MeshStandardMaterial({envMap: texture})
								escena3.parts.cubes[i].material.map =  texture
								escena3.parts.cubes[i].material.needsUpdate = true
								escena3.parts.cubes[i].faceTexture = texture
								resolve()
							})
							*/
						const img = new Image()

						img.onload = function(){
							const canvas = document.createElement('canvas')

							canvas.width = 800
							canvas.height = 800

							const ctx = canvas.getContext('2d')

							ctx.translate(canvas.width/2, canvas.height/2)
							ctx.rotate(Math.PI/2)

							ctx.drawImage(img, -400, -400)

							let texture = new THREE.CanvasTexture(canvas)
							escena3.parts.cubes[i].material.map =  texture
							escena3.parts.cubes[i].material.needsUpdate = true
							escena3.parts.cubes[i].faceTexture = texture
							escena3.parts.cubes[i].faceImage = img
							resolve()
						}
						img.src = `/caras/${face}`
					})

				})
			).then(()=>{
				
				setTimeout(()=>{
					escena3.cubeInterval = setInterval(this.cubesExpand, 110)
					setTimeout(()=>{
						clearInterval(escena3.cubeInterval)
						setTimeout(()=>{
							escena3.cubeInterval = setInterval(this.cubesCompress(escena3.nCount), 110)
						},1000)
					}, 2000)
				}, 1000)
				
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
/*
				        deg = 90

    video.style.webkitTransform = 'rotate('+deg+'deg)';
    video.style.mozTransform    = 'rotate('+deg+'deg)';
    video.style.msTransform     = 'rotate('+deg+'deg)';
    video.style.oTransform      = 'rotate('+deg+'deg)';
    video.style.transform       = 'rotate('+deg+'deg)';*/

				video.autoplay = true
				video.id = "webcam"
			}


			let constraints = { video: { width: 640, height: 480, facingMode: 'user' } };
			navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
				// apply the stream to the video element used in the texture

				video.srcObject = stream;
				video.style.width = 640
				video.style.height = 480

				video.play();

				console.log(video)

				video.oncanplay = ()=>{
					let canvas = []
										

					test_ = []
					for(let yi=0; yi<escena3.ygrid; yi++){
						canvas.push([])
						test_.push([])
						for(let xi=0; xi<escena3.xgrid; xi++){
							let c = document.createElement('canvas')
							c.width = video.videoWidth/escena3.xgrid
							c.height = video.videoHeight/escena3.ygrid

							canvas[canvas.length -1 ].push(c)
							let sx = video.videoWidth - (yi * c.width)
							let sy = video.videoHeight - (xi * c.height)
							test_[test_.length -1 ].push([sy,sx])

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
									
									var ctx = c.getContext('2d');
									
									if(test) {
										//escena3.parts.cubesMatrix[i][j].material.map = escena3.parts.cubesMatrix[i][j].faceTexture
										//escena3.parts.cubesMatrix[i][j].material.needsUpdate = true
										//
										/*
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][  j].material.map =  escena3.parts.cubesMatrix[i][j].faceTexture
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j ].material.needsUpdate = true
										*/
										
										img = escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][  j].faceImage
										img.width = c.width
										img.height = c.height

										ctx.fillStyle = 'white'
										ctx.fillRect(0, 0, c.width, c.height)
										ctx.globalAlpha =  0.5
										ctx.rotate(Math.PI/2)
										ctx.drawImage(img, 0 , -c.height, c.width, c.height)

										ctx.drawImage(video, -i * c.width, -j * c.height)
										ctx.rotate(-Math.PI/2)
										

									}else{
										ctx.rotate(Math.PI/2)
										ctx.drawImage(video, -i * c.width, -j * c.height)
										ctx.rotate(-Math.PI/2)
									
									}
									let texture = new THREE.CanvasTexture(c)
									escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][  j].material.map =  texture
									escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j ].material.needsUpdate = true
									
										/*
									else{
										
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.map = texture
										escena3.parts.cubesMatrix[escena3.parts.cubesMatrix.length - i -1][ j].material.needsUpdate = true
									}
										*/
									requestAnimationFrame(loopPixel)
								}
								requestAnimationFrame(loopPixel)
							})	
						})
					}
					loop()
					setTimeout(escena3.blendTextures, 1000)
				}
				

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
	xgrid: 20,
	ygrid: 20,
	size: 2,
	xoffset:0,
	yoffset:0,
	nCount : 0,
	webcamReplaceMatrix : []
}


escena3.init()
