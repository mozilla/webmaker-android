module.exports = {
    ready: function () {
        console.log('ready!');

        window.BL = this; // TODO : TEMP REMOVE THIS
    },
    methods: {
        /**
         * Visually move a block above or below a sibling
         * @param  {Number} index     Index of block to move
         * @param  {String} direction Direction to move ('up' or 'down')
         */
        shiftBlock: function (index, direction) {

            // Error handling

            if (index < 0) {
                console.error('index can\'t be less than zero');
                return;
            } else if (index === 0 && direction === 'up') {
                console.error('block is already at the top');
                return;
            } else if (index === this.$el.children.length - 1 && direction === 'down') {
                console.error('block is already at the bottom')
                return;
            } else if (index >= this.$el.children.length) {
                console.error('index is out of bounds');
                return;
            }

            // Cache element references

            var elTarget = this.$el.querySelector('.inline-editor:nth-child(' + (index + 1) + ')');
            var elSwapTarget;

            if (direction === 'down') {
                elSwapTarget = this.$el.querySelector('.inline-editor:nth-child(' + (index + 2) + ')');
            } else if (direction === 'up') {
                elSwapTarget = this.$el.querySelector('.inline-editor:nth-child(' + index + ')');
            }

            // Get element heights

            var elTargetHeight = getComputedStyle(elTarget)['height'];
            var elSwapTargetHeight = getComputedStyle(elSwapTarget)['height'];

            // TODO - bubble out transition end events

            // Move elements

            if (direction === 'down') {
                elTarget.style.top = elSwapTargetHeight;
                elSwapTarget.style.top = '-' + elTargetHeight;
            } else if (direction === 'up') {
                elTarget.style.top = '-' + elSwapTargetHeight;
                elSwapTarget.style.top = elTargetHeight;
            }

        }
    }
};
