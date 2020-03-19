let rule = [
	{
		name:"investmentCase", 
		checkType : "string", 
		checkRule:"^.{0,500}$",
		errorMsg:"请输入长度为0~500位的投资案例",
	},
	{
		name:"personalExper",
		checkType : "string",
		checkRule:"^.{0,500}$",
		errorMsg:"请输入长度为0~500位的个人经历",
	}
];

module.exports = rule