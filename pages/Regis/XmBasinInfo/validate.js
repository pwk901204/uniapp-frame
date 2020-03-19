let rule = [
	{
		name:"projectName", 
		checkType : "string", 
		checkRule:"^.{1,50}$",
		errorMsg:"请输入长度1~50位项目名称",
	},
	{
		name:"xmjs",
		checkType : "string",
		checkRule:"^.{1,500}$",
		errorMsg:"请输入长度1~500位项目介绍",
	}
];

module.exports = rule