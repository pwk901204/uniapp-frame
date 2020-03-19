let rule = [
	
	{
		name:"name", 
		checkType : "string", 
		checkRule:"^.{1,15}$",
		errorMsg:"请输入长度1~15位真实姓名",
	},
	{
		name:"phone", 
		checkType : "phoneno", 
		checkRule:"",
		errorMsg:"请输入正确的手机号",
	},
	
	{
		name:"email",
		checkType : "email",
		checkRule:"^.{1,25}$",
		errorMsg:"请输入长度1~40位的邮件",
	},
	{
		name:"wechat",
		checkType : "string",
		isRequire:false,
		checkRule:"^.{0,25}$",
		errorMsg:"请输入长度1~25位的微信名",
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
		checkRule:"^.{1,25}$",
		errorMsg:"请输入长度1~25位的现任职务",
	}
];

module.exports = rule

