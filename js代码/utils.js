// 常用工具类函数

/**
 * 随机字符串
 */
const randomString = () =>
	Math.random()
		.toString(36)
		.substring(7)
		.split("")
		.join(".");
