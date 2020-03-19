let rule = [
	{
		name:"companyName", 
		checkType : "string", 
		checkRule:"^.{1,50}$",
		errorMsg:"请输入长度1~50位企业全称",
	},
	{
		name:"companyShortName",
		checkType : "string",
		checkRule:"^.{0,15}$",
		errorMsg:"请输入有效的企业简称",
	},
	{
		name:"registerNo",
		checkType : "string",
		checkRule:"^(.{15}|.{18})$",
		errorMsg:"请输入有效的统一社会信用代码",
	},
	{
		name:"legarPerson",
		checkType : "string",
		checkRule:"^.{0,20}$",
		errorMsg:"请输入有效的法定代表人",
	},
	{
		name:"registerPhone",
		checkType : "phoneno",
		checkRule:"",
		errorMsg:"请输入正确的注册手机号",
	},
	{
		name:"registerName",
		checkType : "string",
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位注册人姓名",
	},
	{
		name:"registerJob",
		checkType : "string",
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位注册人职务",
	},
	{
		name:"leaderPhone",
		checkType : "phoneno",
		checkRule:"",
		errorMsg:"请输入正确的融资负责人手机号",
	},
	{
		name:"leaderName",
		checkType : "string",
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位融资负责人姓名",
	},
	{
		name:"leaderJob",
		checkType : "string",
		checkRule:"^.{1,20}$",
		errorMsg:"请输入长度1~20位融资负责人职务",
	},
	{
		name:"leaderTel",
		checkType : "string",
		checkRule:"^.{0,20}$",
		errorMsg:"请输入长度1~20位融资负责人座机",
	},
	{
		name:"leaderEmail",
		checkType : "string",
		checkRule:"^.{1,40}$",
		errorMsg:"请输入长度1~40位融资负责人邮箱",
	},
	{
		name:"registerMoney",
		checkType : "string",
		checkRule:"^(([^0][0-9]{1,13}|0)\.([0-9]{1})$)|^(([^0][0-9]{1,12}|0)\.([0-9]{1,2})$)|^([^0][0-9]{1,14}|0)$",
		// checkRule:"^(([^0][0-9]{1,14}|0)\.([0-9]{0,8})$)|^([^0][0-9]{1,14}|0)$",
		errorMsg:"请输入长度1~15位注册资本",
	},
	{
		name:"address",
		checkType : "string",
		checkRule:"^.{0,50}$",
		errorMsg:"请输入有效的详细地址",
	},
	{
		name:"website",
		checkType : "string",
		checkRule:"^.{0,50}$",
		errorMsg:"请输入有效的企业网址",
	},
	{
		name:"intro",
		checkType : "string",
		checkRule:"^.{1,500}$",
		errorMsg:"请输入长度1~500位企业介绍",
	}
];

module.exports = rule