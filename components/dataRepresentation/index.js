module.exports = {
    id: 'dataRepresentation',
    template: require('./index.html'),
    data: {
        allSelected: false,
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
        notifyToggleSelected: function() {
            var allSelected = this.allSelected;
            var dataSet = this.$data.dataSet;
            var allDataSelected = true;
            for (i = 0; i < dataSet.length; i++) {
                var data = dataSet[i];
                if (data && !data.isSelected) allSelected = false;
            }
            allSelected = allDataSelected;
        },
        toggleSelectAll: function() {
            this.allSelected = !this.allSelected;
            var allSelected = this.allSelected;
            var dataSet = this.$data.dataSet;
            for (i = 0; i < dataSet.length; i++) {
                var data = dataSet[i];
                if (data) data.isSelected = allSelected;
            }
        },
        removeSelected: function()
        {
            var dataSet = this.$data.dataSet;
            console.log(dataSet[1]);
            for (i = 0; i <= dataSet.length; i++) {
                var data = dataSet[i];
                if (data && data.isSelected) {
                    console.log('data out of dataset with index ' + i + ' is selected and should be deleted');
                    dataSet.$remove(i);
                }
            }
            //this.toggleReadAll();
        }
    }
};
