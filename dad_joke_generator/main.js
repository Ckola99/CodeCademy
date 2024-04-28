const readline = require('readline');

const dadJokes = [
	'How many telemarketers does it take to change a light bulb ? Only one, but he has to do it while you are eating dinner.', 'How many narcissists does it take to screw in a light bulb ? One.The narcissist holds the light bulb while the rest of the world revolves around him.',
	'How many DIY buffs does it take to change a light bulb ? One, but it takes two weeks and four trips to the hardware store.', 'How many paranoids does it take to change a light bulb ? Who wants to know ?',
	"I read that by law you must turn on your headlights when it\’s raining in Sweden, but how am I supposed to know when it’s raining in Sweden ?", "I was addicted to the hokey pokey…but I turned myself around.", "I don’t trust stairs.They are always up to something.",
	"Today, my son asked, \“Can I have a bookmark ?\” I burst into tears—11 years old and he still doesn\’t know my name is Brian.",
	"When I was a kid, my dad got fired from his job as a road worker for theft.I refused to believe he could do such a thing, but when I got home, the signs were all there.",
	"Why didn’t Han Solo enjoy his steak dinner ? It was Chewie.", "What’s the best thing about Switzerland ? I don’t know, but the flag is a big plus."
];


const tellJoke = (name, arr) => {

	const random = Math.floor(Math.random() * arr.length)

	if (name) {
		console.log(`Hey ${name}.\n ${arr[random]}`)
	} else {
		console.log(`Hey stranger I'm John.`)
	}
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Hey what's your name? ", (name) => {
	tellJoke(name, dadJokes);
	rl.close();
});
