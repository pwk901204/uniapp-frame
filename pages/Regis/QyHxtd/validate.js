let rule = [
	{
		name:"userName", 
		checkType : "string", 
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位姓名",
	},
	{
		name:"userJob", 
		checkType : "string", 
		checkRule:"^.{1,50}$",
		errorMsg:"请输入长度1~50位职务名称",
	},
	{
		name:"userIntro", 
		checkType : "string", 
		checkRule:"^.{1,500}$",
		errorMsg:"请输入长度1~500个人经历",
	}
];

module.exports = rule