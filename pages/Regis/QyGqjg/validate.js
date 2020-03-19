let rule = [
	{
		name:"ownerName", 
		checkType : "string", 
		checkRule:"^.{0,30}$",
		errorMsg:"请输入长度0~30位股东名称",
	},
	{
		name:"ownerPercentage", 
		checkType : "string", 
		checkRule:"^.{0,8}$",
		errorMsg:"请输入长度0~8位股权比例",
	}
];

module.exports = rule