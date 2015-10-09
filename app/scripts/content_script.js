var $ = require('jquery');
// var github = require('github');
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var MergeButton = require('./lib/MergeButton.js');
var rows = $(".js-issue-row");
var getRepoName = function getRepoName() {
  var urlPath = window.location.pathname.split('/');
  if (urlPath[2]) {
    return urlPath[2];
  }
}
var getOwnerName = function getOwnerName() {
  var urlPath = window.location.pathname.split('/');
  if (urlPath[1]) {
    return urlPath[1];
  }
}

if (rows.length > 0) {

  $(".container").width('1000px');
  $(".repository-with-sidebar .repository-content").width('955px');
  var repo = getRepoName();
  var owner = getOwnerName();
  if (repo && owner) {

    _.each(rows, function(row) {
      var rowId = $(row).attr('id').replace("issue_", "");
      $(row).append('<div class="table-list-cell" id="pr-button-' + rowId + '"></div>');
      ReactDOM.render(
        <MergeButton rowId={rowId} repo={repo} owner={owner} />,
        document.getElementById("pr-button-" + rowId)
      );

    });
  }
}