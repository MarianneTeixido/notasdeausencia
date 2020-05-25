// Memorial
// reescritura
// Espejos
// Creditos

const Terminal = {

	processText: function(text){

		const limit = this.lengthLimit;
		text = text.split('\n')
		let res = []
		text.forEach((line)=>{
			while(line.length>limit){
				substr = line.substr(0, limit)
				res.push(substr)
				line = line.substr(limit)
			}
			res.push(line)
		})
		this.fullContent.push(res)

		return res
	},
	generateScroll: function(){
		const geom = new THREE.Geometry()
		const geom2 = new THREE.Geometry()
		const mat = new THREE.MeshBasicMaterial( 
			{
				color: 0x000000,
				side:THREE.DoubleSide,
				transparent: true,
				opacity: 0.5
			});
		const mat2 = new THREE.MeshBasicMaterial( 
			{
				color: 0x000000,
				side:THREE.DoubleSide,
				transparent: true,
				opacity: 0.5
			});
		let p1 = new THREE.Vector3(0,0,0)
		let p2 = new THREE.Vector3(4, 0,0)
		let p3 = new THREE.Vector3(2, 1,0)
		geom.vertices.push(p1)
		geom.vertices.push(p2)
		geom.vertices.push(p3)

		geom.faces.push(new THREE.Face3(0,1,2))
		geom.computeFaceNormals();

		let arrow_up = new THREE.Mesh(geom, mat);
		
		arrow_up.rotateX(Math.PI * 1/8)
		arrow_up.position.x = escena1.parts.screenText.position.x -= 2
		arrow_up.position.y = escena1.parts.screenText.position.y * 1.5
		arrow_up.position.z = 11.5;
		
		let p4 = new THREE.Vector3(0, 0, 0)
		let p5 = new THREE.Vector3(4, 0, 0)
		let p6 = new THREE.Vector3(2, -1, 0)

		geom2.vertices.push(p4)
		geom2.vertices.push(p5)
		geom2.vertices.push(p6)
		
		geom2.faces.push(new THREE.Face3(0,1,2))
		geom2.computeFaceNormals();
		
		let arrow_down = new THREE.Mesh(geom2, mat2);
		arrow_down.rotateX(Math.PI * -1/8)
		arrow_down.position.x = 8
		arrow_down.position.y = 1.5
		arrow_down.position.z = 5.1
		
		escena1.scene.add(arrow_up)
		escena1.scene.add(arrow_down)
	
		escena1.parts.arrowUp = arrow_up
		escena1.parts.arrowDown = arrow_down
	},
	generateTexture: function(){

		if (escena1.parts.screenText){
			escena1.parts.screenText.geometry.dispose();
			escena1.parts.screenText.material.dispose();
			escena1.scene.remove(escena1.parts.screenText)
			escena1.renderer.renderLists.dispose()
		}
		const canvas =  document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = 1000
		canvas.height = 2050;

		ctx.font = "40px Courier New";
		ctx.fillStyle = "white";

		let n = 0;
		this.fullContent.forEach((content)=>{
			content.forEach((linw)=>{
				n+=40;
			})
				n+=40;
		})
		n = canvas.height - n
		this.fullContent.forEach(function(content, i){
			let starty = n
			content.forEach((line, j)=>{
				 ctx.fillText(line, 40, starty + (j*40) + Terminal.offset);
				n +=40
			})
			n+=40
		})
		

		const texture = new THREE.Texture(canvas)

		    texture.needsUpdate = true;
		let geom = new THREE.PlaneBufferGeometry(10, 20, 80);
		let mat = new THREE.MeshBasicMaterial(
			{
				map:texture,
				side:THREE.DoubleSide,
				transparent:true
			});

		let plane = new THREE.Mesh(geom, mat);
		plane.position.x = escena1.parts.screen.position.x
		plane.position.y = escena1.parts.screen.position.y + 0.7 
		plane.position.z = escena1.parts.screen.position.z - 0.8
		plane.rotateY(Math.PI)
		plane.rotateX(Math.PI * -1/8)

		escena1.scene.add(plane)
		escena1.parts.screenText = plane

	},
	generate: function(){

		Terminal.getTweets()

	},
	getTweets(){

		Terminal.generateTexture();
		fetch("/tweets/", {
			method: "GET",
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		}).then(async (response) => {
			let data = await response.json();
			const fetching_tweets =  data.tweets.map( (tweet_url)=>{
				 return fetch(`/tweets/${tweet_url}`,{
					method: 'GET',
					headers : {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}).then(async (tweet_data) => {
					let data = await tweet_data.json()
					Terminal.processText(data.full_text)
				})
			})
			
			Promise.all(fetching_tweets).then(()=>{
				Terminal.fullContent.shift()
				Terminal.generateTexture()
			})
		})

	},
	fullContent:[['Loading tweets...']],
	section: [],
	lengthLimit: 50,
	offset: 0,
	scroll: 0
}


Terminal.generate()
Terminal.generateScroll()
