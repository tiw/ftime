define(['text!templates/time-fragment/time-fragment-list.html','app/view/TimeFragmentCollectionView'], function(List, TimeFragmentCollectionView){
    var App = function(){};
    App.prototype.startup = function(){
        $('body').append(List);
        var timeFragmentCollectionView = new TimeFragmentCollectionView();
    };

    return App;
});
