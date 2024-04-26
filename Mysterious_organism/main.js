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
				newBase = returnRandBase(); //Update newBase
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

			console.log(`${this.specimenNum} and ${pAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`)
			return percentage;
		},
		willLikelySurvive() {
			let gCount = 0;
			let cCount = 0;

			for (let i = 0; i < this.dna.length; i++) {

				if (this.dna[i] === 'G') {
					gCount++;
				} else if (this.dna[i] === 'C') {
					cCount++;
				}
			}

			let percentC = (cCount / this.dna.length) * 100;
			let percentG = (gCount / this.dna.length) * 100;

			return percentC >= 60 || percentG >= 60;
		},
		complementStrand(dnaStrand) {
			let complement = [];

			for (let i = 0; i < dnaStrand.length; i++) {
				let base = dnaStrand[i];

				switch (base) {
					case 'A':
						complement.push('T');
						break;
					case 'T':
						complement.push('A');
						break;
					case 'G':
						complement.push('C');
						break;
					case 'C':
						complement.push('G');
						break;
					default:
						console.error(`Invalid base found: ${base}`)
						return null;
				}
			}
			return complement;
		}

	}
}

const pAequorSurvivors = [];

for (let i = 0; i < 30; i++) {
	let dna = mockUpStrand();
	let pAequorInstance = pAequorFactory(i, dna);
	if (pAequorInstance.willLikelySurvive()) {
		pAequorSurvivors.push(pAequorInstance);
	} else {
		i--;
	}
}


console.log(pAequorSurvivors)
const pAequorInstance = pAequorFactory(1, mockUpStrand());
console.log(pAequorInstance)

// Call the complementStrand method on the instance
const complement = pAequorInstance.complementStrand(pAequorInstance.dna);
console.log(complement)

const anotherInstance = pAequorFactory(2, mockUpStrand());
const percentageSimilarity = pAequorInstance.compareDNA(anotherInstance)

let mostRelatedInstance1;
let mostRelatedInstance2;
let highestSimilarity = -1;

for (let i = 0; i < pAequorSurvivors.length; i++) {
	for (let j = i + 1; j < pAequorSurvivors.length; j++) {
		const similarityPercentage = pAequorSurvivors[i].compareDNA(pAequorSurvivors[j]);


		if (similarityPercentage > highestSimilarity) {
			highestSimilarity = similarityPercentage;
			mostRelatedInstance1 = pAequorSurvivors[i];
			mostRelatedInstance2 = pAequorSurvivors[j];
		}
	}


}

console.log(`The two most related instances of pAequor are:
  Specimen ${mostRelatedInstance1.specimenNum} and Specimen ${mostRelatedInstance2.specimenNum},
  with a DNA similarity of ${highestSimilarity.toFixed(2)}%.`);
