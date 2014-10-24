var firebase = require('Firebase');
var config = require('../config');

function Data(appId) {
    var self = this;

	self.appId = appId;
	self.collectedData = {};
	self.collectedDataSaved = false;

	self.firebaseConnection = new Firebase(config.FIREBASE_URL + '/' + appId);

	if(self.firebaseConnection.getAuth() == null) {
		self.firebaseConnection.authAnonymously(function(error, authData) {
			if(error) {
				console.log('[Data] auth with FireBase failed: ', authData);
			} else {
				console.log('[Data] auth with FireBase');
			}
		});
	} else {
		console.log('[Data] skipping auth with FireBase');
	}
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

	if(self.collectedDataSaved == false) {
		console.log('[Data] save');

		self.collectedDataSaved = true;
		self.firebaseConnection.push({
			submitted: Date.now(),
			dataBlocks: self.collectedData
		});
	}
};

Data.prototype.getCurrentCollectedCount = function() {
	var self = this;
	console.log('[Data] collectedCount');

	return Object.keys(self.collectedData).length;
};

Data.prototype.getAllDataSets = function(callback) {
	var self = this;

	self.firebaseConnection.on('value', function(dataSnapshot) {
		console.log('[Data] received data sets for current app');

		dataSets = [];
		if(dataSnapshot != null) {
			dataSnapshot = dataSnapshot.val();

			for(i in dataSnapshot) {
				if(dataSnapshot.hasOwnProperty(i)){
					dataSets.push(dataSnapshot[i]);
				}
			}
		}

		callback(dataSets);
	});
};

module.exports = Data;
