module.exports.config = {
	name: 'daily',
	version: '0.0.1',
	hasPermssion: 0,
	credits: 'Miraiv2',
	description: 'Nhận 1000 đô la 10 phút!.',
	commandCategory: 'economy',
	cooldowns: 5,
	envConfig: {
		cooldownTime: 600000,
		rewardCoin: 1000
	}
};

module.exports.run = async ({ event, api, Currencies }) => {
	const { daily } = global.configModule,
		cooldownTime = daily.cooldownTime,
		rewardCoin = daily.rewardCoin;

	var { senderID, threadID } = event;

	let data = (await Currencies.getData(senderID)).data || {};
	if (
		typeof data !== 'undefined' &&
		cooldownTime - (Date.now() - (data.dailyCoolDown || 0)) > 0
	) {
		var time = cooldownTime - (Date.now() - data.dailyCoolDown),
			minutes = Math.floor(time / 60000),
			seconds = ((time % 60000) / 1000).toFixed(0);

		return api.sendMessage(
			`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${
				seconds < 10 ? '0' : ''
			}${seconds} giây!`,
			threadID
		);
	} else
		return api.sendMessage(
			`Bạn đã nhận ${rewardCoin} đô la, để có thể tiếp tục nhận, vui lòng quay lại sau 10 phút.`,
			threadID,
			async () => {
				await Currencies.increaseMoney(senderID, rewardCoin);
				data.dailyCoolDown = Date.now();
				await Currencies.setData(senderID, { data });
				return;
			}
		);
};
