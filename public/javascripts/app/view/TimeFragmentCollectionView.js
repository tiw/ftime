
define(['app/model/TimeFragment', 'app/model/TimeFragmentCollection', 'app/view/TimeFragmentView', 'lib/xdate'], function(TimeFragment, TimeFragmentCollection, TimeFragmentView){

    var CollectionView = Backbone.View.extend({
        /**
         * initialize view
         */
        initialize: function(){
            this.el = $('#ftime-app');
            /**
             * ini current time fragment 
             */
            this.currentTimeFragment = new TimeFragment();
            this.currentTimeFragment.bind('change:startTime', this.updateCurrentTime, this);
            var currentTime = XDate(); 
            this.currentTimeFragment.set({startTime: currentTime});


            /**
             * ini time list
             */
            this.timeFragmentCollection = new TimeFragmentCollection();
            this.timeFragmentCollection.bind('add', this.addOne, this);
            this.timeFragmentCollection.bind('reset', this.addAll, this);

            this.delegateEvents();
            this.timeFragmentCollection.fetch();
        },
        addOne: function(model) {
            var timeFragmentView = new TimeFragmentView({model: model});
            this.$('.time-fragment-list').append(timeFragmentView.render().el);
        },
        addAll: function() {
            console.log(this.timeFragmentCollection);
            this.timeFragmentCollection.each(this.addOne);
        },
        updateCurrentTime: function(model) {
            this.$('.start-time').html(
                model.get('startTime').toString('HH:mm')
            );
        },

        events: {
            'click .stop-time': 'stopTime',
            'change .note': 'changeNode',
            'change .project': 'changeProject'
        },
        /**
         * set the end time of current time fragment as current time
         * add current time fragment into the list
         * creat a new one whose start time is current time
         */
        stopTime: function() {
            var currentTime = XDate();
            this.currentTimeFragment.set({endTime: currentTime});
            var timeFragment =
                new TimeFragment(this.currentTimeFragment.toJSON());
            timeFragment.save(
                timeFragment,
                {
                    success: function(model, resp) {
                        console.log('saved', model, resp);
                    }
                }
            );
            this.timeFragmentCollection.add(timeFragment);
            this.currentTimeFragment.set({startTime: currentTime});
        },
        changeNode: function() {
            //console.log('change note');
            this.currentTimeFragment.set({note: this.$('.note').val()});
        },
        changeProject: function() {
            //console.log('change project');
            this.currentTimeFragment.set({project: this.$('.project').val()});
        }
    });
    return CollectionView;

});
