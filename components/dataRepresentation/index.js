module.exports = {
    id: 'dataRepresentation',
    template: require('./index.html'),
    data: {
        isInteractive: true,
        sortOldest: false,
        sortKey: 'submitted',
        sortOptions: ['Newest', 'Oldest'],
        initialDataLoaded: false
    },
    methods: {
        formatUnixTime: function(unix) {
            var date = new Date(unix);
            var options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return date.toLocaleTimeString('en-US', options);
        },
        actionButton: function() {
			var self = this;
            if (this.countSelected > 0) {
				for (var i = 0; i < self.$data.dataSet.length; i++) {
					if (self.$data.dataSet[i].isSelected) {
						self.$dispatch('dataDelete', self.$data.dataSet[i].firebaseId);
					}
				}
            }
        }
    },
    computed: {
        countSelected: function() {
            if (!this.$data) return false;
            var dataSet = this.$data.dataSet;
            var count = 0;
            for (var i = 0; i < dataSet.length; i++) {
                if (dataSet[i] && dataSet[i].isSelected) count++;
            }
            return count;
        },
		countDataSets: function() {
			if (!this.$data) return 0;
			return this.$data.dataSet.length;
		},
        allSelected: {
            $get: function() {
                if (!this.$data) return false;
                return this.$data.dataSet.length !== 0 && this.countSelected === this.$data.dataSet.length;
            },
            $set: function(toValue) {
                var dataSet = this.$data.dataSet;
                for (var i = 0; i < dataSet.length; i++) {
                    if (dataSet[i]) dataSet[i].isSelected = toValue;
                }
            }
        }
    }
};
