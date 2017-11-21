var socket = io();


$(document).ready(function () {
  /*Display the username and "Signout" on navbar*/
  if ($.cookie('user_id') !== null) {
    document.getElementById('register').style.visibility = "hidden";
    $('.navbar-header').append($('<a>', {
      'class': 'navbar-brand.pullright', 'href': '/users' + $.cookie('username'), html: function () {
        return $.cookie('username')
      }
    }));

    $('.navbar-header').append($('<a>', {
      'class': 'navbar-brand.pullright', 'href': '/', html: 'Sign Out'
    }))
  }
});
