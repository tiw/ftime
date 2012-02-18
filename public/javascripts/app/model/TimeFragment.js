
define(['order!lib/underscore', 'order!lib/backbone'], function() {
    var TimeFragment = Backbone.Model.extend({
        url: 'time-fragment/index/format/json'
    });
    return TimeFragment;
});
