let rule = [
	{
		name:"phone", 
		checkType : "phoneno", 
		checkRule:"",
		errorMsg:"请输入正确的手机号码",
	},
	{
		name:"registerSmsCode",
		checkType : "notnull",
		checkRule:"",
		errorMsg:"请输入验证码",
	},
	{
		name:"password",
		checkType : "string",
		checkRule:"^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$",
		errorMsg:"请输入8到16位字母和数字组合的密码",
	},
	{
		name:"confirmPassword",
		checkType : "string",
		checkRule:"^(?![^a-zA-Z]+$)(?!\\D+$).{8,16}$",
		errorMsg:"请输入8到16位字母和数字组合的密码",
	}
];

module.exports = rule