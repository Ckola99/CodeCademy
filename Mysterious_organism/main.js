// Returns a random DNA base
const returnRandBase = () => {
	const dnaBases = ['A', 'T', 'C', 'G']
	return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
	const newStrand = []
	for (let i = 0; i < 15; i++) {
		newStrand.push(returnRandBase())
	}
	return newStrand
}

const pAequorFactory = (num, arr) => {
	return {
		specimenNum: num,
		dna: arr,
		mutate() {
			const randomIndex = Math.floor(Math.random() * this.dna.length);
			const currentBase = this.dna[randomIndex];
			let newBase = returnRandBase();

			while (newBase === currentBase) {
				returnRandBase();
			}

			this.dna[randomIndex] = newBase;
			return this.dna;
		},
		compareDNA(pAequor) {
			let pArr = pAequor.dna;
			let similarityCount = 0;


			for (let i = 0; i < this.dna.length; i++) {
				if (this.dna[i] === pArr[i]) {
					similarityCount++;
				}
			}

			let percentage = (similarityCount / this.dna.length) * 100;

			console.log(`${this.specimenNum} and ${pAequor.specimenNum} have ${percentage}% DNA in common.`)
		},
		willLikelySurvive() {
			let gCount = 0;
			let cCount = 0;

			for(let i = 0; i < this.dna.length; i++) {

				if(this.dna[i] === 'G') {
					gCount++;
				} else if (this.dna[i] === 'C') {
					cCount++;
				}
			}

			let percentC = (cCount / this.dna.length) * 100;
			let percentG = (gCount / this.dna.length) * 100;

			return percentC >= 60 || percentG >= 60;
		}

	}
}

const pAequorSurvivors = [];

for (let i = 0; i < 30; i++) {
	let dna = mockUpStrand();
	let pAequorInstance = pAequorFactory(i, dna);
	if(pAequorInstance.willLikelySurvive()) {
		pAequorSurvivors.push(pAequorInstance);
	} else {
		i--;
	}
}


console.log(pAequorSurvivors)
