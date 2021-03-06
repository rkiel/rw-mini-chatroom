var React = require('react');
var $ = require('jquery');
var config = require('./Config');

function getDefaultProps() {
  return {
    url: "https://api.parse.com/1/classes/chat"
  }
}

function propTypes() {
  return {
    url: React.PropTypes.string.isRequired
  };
}

function render(){
  return (
    <div className="form-group">
      <input 
        type="text"
        ref='newChatInput'
        placeholder="Compose Message" 
        className="form-control" 
        onKeyDown={this.handleSubmit} />
    </div>
  )
}

function handleSubmit(e) {
  if(e.keyCode === 13){
    this.addChat();
  }
}

function addChat() {
  $.ajax({
    url:  this.props.url,
    type: 'POST',
    data: JSON.stringify({
      text: this.refs.newChatInput.getDOMNode().value
    }),
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", config.applicationId);
      request.setRequestHeader("X-Parse-REST-API-Key",   config.restKey);
      request.setRequestHeader("Content-Type",           'application/json');
    },
    error: function() {
      console.log('error on post');
    },
    success: function() {
      console.log('Successful Post');
      this.refs.newChatInput.getDOMNode().value = '';
    }.bind(this)
  })
}

var AddChat = React.createClass({
  getDefaultProps: getDefaultProps,
  propTypes:       propTypes(),
  addChat:         addChat,
  handleSubmit:    handleSubmit,
  render:          render
});

module.exports = AddChat;
