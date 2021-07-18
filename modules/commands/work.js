module.exports.config = {
	name: 'work',
	version: '0.0.1',
	hasPermssion: 0,
	credits: 'KHIÊM DỄ THƯƠNG',
	description: 'Có làm thì mới có ăn.',
	commandCategory: 'Economy',
	cooldowns: 5,
	envConfig: {
		cooldownTime: 300000
	}
};

module.exports.run = async ({ event, api, Currencies }) => {
	const { threadID, messageID, senderID } = event;

	const cooldown = global.configModule[this.config.name].cooldownTime;
	let data = (await Currencies.getData(senderID)).data || {};
	if (
		typeof data !== 'undefined' &&
		cooldown - (Date.now() - data.workTime) > 0
	) {
		var time = cooldown - (Date.now() - data.workTime),
			minutes = Math.floor(time / 60000),
			seconds = ((time % 60000) / 1000).toFixed(0);

		return api.sendMessage(
			`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${
				seconds < 10 ? '0' : ''
			}${seconds} giây!`,
			event.threadID,
			event.messageID
		);
	} else {
		const job = [
			'BÁN VÉ SỐ',
			'BÁN GỎI VỊT',
			'BỆNH THIỂU NĂNG',
			'BÁN THỊT HEO',
			'THỢ CẮT TÓC',
			'CHẠY XE ÔM'
		];
		const amount = Math.floor(Math.random() * 200);
		return api.sendMessage(
			`Bạn ${
				job[Math.floor(Math.random() * job.length)]
			} và đã nhận được số tiền là: ${amount} đô la, để có thể tiếp tục nhận, vui lòng quay lại sau 5 phút.`,
			threadID,
			async () => {
				await Currencies.increaseMoney(senderID, parseInt(amount));
				data.workTime = Date.now();
				await Currencies.setData(event.senderID, { data });
				return;
			},
			messageID
		);
	}
};
