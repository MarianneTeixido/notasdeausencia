const escena2 = {

    init: function(){
	
	this.initScene();
	//this.addTextSpheres();
	this.addLight();
	this.addJsonText();
	this.animate();
	this.audio(); 
	this.initControls(); 
	this.render(); 

	this.clock = new THREE.Clock();
	// this.clock = new THREE.Clock();
	window.addEventListener('resize', this.handleResize); 
	document.querySelector("#help").addEventListener( 'click', this.handleHelp);
	document.querySelector("#help").addEventListener( 'mouseover', ()=> escena2.overHelp = true);
	document.querySelector("#help").addEventListener( 'mouseout', ()=> escena2.overHelp = false);
	
    },

    tweets: [],
    tam: [],
    esfericas: true,
    aleatorias: false,
    //cube: {},
    // text: {}, 
    cube: [],
    text: [],
    positions: [],
    audioCube: {},
    audioCube2: {},
    
    initScene: function(){

	//this.container = document.createElement( 'div' );
	//document.body.appendChild( this.container );

	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
	this.camera.position.z = 1;
	
	this.scene = new THREE.Scene();

	this.scene.background = new THREE.CubeTextureLoader().setPath( '/static/images/' ).load( [
	    'px2.png',
	    'nx2.png',
	    'py2.png',
	    'ny2.png',
	    'pz2.png',
	    'nz2.png'
	]);


	this.mouse = new THREE.Vector2(),

	this.raycaster = new THREE.Raycaster();

	this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

	this.renderer.setSize( window.innerWidth, window.innerHeight );
	
	 document.body.appendChild( this.renderer.domElement );
	//this.container.appendChild( this.renderer.domElement );

	window.document.addEventListener( 'mousemove', this.handleMouseMove, false);
	
	//document.body.addEventListener( 'mousemove', this.onDocumentMouseMove, false );

    },

    initControls: function(){
	
	this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
	// this.controls.enableDamping = true; 
	this.controls.dampingFactor = 0.05;
	this.controls.screenSpacePanning = false;

	//document.body.addEventListener( 'keyup', this.handleKeyup);
	document.body.addEventListener("keyup", this.handleKeyUp);


    },


    audio: function(){


	var geometryCube = new THREE.SphereBufferGeometry( 1, 55, 100, 100 );
	var materialCube = new THREE.MeshBasicMaterial( {
	    color: 0xffffff,
	    envMap: escena2.scene.background,
	    refractionRatio: 0.75
	} );

	materialCube.envMap.mapping = THREE.CubeRefractionMapping;
		

	this.audioCube = new THREE.Mesh( geometryCube, materialCube );
	this.audioCube2 = new THREE.Mesh( geometryCube, materialCube );
	this.audioCube3 = new THREE.Mesh( geometryCube, materialCube );
	this.audioCube4 = new THREE.Mesh( geometryCube, materialCube );
	this.audioCube5 = new THREE.Mesh( geometryCube, materialCube );
	this.audioCube6 = new THREE.Mesh( geometryCube, materialCube );

	const move = setInterval(()=>{

	    this.audioCube.position.x = Math.sin((this.clock.getElapsedTime())*0.331) * 8
	    this.audioCube.position.y = Math.sin((this.clock.getElapsedTime())*0.145) * 14
	    this.audioCube.position.z = Math.sin((this.clock.getElapsedTime())*0.76) * 6
	    
	    this.audioCube2.position.x = Math.sin((this.clock.getElapsedTime())*0.122) * 9
	    this.audioCube2.position.y = Math.sin((this.clock.getElapsedTime())*0.793) * 8
	    this.audioCube2.position.z = Math.sin((this.clock.getElapsedTime())*0.4123) * 14

	    this.audioCube3.position.x = Math.sin((this.clock.getElapsedTime())*0.176) * -14
	    this.audioCube3.position.y = Math.sin((this.clock.getElapsedTime())*0.723) * 8
	    this.audioCube3.position.z = Math.sin((this.clock.getElapsedTime())*0.444) * 5

	    this.audioCube4.position.x = Math.sin((this.clock.getElapsedTime())*0.576) * -4
	    this.audioCube4.position.y = Math.sin((this.clock.getElapsedTime())*0.723) * 10
	    this.audioCube4.position.z = Math.sin((this.clock.getElapsedTime())*0.144) * -5

	    this.audioCube5.position.x = Math.sin((this.clock.getElapsedTime())*0.66) * -7
	    this.audioCube5.position.y = Math.sin((this.clock.getElapsedTime())*0.2323) * 9
	    this.audioCube5.position.z = Math.sin((this.clock.getElapsedTime())*0.51) * 6

	    this.audioCube6.position.x = Math.sin((this.clock.getElapsedTime())*0.96) * 4
	    this.audioCube6.position.y = Math.sin((this.clock.getElapsedTime())*0.6323) *-8
	    this.audioCube6.position.z = Math.sin((this.clock.getElapsedTime())*0.221) * 4
	    
	    

	})

	
	//this.audioCube2.position.x = -4;
	//this.audioCube2.position.y = -4;
	//this.audioCube2.position.z = -4;

	const listener = new THREE.AudioListener();
	this.camera.add( listener );

	// create the PositionalAudio object (passing in the listener)
	const sound = new THREE.PositionalAudio( listener );
	
	// load a sound and set it as the PositionalAudio object's buffer
	const audioLoader = new THREE.AudioLoader();
	audioLoader.load( '/static/sounds/reescritura/1.wav', function( buffer ) {
	    sound.setBuffer( buffer );
	    sound.setLoop(true);
	    sound.setRefDistance( 1 );
	    sound.play();
	});

	// create the PositionalAudio object (passing in the listener)
	const sound2 = new THREE.PositionalAudio( listener );
	
	// load a sound and set it as the PositionalAudio object's buffer
	const audioLoader2 = new THREE.AudioLoader();
	audioLoader2.load( '/static/sounds/reescritura/2.wav', function( buffer ) {
	    sound2.setBuffer( buffer );
	    sound2.setLoop(true);
	    sound2.setRefDistance( 1 );
	    sound2.play();
	});

	
	// create the PositionalAudio object (passing in the listener)
	const sound3 = new THREE.PositionalAudio( listener );
	
	// load a sound and set it as the PositionalAudio object's buffer
	const audioLoader3 = new THREE.AudioLoader();
	audioLoader3.load( '/static/sounds/reescritura/3.wav', function( buffer ) {
	    sound3.setBuffer( buffer );
	    sound3.setLoop(true);
	    sound3.setRefDistance( 1 );
	    sound3.play();
	});

	
	// create the PositionalAudio object (passing in the listener)
	const sound4 = new THREE.PositionalAudio( listener );
	
	// load a sound and set it as the PositionalAudio object's buffer
	const audioLoader4 = new THREE.AudioLoader();
	audioLoader4.load( '/static/sounds/reescritura/4.wav', function( buffer ) {
	    sound4.setBuffer( buffer );
	    sound4.setLoop(true);
	    sound4.setRefDistance( 1 );
	    sound4.play();
	});

	
	// create the PositionalAudio object (passing in the listener)
	const sound5 = new THREE.PositionalAudio( listener );
	
	// load a sound and set it as the PositionalAudio object's buffer
	const audioLoader5 = new THREE.AudioLoader();
	audioLoader5.load( '/static/sounds/reescritura/5.wav', function( buffer ) {
	    sound5.setBuffer( buffer );
	    sound5.setLoop(true);
	    sound5.setRefDistance( 1 );
	    sound5.play();
	});

	
	// create the PositionalAudio object (passing in the listener)
	const sound6 = new THREE.PositionalAudio( listener );
	
	// load a sound and set it as the PositionalAudio object's buffer
	const audioLoader6 = new THREE.AudioLoader();
	audioLoader6.load( '/static/sounds/reescritura/6.wav', function( buffer ) {
	    sound6.setBuffer( buffer );
	    sound6.setLoop(true);
	    sound6.setRefDistance( 1 );
	    sound6.play();
	});

	escena2.scene.add( this.audioCube );	
	escena2.scene.add( this.audioCube2 );
	escena2.scene.add( this.audioCube3 );
	escena2.scene.add( this.audioCube4 );
	escena2.scene.add( this.audioCube5 );
	escena2.scene.add( this.audioCube6 );


	this.audioCube.add(sound);
	this.scene.add( this.audioCube);
	
	this.audioCube2.add(sound2);
	this.scene.add(this.audioCube2); 

	this.audioCube3.add(sound3);
	this.scene.add(this.audioCube3);
	
	this.audioCube4.add(sound4);
	this.scene.add(this.audioCube4);

	this.audioCube5.add(sound5);
	this.scene.add(this.audioCube5); 

	this.audioCube6.add(sound6);
	this.scene.add(this.audioCube6); 
				
		
    },


    addLight: function(){
	
	this.light1 = new THREE.PointLight( 0x50b732, 2, 50 );
	this.scene.add( this.light1 );
	this.light2 = new THREE.PointLight( 0x3b5fd1, 2, 50 );
	this.scene.add( this.light2 );
	this.light3 = new THREE.PointLight( 0xde3fe1, 2, 50 );
	this.scene.add( this.light3 );
	this.light4 = new THREE.PointLight( 0x7930a7, 2, 50 );
	this.scene.add( this.light4 );
	
    },

    handleKeyUp: function(event){
	
 	var keyCode = event.which;
	switch(event.keyCode){
	    
	case 49:
	    escena2.esfericas = true;
	    escena2.aleatorias = false;
	  
	    for(let i = 0; i < escena2.tam.length; i ++){
		escena2.scene.remove(escena2.cube[i]);
		escena2.scene.remove(escena2.cube[i].text);
	    }
	    
	    escena2.addTextSpheres();

	    break;
	    
	case 50:
	    escena2.esfericas = false;
	    escena2.aleatorias = true;
	    
	    for(let i = 0; i < escena2.tam.length; i ++){
		escena2.scene.remove(escena2.cube[i]);
		escena2.scene.remove(escena2.cube[i].text);
	    }
	    
	    escena2.addTextSpheres();


	    break;

	case 77:
	    escena2.showMenu()
	    
	    
	}

	// escena2.addTextSpheres();

    },

    handleMouseMove: function( event ) {
	
	event.preventDefault();

        escena2.mouse.clientX = event.clientX
        escena2.mouse.clientY = event.clientY
        escena2.mouse.x = (event.clientX / window.innerWidth) * 2 -1;
        escena2.mouse.y = -(event.clientY / window.innerHeight) * 2 +1;
	
	
    },

    addJsonText: function(){
	
	// pROBLEMO AQUI 
	
	//let tweets = [];
	//let tam = [];
	//let text = []; 
	
	function loadJSON(callback, name) {
	    
            let xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            if(typeof name == 'undefined'){
		xobj.open('GET', '/static/js/analysis_ordered.json', true);
            }else{
		xobj.open('GET', `${name}`, true);
            }
            xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
		    
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    callback(JSON.parse(xobj.responseText));
		}
            };
            xobj.send(null);
	}
	
	loadJSON(getData);
	
	function getData(data){
	    let datos = data.ordered
	    datos.forEach( function(dato){
		let word = dato[0]
		
		//word = word.replace('á','\u00E1')
		//word = word.replace('é','\u00E9')
		//word = word.replace('í','\u00ED')
		//word = word.replace('ó','\u00F3')
		//ord = word.replace('ú','\u00FA')
		//word = word.replace('ú','\u00FA')
		//word = word.replace('ñ','\u00F1')
		
		let ocurrences = dato[1]	      
		//console.log(word, ocurrences)
		// mensajes.push(word);
		escena2.tweets.push(word);
  		escena2.tam.push(ocurrences);
            })

	    escena2.addTextSpheres();

	}
	
    },

    addTextSpheres: function(){

	var theta, radius = 100;
	
	var params = {
	    envMap: 'HDR',
	    roughness: 0.3,
	    metalness: 0.1,
	    exposure: 1.0,
	    debug: false
	};

	var loader = new THREE.FontLoader();      
	
	loader.load( '/static/fonts/Montserrat_Bold.json', function ( font ) {
	    
	    for(var i = 0; i < escena2.tam.length ; i ++){   	       
		
		var geometry = new THREE.SphereGeometry(20, 20, 20);


		var material = new THREE.MeshStandardMaterial( {
		    color: 0xffffff,
		    metalness: params.metalness,
		    roughness: params.roughness,
		    //transparent: true,
		    //opacity: 0.75,
		    
		} );
	


		// geometry.center();
		//geometry.computeVertexNormals(); 
		geometry.computeBoundingBox();
		
		escena2.cube[i] = new THREE.Mesh( geometry, material );
		//escena2.cube = new THREE.Mesh( geometry, material );
		
		var shapes = font.generateShapes( escena2.tweets[i], escena2.tam[i]/40 );
		var geometry2 = new THREE.ShapeBufferGeometry( shapes );

		// geometry.center(); 
		// geometry2.computeBoundingBox();
		
		escena2.text[i] = new THREE.Mesh( geometry2, material );
	
		//var posX, posY, posZ;

		if(escena2.aleatorias){
		  
		    var posX, posY, posZ;

		    posX = Math.random() * 20 - 10;
		    posY = Math.random() * 20 - 10;
		    posZ = Math.random() * 20 - 10;

		    escena2.cube[i].position.x = posX*0.25;
		    escena2.cube[i].position.y = posY*0.25;
		    escena2.cube[i].position.z = posZ*0.25;		    
		    
		    escena2.cube[i].scale.x = escena2.tam[i]/2500;
		    escena2.cube[i].scale.y = escena2.tam[i]/2500;
		    escena2.cube[i].scale.z = escena2.tam[i]/2500;
		
		    escena2.text[i].position.x = posX * 0.25;
		    escena2.text[i].position.y = posY * 0.25;
		    escena2.text[i].position.z = posZ * 0.25;

		    escena2.positions.push( posX, posY, posZ );
		    
		}
		
		if(escena2.esfericas){

		    var posX, posY, posZ;
  
		    var theta1 = Math.random() * (Math.PI*2);
		    var theta2 = Math.random() * (Math.PI*2); 

		    posX = Math.cos(theta1) * Math.cos(theta2);
		    posY = Math.sin(theta1);
		    posZ = Math.cos(theta1) * Math.sin(theta2);
		    
		    escena2.cube[i].position.x = posX * (0.5*escena2.tam[i]);
		    escena2.cube[i].position.y = posY * (0.5*escena2.tam[i]);
		    escena2.cube[i].position.z = posZ * (0.5*escena2.tam[i]);
		    
		    escena2.cube[i].scale.x = escena2.tam[i]/2500;
		    escena2.cube[i].scale.y = escena2.tam[i]/2500;
		    escena2.cube[i].scale.z = escena2.tam[i]/2500;
		    
		    escena2.text[i].position.x = posX * (0.5 * escena2.tam[i]);
		    escena2.text[i].position.y = posY * (0.5 * escena2.tam[i]);
		    escena2.text[i].position.z = posZ * (0.5 * escena2.tam[i]);

		    escena2.positions.push( posX* (0.5*escena2.tam[i]), posY* (0.5*escena2.tam[i]), posZ* (0.5*escena2.tam[i]) );

		}

		
		//cube.lookAt(0, 0, 0); 
		
		//cube[i].matrixAutoUpdate = false;
		// cube[i].updateMatrix();
		
		escena2.scene.add(escena2.cube[i]);

		escena2.cube[i].text = escena2.text[i];


		// pregunta, esto podría estar fuera del for sin los indices?
		// escena2.scene.add(escena2.text[i]);
		
	    }

	    //var materialLines = new THREE.LineBasicMaterial( { color: 0x0000ff } );

	    // var geometryLines = new THREE.BufferGeometry().setFromPoints( escena2.positions );
	    
	    //var line = new THREE.Line( geometryLines, materialLines );
	    // escena2.scene.add( line );
	    
	    
	})

	
    },

    showMenu: function(){
	const menu = document.querySelector("#menu");
	
	if (escena2.controls.isLocked){
	    escena2.controls.unlock();
		}
	if(menu.style.display == 'block'){
	    menu.style.display = 'none';
			return
	}
	
	menu.style.display = 'block';
	menu.style.top = escena2.mouse.clientY + 'px'
	menu.style.left = escena2.mouse.clientX + 'px'
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

	escena2.camera.aspect = window.innerWidth / window.innerHeight;
	// escena2.camera.updateProjectionMatrix();
	escena2.renderer.setSize( window.innerWidth, window.innerHeight );
	
    },

   

    animate: function(){
	//escena2.controls.update(); 

	requestAnimationFrame( escena2.animate );
	escena2.render(); 
	
    },

    render: function(){

	var time = Date.now() * 0.0005;
	
	//escena2.camera.position.z += 0.05;
	escena2.light1.position.x = Math.sin( time * 0.7 ) * 30;
	escena2.light1.position.y = Math.cos( time * 0.5 ) * 40;
	escena2.light1.position.z = Math.cos( time * 0.3 ) * 30;
	
	escena2.light2.position.x = Math.cos( time * 0.3 ) * 30;
	escena2.light2.position.y = Math.sin( time * 0.5 ) * 40;
	escena2.light2.position.z = Math.sin( time * 0.7 ) * 30;
	
	escena2.light3.position.x = Math.sin( time * 0.7 ) * 30;
	escena2.light3.position.y = Math.cos( time * 0.3 ) * 40;
	escena2.light3.position.z = Math.sin( time * 0.5 ) * 30;
	
	escena2.light4.position.x = Math.sin( time * 0.3 ) * 30;
	escena2.light4.position.y = Math.cos( time * 0.7 ) * 40;
	escena2.light4.position.z = Math.sin( time * 0.5 ) * 30;
	;	
	// escena2.audioCube.position.x = Math.sin( time * 0.3 ) * 30;
	// audioCube.position.y = 4;
	// audioCube.position.z = 4;


	
	escena2.camera.updateMatrixWorld(); 

	var INTERSECTED;

	// escena2.raycaster = new THREE.Raycaster();

	escena2.raycaster.setFromCamera( escena2.mouse, escena2.camera );
	//let intersects = escena2.raycaster.intersectObjects( escena2.scene.children );
//	let intersects = escena2.raycaster.intersectObjects( escena2.scene.children );
	
	let intersects = escena2.raycaster.intersectObjects( escena2.cube );

	
	if ( intersects.length > 0 ) {

	    if ( escena2.INTERSECTED != intersects[ 0 ].object ) {
		
		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
		
		INTERSECTED = intersects[ 0 ].object;
		INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
		INTERSECTED.material.emissive.setHex( 0xffffff );

		if(INTERSECTED.text){
		
		    escena2.scene.add(INTERSECTED.text);
		    
		}
		
	    }
	    
	} else {
	    
	    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	    
	    INTERSECTED = null;
	    
	}


	//if(!INTERSECTED ==0){ 
	for(var i = 0; i < escena2.tam.length; i++){
	    escena2.cube[i].text.lookAt(escena2.camera.position); 
	}
	// }
	    

	escena2.renderer.render( escena2.scene, escena2.camera );

    },

    
}

escena2.init()
