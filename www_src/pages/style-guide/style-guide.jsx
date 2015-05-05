var React = require('react');
var render = require('../../lib/render.jsx');

// Components
var ColorGroup = require('../../components/color-group/color-group.jsx');
var ColorSpectrum = require('../../components/color-spectrum/color-spectrum.jsx');
var Range = require('../../components/range/range.jsx');
var Tabs = require('../../components/tabs/tabs.jsx');
var ProjectSnapshot = require('../../components/project-snapshot/project-snapshot.jsx');
var Alert = require('../../components/alert/alert.jsx');

var tabs = [
  {
    menu: <div>Tab 1</div>,
    body: <div>Tab 1 body</div>
  },
  {
    menu: <div>Tab 2</div>,
    body: <div>Tab 2 body</div>
  }
];

var StyleGuide = React.createClass({
  render: function () {
    return (
      <div id="style-guide">
        <h1>Style Guide</h1>

        <h2>Typography</h2>

        <h1>Heading H1</h1>
        <h2>Heading H2</h2>
        <h3>Heading H3</h3>
        <h4>Heading H4</h4>
        <h5>Heading H5</h5>
        <h6>Heading H6</h6>

        <p>Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</p>

        <h2>Colors</h2>

        <div className="swatches">
          <div className="color blue"><span>@blue</span></div>
          <div className="color shadowBlue"><span>@shadowBlue</span></div>
          <div className="color sapphire"><span>@sapphire</span></div>
          <div className="color teal"><span>@teal</span></div>
          <div className="color slate"><span>@slate</span></div>
          <div className="color heatherGrey"><span>@heatherGrey</span></div>
          <div className="color lightGrey"><span>@lightGrey</span></div>
          <div className="color plum"><span>@plum</span></div>
          <div className="color shadowPlum"><span>@shadowPlum</span></div>
          <div className="color brick"><span>@brick</span></div>
          <div className="color yellow"><span>@yellow</span></div>
        </div>

        <h2>Components</h2>

        <h3>Buttons</h3>

        <h4>Standard <code>btn</code></h4>
        <button className="btn">Button</button>

        <h4>Full Width <code>btn btn-block</code></h4>
        <button className="btn btn-block">Button</button>

        <h4>Teal <code>btn btn-teal</code></h4>
        <button className="btn btn-teal">Button</button>

        <h3>Alert (JSX)</h3>
        <Alert>Bad bad bad!</Alert>

        <h3>ColorGroup (JSX)</h3>
        <ColorGroup/>

        <h3>ColorSpectrum (JSX)</h3>
        <ColorSpectrum value={'#fff'} onChange="" />

        <h3>Range (JSX)</h3>
        <Range min={0} max={255} unit="" />

        <h3>Tabs (JSX)</h3>
        <Tabs tabs={tabs} className="editor-options"></Tabs>

        <h3>ProjectSnapshot (JSX)</h3>
        <ProjectSnapshot
          url="/map/123"
          href="/pages/map"
          thumbnail="../../img/toucan.svg"
          title="The Birds of the Amazon"/>

      </div>
    );
  }
});

render(StyleGuide);
