const escena2 = {

    init: function(){
	
	this.initScene();
	//this.addTextSpheres();
	this.addLight();
	this.addJsonText();
	this.animate();
	this.initControls();
	this.initRaycaster(); 
	this.render(); 
	
	// this.clock = new THREE.Clock();
	window.addEventListener('resize', this.handleResize); 
	
    },

    tweets: [],
    tam: [],
    esfericas: true,
    aleatorias: false,
    //cube: {},
    // text: {}, 
    cube: [],
    text: [],

    initScene: function(){

	//this.container = document.createElement( 'div' );
	//document.body.appendChild( this.container );

	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
	this.camera.position.z = 10;
	
	this.scene = new THREE.Scene();

	this.mouse = new THREE.Vector2(),

	this.raycaster = new THREE.Raycaster();

	
	this.renderer = new THREE.WebGLRenderer({antialias: true});
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

   
    initRaycaster: function(){

	//this.raycaster = new THREE.Raycaster();

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
		
		word = word.replace('á','\u00E1')
		word = word.replace('é','\u00E9')
		word = word.replace('í','\u00ED')
		word = word.replace('ó','\u00F3')
		word = word.replace('ú','\u00FA')
		word = word.replace('ú','\u00FA')
		word = word.replace('ñ','\u00F1')
		
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
	
	loader.load( '/static/fonts/helvetiker_bold.typeface.json', function ( font ) {
	    
	    for(var i = 0; i < escena2.tam.length ; i ++){   	       
		
		var geometry = new THREE.SphereGeometry(20, 20, 20);

		var material = new THREE.MeshStandardMaterial( {
		    color: 0xffffff,
		    metalness: params.metalness,
		    roughness: params.roughness
		} );

		// var material = new THREE.MeshLambertMaterial( { color: 0xffffff });

					   // geometry.center();
		//geometry.computeVertexNormals(); 
		geometry.computeBoundingBox();
		
		escena2.cube[i] = new THREE.Mesh( geometry, material );
		//escena2.cube = new THREE.Mesh( geometry, material );

		escena2.scene.add(escena2.cube[i]);
		
		var shapes = font.generateShapes( escena2.tweets[i], escena2.tam[i]/80 );
		var geometry2 = new THREE.ShapeBufferGeometry( shapes );

		// geometry.center(); 
		// geometry2.computeBoundingBox();
		
		escena2.text[i] = new THREE.Mesh( geometry2, material );
	

		//var posX, posY, posZ;

		if(escena2.aleatorias){

		    /*
		    var posX, posY, posZ;

		    posX = Math.random() * 20 - 10;
		    posY = Math.random() * 20 - 10;
		    posZ = Math.random() * 20 - 10;

		    escena2.cube[i].position.x = posX ;
		    escena2.cube[i].position.y = posY ;
		    escena2.cube[i].position.z = posZ ;
		    
		    escena2.cube[i].scale.x = escena2.tam[i]/1500;
		    escena2.cube[i].scale.y = escena2.tam[i]/1500;
		    escena2.cube[i].scale.z = escena2.tam[i]/1500;
		    */

		    var posX, posY, posZ;
		    
		    var theta1 = Math.random() * (Math.PI*2);
		    var theta2 = Math.random() * (Math.PI*2); 
		    
		    posX = Math.cos(theta1) * Math.cos(theta2);
		    posY = Math.sin(theta1);
		    posZ = Math.cos(theta1) * Math.sin(theta2);
		    
		    escena2.cube[i].position.x = posX * (Math.random() * 100);
		    escena2.cube[i].position.y = posY * (Math.random() * 100);
		    escena2.cube[i].position.z = posZ * (Math.random() * 100);
		    
		    escena2.cube[i].scale.x = escena2.tam[i]/2500;
		    escena2.cube[i].scale.y = escena2.tam[i]/2500;
		    escena2.cube[i].scale.z = escena2.tam[i]/2500;
	
		    
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
		    
		}
		
		//cube.lookAt(0, 0, 0); 
		
		//cube[i].matrixAutoUpdate = false;
		// cube[i].updateMatrix();
		
		
		escena2.text[i].position.x = posX * (0.5 * escena2.tam[i]);
		escena2.text[i].position.y = posY * (0.5 * escena2.tam[i]);
		escena2.text[i].position.z = posZ * (0.5 * escena2.tam[i]);
		
		//escena2.text[i].lookAt(0, 0, 0); 

		escena2.cube[i].text = escena2.text[i];
		// pregunta, esto podría estar fuera del for sin los indices?
		// escena2.scene.add(escena2.text[i]);
		
	    }
	    
	})

	
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

	
	escena2.camera.updateMatrixWorld(); 

	var INTERSECTED;

	// escena2.raycaster = new THREE.Raycaster();

	escena2.raycaster.setFromCamera( escena2.mouse, escena2.camera );
	//let intersects = escena2.raycaster.intersectObjects( escena2.scene.children );
	let intersects = escena2.raycaster.intersectObjects( escena2.scene.children );
	
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
