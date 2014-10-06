function Data(appId) {
    var self = this;

	self.appId = appId;
	self.collectedData = {};
}

Data.prototype.collect = function(blockId, key, value) {
    var self = this;

	self.collectedData[blockId] = value;

	console.log('[Data] recieved something');
	console.log(self.appId);
	console.log(blockId);
	console.log(key);
	console.log(value);
	console.log('-----');
	console.log(self.collectedData);
	console.log('-----');
};

module.exports = Data;
