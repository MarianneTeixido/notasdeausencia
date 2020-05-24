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
	generateTexture: function(){

		if (escena1.parts.screenText){
			escena1.parts.screenText.geometry.dispose();
			escena1.parts.screenText.material.dispose();
			escena1.scene.remove(escena1.parts.screenText)
			escena1.renderer.renderLists.dispose()
		}
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = 1000
		canvas.height = 2100;

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
			//const starty = canvas.height - (content.length*50 * (i+1)) + Terminal.offset ;
			let starty = n
			content.forEach((line, j)=>{
				 ctx.fillText(line, 40, starty + (j*40) + Terminal.offset);
				n +=40
			})
			n+=40

		})
		

		const texture = new THREE.Texture(canvas)

		    texture.needsUpdate = true;
		let geom = new THREE.PlaneBufferGeometry(10, 21, 80);
		let mat = new THREE.MeshBasicMaterial( { map:texture, side:THREE.DoubleSide, transparent: true } );

		let plane = new THREE.Mesh(geom, mat);
		plane.position.x = escena1.parts.screen.position.x
		plane.position.y = escena1.parts.screen.position.y
		plane.position.z = escena1.parts.screen.position.z - 0.8
		plane.rotateY(Math.PI)
		plane.rotateX(Math.PI * -1/8)

		escena1.scene.add(plane)
		escena1.parts.screenText = plane
		


	},
	generate: function(){

		Terminal.getTweets()

		/*const resultText = Terminal.processText(`Amor, tranquilo, no te voy a molestar
		Amor, tranquilo, no te voy a molestar
		Mi suerte estaba echada, ya lo sé
		Y maullaré por ti`)
		Terminal.processText(`Amor, tranquilo, no te voy a molestar
		Amor, tranquilo, no te voy a molestar
		Mi suerte estaba echada, ya lo sé
		Y maullaré por ti`)
		*/
	},
	getTweets(){

		return fetch("/tweets/", {
			method: "GET",
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			mode: 'no-cors'
		}).then(async (response) => {
			let data = await response.json();
			data.tweets.forEach( (tweet_url, i)=>{
				await fetch(`/tweets/${tweet_url}`,{
					method: 'GET',
					headers : {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				}).then(async (tweet_data) => {
					console.log("getting data")
					let data = await tweet_data.json()
					Terminal.processText(data.full_text)
				})
			})
		}).then(()=>{
			console.log("generating texture")
			Terminal.generateTexture()
		})

	},
	fullContent:[],
	section: [],
	lengthLimit: 38,
	offset: 0
}


Terminal.generate()
