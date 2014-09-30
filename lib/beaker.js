
function send (data) {
	parent.postMessage(JSON.stringify(data), "*");
}

function Beaker () {
	// generate a mock api
	this.addAPI = function (api) {
		var obj = this;

		var parts = api.split(".");
		parts.forEach(function (curr, i) {
			console.log(curr, i)
			if (i == parts.length - 1) {
				obj[curr] = createHandler(api);
			}

			if (!obj[curr]) {
				obj[curr] = {};
				obj = obj[curr];
			}
		});
	}

	function createHandler (api) {
		return function () {
			var payload = {api: api, args: arguments};
			send(payload);
		};
	}
}

var beaker = new Beaker();
beaker.addAPI("navigator.mozContacts.getAll");
console.log(beaker)

module.exports = beaker;
