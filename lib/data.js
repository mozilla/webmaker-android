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
		if((typeof label == 'undefined' && typeof self.collectedData[index]['label'] == 'undefined') || label == '') {
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

Data.prototype.getAllDataSets = function() {
	var self = this;
	console.log('[Data] receiving all data sets for current app');

	return [
		{
			userId: 123,
			submitted: 1412615205549,
			dataBlocks: [
				{
					blockIndex: 0,
					internalIndex: 'foobar_0',
					label: 'Name',
					value: 'Tim'
				},
				{
					blockIndex: 1,
					internalIndex: 'foobar_1',
					label: 'Age',
					value: '21'
				}
			]
		},
		{
			userId: 12,
			submitted: 1412613205549,
			dataBlocks: [
				{
					blockIndex: 0,
					internalIndex: 'foobar_0',
					label: 'Name',
					value: 'Martin'
				},
				{
					blockIndex: 1,
					internalIndex: 'foobar_1',
					label: 'Age',
					value: '19'
				},
				{
					blockIndex: 2,
					internalIndex: 'foobar_2',
					label: 'Eye Color',
					value: 'Green'
				}
			]
		}
	];
};

module.exports = Data;
