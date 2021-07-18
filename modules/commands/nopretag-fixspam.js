const fs = require('fs'); //để thêm attachment nếu muốn
module.exports.config = {
	name: 'nopre-tag-fixspam',
	version: '1.0.0',
	hasPermssion: 0,
	credits: 'Miraiv2',
	description: 'nopre-fixspam',
	commandCategory: 'NoPrefix',
	usages: 'noprefix',
	cooldowns: 5
};
module.exports.event = async ({ api, event, Users }) => {
	var { threadID, messageID, senderID } = event;
	if (senderID !== '100070635323466') {
		//chỗ này thay id bot vào
		var mention = Object.keys(event.mentions)[0];
		let tag = event.mentions[mention];
		let output = 'BỚT SPAM DÙM TAO CÁI.. '; //câu mà bot rep
		let varinput = ['input1 ', 'input2 ']; //danh sách input
		for (const i of varinput) {
			input = i + tag;
			if (event.body.indexOf(input) == 0 && event.body.length == input.length) {
				return api.sendMessage(
					{
						body: output + tag,
						mentions: [
							{
								tag: tag.replace('@', ''),
								id: mention
							}
						]
					},
					threadID,
					messageID
				);
			}
		}
	}
};
module.exports.run = function({}) {};
