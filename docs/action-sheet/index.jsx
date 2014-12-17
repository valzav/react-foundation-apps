var React = require('react');
var Highlight = require('react-highlight');
var multiline = require('multiline');
var BasicActionSheet = require('./basic');

var basicSnippet = multiline.stripIndent(function() {/*
<ActionSheet>
  <ActionSheetButton title="Action Sheet" />
  <ActionSheetContent>
    <p>Tap to share</p>
    <ul>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">Facebook</a></li>
      <li><a href="#">Mail</a></li>
    </ul>
  </ActionSheetContent>
</ActionSheet>
*/});

var ActionSheetDocs = React.createClass({
  render: function () {
    return (
      <div>
        <h2> Action Sheet </h2>
        <h4 className='subheader'>
          Action sheets can be triggered in your app view to providing contextual actions on a component. They act as slide up menus on small devices and drop downs on larger screens.
        </h4>

        <hr/>
        <BasicActionSheet />
        <hr/>

        <h3>Basic</h3>
        <div className='grid-block'>
          <div className='grid-content'>
            <Highlight code={require('./basic.md')} />
          </div>
          <div className='grid-content' >
            <BasicActionSheet />
          </div>
        </div>

      </div>
    );
  }
});

module.exports = ActionSheetDocs;