define(['app/model/TimeFragment'], function(TimeFragment) {
    var TimeFragmentCollection = Backbone.Collection.extend({
        model: TimeFragment,
        url: 'time-fragment/index/format/json',
        parse: function(resp) {
            var timeFragments = [];
            data = resp.data;
            _.each(data, function(d, index) {
                var tf = new TimeFragment({
                    id: d.id,
                    project: d.project,
                    startTime: XDate(d.start_time),
                    endTime: XDate(d.end_time),
                    note: d.note
                });
                timeFragments[index] = tf;
            });
            return timeFragments;

        }
    });
    return TimeFragmentCollection;
});
