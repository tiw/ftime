define(['app/model/TimeFragment'], function(TimeFragment) {
    var TimeFragmentCollection = Backbone.Collection.extend({
        model: TimeFragment
    })
    return TimeFragmentCollection;
});
