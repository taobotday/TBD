module.exports.config = {
	name: "lucky",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Miraiv2",
	description: "Đoán con số may mắn từ 0 đến 10.",
	commandCategory: "Economy",
	usages: "[1-10]",
    cooldowns: 5,
    dependencies: [],
};

module.exports.run = async ({ event, api, Currencies,args }) => {
 const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
  var data = await Currencies.getData(event.senderID);
  var money = data.money
  var i = 1000;
  var number = getRandomInt(0, 5)
  if(money < 100) api.sendMessage("Bạn không đủ tiền !",event.threadID,event.messageID)
    else {
      if(!args[0]) api.sendMessage("Không có số dự đoán.",event.threadID,event.messageID)
        else{
         if(args[0] > 10) api.sendMessage("Dự đoán không được lớn hơn 10.",event.threadID,event.messageID)
           else {
             if(args[0] == number){
                 api.sendMessage(number + " chính là con số may mắn, bạn đã nhận được 1000 đô.", event.threadID, () => Currencies.setData(event.senderID, options = {money: money + parseInt(i)}),event.messageID);
                }
         else api.sendMessage("Con số may mắn là " + number + "\n" + "Chúc bạn may mắn lần sau nhaaa !\n====Lưu ý====\nSau mỗi lần đoán sai, bạn sẽ bị trừ 100 đô, nếu bạn đúng bạn sẽ nhận lại 1000 đô.",event.threadID, () => Currencies.setData(event.senderID, options = {money: money - 100}),event.messageID);
      }
    }
  }
};