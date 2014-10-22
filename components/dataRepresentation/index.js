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
        removeSelected: function()
        {
            this.$data.dataSet = this.$data.dataSet.filter(function(dataSet) {
                return dataSet ? !dataSet.isSelected : false;
            });
        }
    },
    computed: {
        allSelected: {
            $get: function() {
                if (!this.$data) return false;
                var dataSet = this.$data.dataSet;
                var selected = true;
                for (i = 0; i < dataSet.length; i++) {
                    if (dataSet[i] && !dataSet[i].isSelected) selected = false;
                }
                return selected;
            },
            $set: function() {
                var dataSet = this.$data.dataSet;
                var selected = !this.allSelected;
                for (i = 0; i < dataSet.length; i++) {
                    if (dataSet[i]) dataSet[i].isSelected = selected;
                }
            }
        }
    }
};
