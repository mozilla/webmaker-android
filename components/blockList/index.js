var transitionEndEventName = require('../../lib/transition-end-name')();

module.exports = {
    ready: function () {
        var self = this;

        if (!self.appid) {
            self.$watch('appid', function () {
                self.appReference = self.$root.storage.getApp(self.appid);
            });
        } else {
            self.appReference = self.$root.storage.getApp(self.appid);
        }

        self.$on('shiftBlock', function (event) {
            self.shiftBlock(event.index, event.steps);
        });

        self.$on('deleteBlock', function (event) {
            self.deleteBlock(event.index);
        });

        self.$on('cloneBlock', function (event) {
            self.cloneBlock(event.index);
        });
    },
    methods: {
        /**
         * Remove a block
         * @param  {Number} index Index of block to delete
         */
        deleteBlock: function (index) {
            var self = this;

            var elTarget =
                self.$el.querySelector(
                        '.inline-editor:nth-child(' + (index + 1) + ')');

            elTarget.addEventListener(transitionEndEventName, function (event) {
                self.appReference.remove(index);
            });

            elTarget.classList.add('hidden');
        },
        /**
         * Clone a block
         * @param  {Number} index Index of block to delete
         */
        cloneBlock: function (index) {
            var self = this;

            var elTarget = self.$el.querySelector(
                '.inline-editor:nth-child(' + (index + 1) + ')');

            var elClone = elTarget.cloneNode(true);

            elClone.classList.add('hidden');

            elTarget.insertAdjacentHTML('afterend', elClone.outerHTML);

            setTimeout(function () {
                var elClone2 = self.$el.querySelector('.hidden');

                elClone2.addEventListener(transitionEndEventName, function () {
                    self.appReference.duplicate(index);
                    self.$el.removeChild(elClone2);
                });

                elClone2.classList.remove('hidden');
            }, 200);
        },
        /**
         * Move a block above or below a sibling
         * @param  {Number} index     Index of block to move
         * @param  {Number} steps Direction to move (-1 or 1)
         */
        shiftBlock: function (index, steps) {
            var self = this;

            // Error handling

            if (index < 0) {
                console.error('index can\'t be less than zero');
                return;
            } else if (index === 0 && steps === -1) {
                console.error('block is already at the top');
                return;
            } else if (index === self.$el.children.length - 1 && steps === 1) {
                console.error('block is already at the bottom');
                return;
            } else if (index >= self.$el.children.length) {
                console.error('index is out of bounds');
                return;
            }

            // Cache element references

            var elTarget = self.$el.querySelector(
                '.inline-editor:nth-child(' + (index + 1) + ')');
            var elSwapTarget;

            if (steps === 1) {
                elSwapTarget = self.$el.querySelector(
                    '.inline-editor:nth-child(' + (index + 2) + ')');
            } else if (steps === -1) {
                elSwapTarget = self.$el.querySelector(
                    '.inline-editor:nth-child(' + index + ')');
            }

            // Get element heights

            var elTargetHeight = getComputedStyle(elTarget).height;
            var elSwapTargetHeight = getComputedStyle(elSwapTarget).height;

            var transitionsCompleted = 0;

            function animationEnd() {
                if (transitionsCompleted === 2) {
                    // Update model
                    self.appReference.move(index, steps);
                }
            }

            elTarget.addEventListener(transitionEndEventName, function () {
                transitionsCompleted++;
                animationEnd();
            });

            elSwapTarget.addEventListener(transitionEndEventName, function () {
                transitionsCompleted++;
                animationEnd();
            });

            // Move elements

            function transform(element, value) {
                element.style.transform = value;
                element.style['-webkit-transform'] = value;
            }

            if (steps === 1) {
                transform(elTarget, 'translateY(' + elSwapTargetHeight + ')');
                transform(elSwapTarget, 'translateY(-' + elTargetHeight + ')');
            } else if (steps === -1) {
                transform(elTarget, 'translateY(-' + elSwapTargetHeight + ')');
                transform(elSwapTarget, 'translateY(' + elTargetHeight + ')');
            }

        }
    }
};
