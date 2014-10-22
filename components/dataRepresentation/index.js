module.exports = {
    id: 'dataRepresentation',
    template: require('./index.html'),
    data: {
        isInteractive: true,
        sortOldest: false,
        sortKey: 'submitted'
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
        actionButton: function()
        {
            if (this.countSelected === 0)
            {
                //nothing in here ;( maybe you want to create some link sharing logic in here
            }
            else
            {
                this.$data.dataSet = this.$data.dataSet.filter(function(dataSet) {
                    return dataSet ? !dataSet.isSelected : false;
                });
            }
        }
    },
    computed: {
        countSelected: function() {
            if (!this.$data) return false;
            var dataSet = this.$data.dataSet;
            var count = 0;
            for (i = 0; i < dataSet.length; i++) {
                if (dataSet[i] && dataSet[i].isSelected) count++;
            }
            return count;
        },
        allSelected: {
            $get: function() {
                if (!this.$data) return false;
                return this.$data.dataSet.length !== 0 && this.countSelected === this.$data.dataSet.length;
            },
            $set: function(toValue) {
                var dataSet = this.$data.dataSet;
                for (i = 0; i < dataSet.length; i++) {
                    if (dataSet[i]) dataSet[i].isSelected = toValue;
                }
            }
        }
    }
};
