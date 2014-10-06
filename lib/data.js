function Data(appId) {
    var self = this;

	self.appId = appId;
	self.collectedData = {};
}

Data.prototype.collect = function(index, value, label) {
    var self = this;
	console.log('[Data] collected some Data');

	// create object for index if it does not exist already
	if(typeof self.collectedData[index] == 'undefined') {
		self.collectedData[index] = {blockIndex: index};
	}

	if((typeof label == 'undefined' && typeof self.collectedData[index]['label'] == 'undefined') || typeof label !== 'undefined') {
		if (typeof label == 'undefined' && typeof self.collectedData[index]['label'] == 'undefined') {
			self.collectedData[index]['label'] = 'unnamed';
		} else if (typeof label !== 'undefined') {
			self.collectedData[index]['label'] = label;
		}

		// label changed / update internalIndex
		self.collectedData[index]['internalIndex'] = self.collectedData[index]['label'].replace(/ /g, '').toLowerCase() + '_' + index;
	}

	// set new value
	self.collectedData[index]['value'] = value;
};

Data.prototype.save = function() {
	var self = this;
	console.log('[Data] save');

	console.log(self.collectedData);
};

module.exports = Data;
