/**
 * 设置cookie
 * @param {String} name  键名
 * @param {String} value 键值
 * @param {Number} expireDays 有效天数
 */
export function setCookie(name, value, expireDays) {
	let baseStr = name + "=" + encodeURIComponent(value);
	if (expireDays) {
		let date = new Date();
		date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
		baseStr += `;expires=${date.toGMTString()}`;
	}
	document.cookie = baseStr;
}

/**
 * 获取cookie值
 * @param  {String} name 键名
 * @return {String} 键值
 */
export function getCookie(name) {
	let _name = name + "=";
	let arr = document.cookie.split(";");
	while (arr.length) {
		let item = arr.splice(0, 1)[0];
		let val = typeof item === "string" && item.trim();
		if (_name && val && val.indexOf(_name) === 0)
			return val.substring(_name.length, val.length);
	}
	return "";
}

/**
 * 删除Cookie
 * @param  {String} name 键名
 */
export function deleteCookie(name) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	let val = getCookie(name);
	document.cookie = `${name}=${val};expires=${exp.toGMTString()}`;
}
