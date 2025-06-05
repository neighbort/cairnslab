const {requestGPIOAccess} = require("node-web-gpio");
async function gpioctl(gpiopin, pinval){
	const gpioAccess = await requestGPIOAccess();
	const port = gpioAccess.ports.get(gpiopin);
	await port.export("out");
	await port.write(pinval);
}

console.log(1);
console.log(14);
gpioctl(14,1);

async function slp(ms){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve();
			// reject();
		}, 1000*ms);
	});
}
slp(3).then(function(){
	console.log('hello world');
});

gpioctl(14,0);
