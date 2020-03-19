let rule = [
	{
		name:"businessIncome", 
		checkType : "string", 
		checkRule:"^([1-9][0-9]{0,7})$",
		errorMsg:"请输入长度1~8位营业收入",
	},
	{
		name:"businessIncome", 
		checkType : "string", 
		checkRule:"^([1-9][0-9]{0,7})$",
		errorMsg:"请输入长度1~8位营业收入",
	},
	{
		name:"netProfit", 
		checkType : "string", 
		checkRule:"^(-?[1-9][0-9]{0,7})$",
		errorMsg:"请输入长度1~8位净利润",
	},
	{
		name:"totalAssets", 
		checkType : "string", 
		checkRule:"^([1-9][0-9]{0,7})$",
		errorMsg:"请输入长度1~8位总资产",
	},
	{
		name:"totalLiabilities", 
		checkType : "string", 
		checkRule:"^(0|[1-9][0-9]{0,14})$",
		errorMsg:"请输入长度1~8位总负债",
	}
];

module.exports = rule