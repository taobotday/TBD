module.exports.config = {
	name: "setkey",	
       version: "1.0.0",
	hasPermssion: 1,
	credits: "Miraiv2",
	description: "Chỉnh sửa api key data Youtube v3.",
	commandCategory: "admin",
	usages: "setkey [key]",
	cooldowns: 5,
};

module.exports.run = async function({ global, api, event, args, client }) {
var config = require(client.dirConfig);
var fs = require("fs-extra");
      config.sing.YOUTUBE_API = `${args.join("")}`;
  fs.writeFileSync(client.dirConfig, JSON.stringify(config, "utf-8"));
    	api.sendMessage("loading...", event.threadID, () => require("node-cmd").run("pm2 restart 0"));		
}