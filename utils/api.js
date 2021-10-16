//二次封装接口 

// const BASE_URL = 'https://ams.renmopr.com/mcc';
// const BASE_URL = 'http://10.0.110.56:8080';
const BASE_URL = 'http://139.196.219.154:80/emerald';

export const generalRequest = (options) => {
	// let obj = get_token();
	// Object.assign(options.data,obj)
	// return Promise((resolve, reject) => {
	// 	uni.request({
	// 		url: BASE_URL + options.url,
	// 		method: options.method || 'GET',
	// 		data: options.data || {},
	// 		header: {
	// 			'content-type': 'application/x-www-form-urlencoded',
	// 			'AuthToken':get_token()
	// 		} || {
	// 			'content-type': 'application/json'
	// 		}, //自定义请求头
	// 		success: (res) => {
	// 			resolve(res)
	// 		},
	// 		fail: (err) => {
	// 			reject(err)
	// 		}
	// 	})
	// })
	
	return new Promise((resolve, reject) => {
	    uni.request({
	        url: BASE_URL + options.url,
	        method: options.method || 'POST',
	        data: options.data || {},
			header:{
				'AuthToken':get_token().token
			},
	        success: (res) => {
	            resolve(res)
	        },
	        fail: (err) => {
	            reject(err)
	        }
	    })
	})
}

export const myRequest = (options) => {
	//let obj = get_token();
	//Object.assign(options.data,obj)
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + options.url,
            method: options.method || 'POST',
            data: options.data || {},
            success: (res) => {
                // if(res.data.status !== 200){
                //     return uni.showToast()({
                //         title: '获取数据失败'
                //     })
                // }
                resolve(res)
            },
            fail: (err) => {
                // uni.showToast()({
                //     title: '请求接口失败'
                // })
                reject(err)
            }
        })
    })
}
function get_token() {
	let token = uni.getStorageSync('authToken');
	return token
}
