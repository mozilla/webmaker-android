var React = require('react/addons');
var render = require('../../lib/render.jsx');

var ImageEditor = require('./image-editor.jsx');
var TextEditor = require('./text-editor.jsx');

// Render!
render(window.location.hash === '#text' ? TextEditor : ImageEditor);
