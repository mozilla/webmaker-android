var React = require('react/addons');
var render = require('../../lib/render.jsx');

var ImageEditor = require('./image-editor.jsx');
var LinkEditor = require('./link-editor.jsx');
var TextEditor = require('./text-editor.jsx');

// Render!
var hash = window.location.hash;
if (hash==="#link") { render(LinkEditor); }
else if (hash === "#text") { render(TextEditor); }
else if (hash === "#image") { render(ImageEditor); }
else { render(LinkEditor); }
