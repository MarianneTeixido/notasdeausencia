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
/*
		const splitText = function(text){
			let splitted = text.split('\n')

			let words = splitted.map((line)=>{
				return  line.split(' ').filter((x) => x!='')
			})
			return words
		}

		const truncText = function(words){

                        const limit = Terminal.lengthLimit;

			words = words.map((word)=>{
				let cut = []
				while(word.length>limit){
					let substr = word.substr(0, limit-1)
					cut.push(substr)
					word = word.substr(limit-1)
				}
				cut.push(word)
				return cut
			})
			words = words.filter((word)=> word!='')

                        let resline = []
			words.forEach((word)=>{
				cut = ""

				while(word.length > 0){
					if(cut.length + word[0].length + 1 < limit){
						cut += word[0] + " "
					}else{
						resline.push(cut)
						cut = ""
					}
					word.shift()
				}
				resline.push(cut)
			})
                        return resline.join('')
                }
		let lines = splitText(text)
		let res = lines.map((line)=>{
			return truncText(line)
		})
		*/
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
		Terminal.getTweets("tweets/1259516018537435142.json")
		Terminal.getTweets("tweets/1259515255379689472.json")
		Terminal.getTweets("tweets/1259966178174341127.json")
		Terminal.getTweets("tweets/1261318959401447427.json")
		Terminal.getTweets("tweets/1261209289378725888.json")
		Terminal.getTweets("tweets/1259609200755445763.json")
		Terminal.getTweets("tweets/1259606868579753984.json")
		Terminal.getTweets("tweets/1259700922499977216.json")
		Terminal.getTweets("tweets/1261287656211783681.json")
		Terminal.getTweets("tweets/1259701002976051200.json")

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
	getTweets(url){

		return fetch(url,{
			method: "GET",
			headers : {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			mode: 'no-cors'
		}).then(async (response) => {
			let data = await response.json();
			Terminal.processText(await data.full_text)
			Terminal.generateTexture()
		})
	},
	fullContent:[],
	section: [],
	lengthLimit: 38,
	offset: 0
}


Terminal.generate()
