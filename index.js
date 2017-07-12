const redis = require('redis');
const axios = require('axios');

module.exports = (options) => {
	const { timeout, config } = options || { timeout: 10, config: null }
	const client = config ? redis.createClient(config) : redis.createClient();
	
	return ({ url }, callback) => {
		client.get(url, (error, result) => {
			if (error) {
				callback(error);
			} else if (result) {
				callback(null, result);
			} else {
				axios.get(url).then(({ data }) => {
					client.set(url, data, 'EX', timeout);
					callback(null, data);
				}).catch(error => {
					callback(error);
				})
			}
		});
	}
};