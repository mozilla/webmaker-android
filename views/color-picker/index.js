var view = require('../../lib/view');

module.exports = view.extend({
    id: 'color-picker',
    template: require('./index.html'),
    data: {
        back: true,
        title: 'Select Color',
        onSelect: function (e) {
            var selectedClass = 'selected';
            var previouslySelected = document.querySelector('#color-picker .' + selectedClass);
            if (previouslySelected) previouslySelected.classList.remove(selectedClass);
            e.target.classList.add(selectedClass);
        },
        primaryColors: [
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FEE444'
            },
            {
                hex: '#1CB0B4'
            },
            {
                hex: '#31ABDF'
            }
        ],
        colors: [
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FC5D5E'
            },
            {
                hex: '#FC5D5E'
            }
        ]
    }
});
