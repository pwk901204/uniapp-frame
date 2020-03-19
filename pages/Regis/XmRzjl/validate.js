let rule = [
	{
		name:"organization", 
		checkType : "string", 
		checkRule:"^.{1,50}$",
		errorMsg:"请输入长度1~50位投资机构",
	},
	{
		name:"money",
		checkType : "string",
		checkRule:"^.{0,8}$",
		errorMsg:"请输入长度0~8位融资金额",
	}
];

module.exports = rule