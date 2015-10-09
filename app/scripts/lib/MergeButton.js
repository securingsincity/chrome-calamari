var _ = require('lodash');
var React = require('react');
var $ = require('jquery');
var classNames = require('classNames');
var config = require('../../../config.js');

var mergeButton = React.createClass({
  getInitialState: function() {
    return {
      mergeable: true,
      merged: false,
      merging: false
    };
  },
  onClick: function(e) {
    var baseUrl = config.root + "/repos/" + this.props.owner + "/" + this.props.repo + "/"
    var mergeable = false;
    var self = this;
    $.getJSON(baseUrl + "pulls/" + this.props.rowId + "?access_token=" + config.access_token, function(pullRequest) {
      if (pullRequest.mergeable === false) {
        self.setState({
          mergeable: false
        });
      }
      if (pullRequest.mergeable === true) {
        self.setState({
          merging: true,
        });
        $.ajax({
          url: baseUrl + "pulls/" + self.props.rowId + "/merge?access_token=" + config.access_token,
          method: "PUT",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify({
            "sha": pullRequest.head.sha,
          })
        }).done(function() {
          alert("Successfully Merged");
          self.setState({
            merged: true
          })
        }).fail(function() {
          alert('Failed to merge');
          self.setState({
            mergeable: false,
            merging: false
          });
        });
      }
    }).fail(function() {
      alert('Error accessing pull request');
      self.setState({
        mergeable: false,
        merging: false
      });
    });
  },
  render: function() {
    var buttonText = "MERGE";
    var isDisabled = false;
    var classes = classNames({
      btn: true,
      "btn-primary": this.state.mergeable,
      "btn-danger": !this.state.mergeable
    });

    if (!this.state.mergeable) {
      buttonText = 'CONFLICT';
      isDisabled = true;
    }
    if (this.state.merging) {
      buttonText = 'MERGING'
      isDisabled = true;
    }
    if (this.state.merged) {
      buttonText = 'MERGED';
      isDisabled = true;
    }
    return (
      <div className="mergeButton">
        <button className={classes} id={'merge-' + this.props.rowId} onClick={this.onClick} disabled={isDisabled}>{buttonText}</button>
      </div>
      );
  }
});

module.exports = mergeButton;