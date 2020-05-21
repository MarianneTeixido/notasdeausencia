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
		const texture = loader.load('imagen.png')
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
		//this.renderer = new THREE.CSS3DRenderer({antialias:true})

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
		document.body.addEventListener( 'keyup', this.handleKeyup);
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

		var texture = new THREE.TextureLoader().load( 'water.jpg' );
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
	handleResize: function(event){
		escena1.camera.aspect = window.innerWidth / window.innerHeight;
		escena1.camera.updateProjectionMatrix();
		escena1.renderer.setSize( window.innerWidth, window.innerHeight );
	
	},

	handleKeyup: function(event){
		switch(event.keyCode){

			case 38:
				escena1.controls.moveForward(1)
				break;
			case 40:
				escena1.controls.moveForward(-1);
				break;
			case 37:
				escena1.controls.moveRight(-1)
				break;
			case 39:
				escena1.controls.moveRight(1)
				break;
		}
	},
	handleMouseMove: function(event){
		escena1.mouse.x = (event.clientX / window.innerWidth) * 2 -1;
		escena1.mouse.y = -(event.clientY / window.innerHeight) * 2 +1;

		escena1.raycaster.setFromCamera( escena1.mouse, escena1.camera );
		let intersects = escena1.raycaster.intersectObjects( escena1.scene.children );
		
		let uuid = intersects.map((inter)=>inter.object.uuid)
	},
	addMarkovText: function(){
		let markovText = document.querySelector('#markovText');
		if(!markovText){
			/*
			markovCanvas = document.createElement('canvas')
			*/
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

		/*
		const ctx = markovCanvas.getContext('2d')
		ctx.font = 'bold 200px Arial';
		ctx.fillStyle = 'red';
		ctx.scale(0.125/2, 0.125/2)
		*/
		const markovExample = "plantaba una semilla tal como se planta en la tierra, en el marco de una apropiación. Pero la violación pública y la esfera paraestatal que en la trata y en los hombres, el mandato de masculinidad, es decir, desmontando el pacto de complicidad en el poder soberano que sea solamente físico. Sin la subordinación psicológica y moral del pacto del poder. Será por eso, posiblemente, que no se puede abolir ese comercio, material y simbólico, a la función de la violencia sexual, tiene también como anexo a ese cuerpo femenino, por la pérdida de la mujer lo único que existe es poder de la responsabilidad y simbólico, a pesar de todos los esfuerzos. la crueldad se especializa como es la constitución de una fratría mafiosa. El cuerpo del otro sin una paz de significación propio de la soberanía: control no solamente físico sino también moral del pueblo, tribu, comunidad, vecindario, localidad, familia, barriada o modernas, que el continente no es soberanía. En condiciones sociopolíticas «normales» del orden bélico mafioso y de la materialidad del cuerpo del otro como parte del país conquistado. La violación, está el secreto. La violencia sexual se sustenta en los tribunales sino también en las mujeres, somos las guerras contemporáneas es la pedagogía de la mujer se domina y comercia, sino su funcionalidad en el sostenimiento del pacto del cuerpo de la mujer lo que fingen no saber nada. Violar a la mujer, sea generalizada en el sentido estricto de muerte, y el desecho del proceso, una pieza descartable, y de que puede resultar atrayente. Lo digo como víctimas sacrificiales, se trata de la comunidad se sumerge más y más de las veces por una madre triste. Así como rasgo conjugar el patriarcado, pues es universal, sin mayores diferencias, justificando, bajo esta bandera de la posición de un paradigma del agresor. La víctima cuyo sacrificio y triple victimización de Ciudad Juárez se especializa como mensaje Es por eso que en ellos, los receptores y beneficiarios. Y la legalizan, a saber: la actualización permanente de la violencia epistémica. La violencia sexual, y la ley tiene la destrucción del enemigo en el cuerpo y el agenciamiento del mismo por la desigualdad que le es propio campo de batalla en el que torna la Esfera Pública englobante, totalizante, por encima de la guerra tienen lugar. Pero estoy convencida de que este participe con intención o voluntad, la violación se sostiene también sobre el comportamiento de sentencias, presumo precisamente el carácter binario de la estructura está compuesta, como demandantes, en ellos; y por hacer valer, no solo no parece estar mal, sino que también nos revictimiza tan fuertemente que el problema de hombres y mujeres hasta la muerte de las guerras contemporáneas es una ley de estatus. No discuto que no puede ser absorbidos y natura- lizados por la complicidad de hombres y no la comunidad. Es parte de este proceso de digestión la responsabilidad y la guerra, referida al aniquilamiento de la víctima, cuya reducción es justamente significada por".split(' ');
		const move = setInterval(function(){
			const x = Math.random() * window.innerHeight % 10 * 50 ; 
			const y = Math.random() * window.innerWidth  % 30 * 50;
			const div = document.createElement('div')
			i = Math.ceil(Math.random() * markovExample.length/2)

			div.textContent = markovExample.slice(i, i+4).join(' ');
			div.style.position = 'fixed'
			
			div.style.color = 'white'
			div.style['font-size'] = '50px'

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
				}
			}
			setTimeout(fadeIn, 100)

			div.style.top = x
			div.style.left = y
			markovText.appendChild(div)
		}, 2000)
	},

	animate: function(){
		requestAnimationFrame( escena1.animate );
		escena1.renderer.render( escena1.scene, escena1.camera );
	},

	parts: {},
	mouse: new THREE.Vector2()
}


escena1.init()
escena1.addMarkovText()
