let rule = [
	{
		name:"name", 
		checkType : "string", 
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位真实姓名",
	},
	{
		name:"company",
		checkType : "string",
		checkRule:"^.{1,50}$",
		errorMsg:"请输入长度1~50位的任职公司",
	},
	{
		name:"job",
		checkType : "string",
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位的现任职务",
	},
	{
		name:"email",
		checkType : "string",
		checkRule:"^.{1,40}$",
		errorMsg:"请输入长度1~40位的邮件",
	}
];

module.exports = rule