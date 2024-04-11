module.exports.config = {
	name: "faceswap",
	version: "1.0.0",
	credits: "Samir",
	hasPermision: 0,
	cooldowns: 15,
	usePrefix: false,
	description: "Swap faces in two images",
	commandCategory: "FUN",
	usage: "",
};

module.exports.run = async function({ args, event, api }) {
	try {
		if (event.type != "message_reply") {
			return api.sendMessage("Please reply to a message with two images attached.", event.threadID);
		}

		let links = [];
		for (let attachment of event.messageReply.attachments) {
			links.push(attachment.url);
		}

		if (links.length < 2) {
			return api.sendMessage("Please ensure there are exactly two images attached.", event.threadID);
		}

		const shortLink1 = await global.utils.uploadImgbb(links[0]);
		const Url1 = shortLink1.image.url;

		const shortLink2 = await global.utils.uploadImgbb(links[1]);
		const Url2 = shortLink2.image.url;

		let swapface = `https://apis-samir.onrender.com/faceswap?sourceUrl=${Url1}&targetUrl=${Url2}`;
		const stream = await global.utils.getStreamFromURL(swapface);
		api.sendMessage({ attachment: stream }, event.threadID);
	} catch (error) {
		console.error(error);
		api.sendMessage("An error occurred while processing the face swap.", event.threadID);
	}
};