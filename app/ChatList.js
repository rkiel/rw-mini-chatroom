var React = require('react');
var $ = require('jquery');
var config = require('./Config');

function getInitialState() {
  return {
    chats: []
  }
}

function propTypes() {
  return {
    url: React.PropTypes.string.isRequired
  };
}

function getDefaultProps() {
  return {
    url: 'https://api.parse.com/1/classes/chat'
  };
}

function getChats() {
  $.ajax({
    url: this.props.url,
    type: 'GET',
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", config.applicationId);
      request.setRequestHeader("X-Parse-REST-API-Key",   config.restKey);
      request.setRequestHeader("Content-Type",           'application/json');
    },
    error: function(data) {
      console.log('There was an error in getting the chats');
    },
    success: function(data) {
      if (this.isMounted()) {
        this.setState({
          chats: data.results
        });
      }
    }.bind(this)
  })
}

function render(){
  var list = this.state.chats.map(function(item, index){
       return <li className="list-group-item" key={item.objectId}> {item.text} </li>
  });
  return (
    <ul className="list-group">
      {list}
    </ul>
  )
}

function componentDidMount() {
  this.interval = setInterval(function(){
    this.getChats();
  }.bind(this), 1000)
}

function componentWillUnmount() {
  clearInterval(this.interval);
}

var ChatList = React.createClass({
  getInitialState:      getInitialState,
  propTypes:            propTypes(),
  getDefaultProps:      getDefaultProps,
  componentDidMount:    componentDidMount,
  componentWillUnmount: componentWillUnmount,
  getChats:             getChats,
  render:               render
});

module.exports = ChatList;
