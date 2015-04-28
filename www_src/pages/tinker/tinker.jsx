var React = require('react');

var render = require('../../lib/render.jsx');
var Binding = require('../../lib/binding.jsx');

var Tabs = require('../../components/tabs/tabs.jsx');
var ColorSpectrum = require('../../components/color-spectrum/color-spectrum.jsx');
var Range = require('../../components/range/range.jsx');

var Tinker = React.createClass({
  mixins: [Binding],
  getInitialState: function () {
    return {
      color: '#8FB70A'
    };
  },
  onChangeColor: function (color) {
    this.setState({
      color: color
    });
  },
  render: function () {
    var tabs = [
      {
        menu: <img className="icon" src="../../img/pencil.svg" />,
        body: (<div>
          <div className="form-group">
            <ColorSpectrum value={this.state.color} onChange={this.onChangeColor} />
          </div>
          <div className="form-group">
            <label>Transparency</label>
            <Range />
          </div>
        </div>)
      },
      {
        menu: <img className="icon" src="../../img/settings.svg" />,
        body: (<div>
          {['Red', 'Green', 'Blue'].map((color, i) => {
            return (<div className="form-group">
              <label>{color}</label>
              <Range max={255} unit="" />
            </div>);
          })}
          <div className="form-group">
            <label>Transparency</label>
            <Range />
          </div>
        </div>)
      }
    ];
    return (
      <div id="tinker">
        <div className="editor-preview">
          <img src="../../img/toucan.svg" />
        </div>
        <div className="color-preview">
          <code>color: {this.state.color};</code>
          <div className="color-preview-right">
            <div style={{backgroundColor: this.state.color}} className="color-preview-swatch" />
          </div>
        </div>
        <Tabs className="editor-options" tabs={tabs} />
      </div>
    );
  }
});

// Render!
render(Tinker);
