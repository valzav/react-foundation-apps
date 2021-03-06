var React = require('react');
var Animation = require('../utils/animation');
var foundationApi = require('../utils/foundation-api');

var Modal = React.createClass({
  getInitialState: function () {
    return { open: false };
  },
  getDefaultProps: function () {
    return {
      overlay: true,
      overlayClose: true,
      animationIn: 'fadeIn',
      animationOut: 'fadeOut',
      onClose: null
    };
  },
  componentDidMount: function () {
    this.subscribe(this.props.id);
  },
  componentWillUnmount: function () {
    foundationApi.unsubscribe(this.props.id);
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.id !== this.props.id) {
      foundationApi.unsubscribe(this.props.id);
      this.subscribe(nextProps.id);
    }
  },
  hideOverlay: function (e) {
    e.preventDefault();
    if (this.props.overlayClose) {
      this.setState({open: false});
      if (this.props.onClose) this.props.onClose();
    }
  },
  stopClickPropagation: function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  subscribe: function (id) {
    foundationApi.subscribe(id, function (name, msg) {
      if (msg === 'open') {
        this.setState({open: true});
      } else if (msg === 'close') {
        this.setState({open: false});
        if (this.props.onClose) this.props.onClose();
      } else if (msg === 'toggle') {
        this.setState({open: !this.state.open});
        if (!this.state.open && this.props.onClose) this.props.onClose();
      }
    }.bind(this));
  },
  render: function() {
    var overlayStyle = {};
    if (!this.props.overlay) {
      overlayStyle.background = 'transparent';
    }
    return (
      <Animation active={this.state.open} animationIn="fadeIn" animationOut="fadeOut">
        <div className='modal-overlay' style={overlayStyle} onClick={this.hideOverlay} >
          <Animation
            active={this.state.open}
            animationIn={this.props.animationIn}
            animationOut={this.props.animationOut}
          >
            <div id={this.props.id} data-closable={true} className='modal' onClick={this.stopClickPropagation}>
              {this.props.children}
            </div>
          </Animation>
        </div>
      </Animation>
    );
  },
});

module.exports = Modal;
