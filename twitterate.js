if( Meteor.isServer ) {

  var T = new Twit({
    consumer_key: 'GvmS1qpA8JXLL9pRhnSNig',
    consumer_secret: '31lUbb1LQIfShYDS4ZxhEudBst6nxzkLi98JmFuBo',
    access_token: '5719602-20bU1bGWPBxbtTUjpnM7Qw7OiRftJfspinZWmRIE',
    access_token_secret: 'IBgrhJoPm1wR7JWZbvYYDEcFe3qOrsrbLG1n32BreM'
  });

  Meteor.methods({
    elencotweet: function(filtro) {
      var fut = new Future();

      T.get( 'search/tweets', { q: filtro, count: 8}, 
          function(err, reply) { 
            console.log("ottenuti i tweet!!!"); 
            fut['return'](reply); 
          }
      );
      
      return fut.wait();
    }
  });
}

if( Meteor.isClient ) {

  Template.twitterate.helpers({
    tweets: function() { 
      if(Session.get('itweets')) return Session.get("itweets").statuses;
    }
  });

  Template.twitterate.events({
    'click #gettwit': function() {
      Meteor.call("elencotweet", $('#filtro').val(), 
        function(err, argum) {  
          argum.statuses = _.sortBy(argum.statuses, function(a) {
            return -a.retweet_count;
          });
          console.log(argum.statuses); 
          Session.set('itweets', argum); });
    }
  });
}