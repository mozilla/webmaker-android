module.exports = {
  editText: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.refs.element.toggleEditing();
    // calls our setEditing function after changing state
  },
  stopEditing: function(evt) {
    this.refs.element.stopEditing();
  },
  setEditing: function(boolval) {
    this.setState({
      editing: boolval
    });
  },
  updateText: function (text) {
    this.setState({
      innerHTML: text
    });
  }
};
