var mockId = '123123123';

function Fb(id) {
    var self = this;
    this._id = id;
    this.blocks = [];
    this.snapshot = {
        val: function() {
            return self.blocks;
        }
    };
};

Fb.prototype = {
    key: function () {
        return this._id;
    },
    once: function (type, callback) {
        callback(this.snapshot);
    },
    set: function(newcontent) {
        this.blocks = newcontent;
    },
    push: function (data) {
       var fb = new Fb(mockId);
       fb._val = data;
       return fb;
    },
    child: function (key) {
        return this;
    },
    update: function () {
        // No body
    },
    on: function () {
        // No body
    },
    remove: function () {
        // No body
    }
};

module.exports = Fb;
