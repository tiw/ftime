
define(['app/model/TimeFragment', 'app/model/TimeFragmentCollection', 'app/view/TimeFragmentView'], function(TimeFragment, TimeFragmentCollection, TimeFragmentView){

    var CollectionView = Backbone.View.extend({
        /**
         * initialize view
         */
        initialize: function(){
            this.el = $('#ftime-app');
            console.log('ini collection view');
            /**
             * ini current time fragment 
             */
            this.currentTimeFragment = new TimeFragment();
            this.currentTimeFragment.bind('change:startTime', this.updateCurrentTime, this);
            var currentTime = Date(); 
            this.currentTimeFragment.set({startTime: currentTime});


            /**
             * ini time list
             */
            this.timeFragmentCollection = new TimeFragmentCollection();
            this.timeFragmentCollection.bind('add', this.addOne, this);

            this.delegateEvents();
        },
        addOne: function(model) {
            console.log('add one', model);
            var timeFragmentView = new TimeFragmentView({model: model});
            console.log(timeFragmentView.render().el);
            this.$('.time-fragment-list').append(timeFragmentView.render().el);
        },
        updateCurrentTime: function(model){
            console.log('update the current time');
            this.$('.start-time').html(model.get('startTime'));
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
            console.log('stopTime');
            var currentTime = Date();
            this.currentTimeFragment.set({endTime: currentTime});
            //console.log(this.currentTimeFragment);
            var timeFragment = new TimeFragment(this.currentTimeFragment.toJSON());
            this.timeFragmentCollection.add(timeFragment);
        },
        changeNode: function() {
            console.log('change note');
            this.currentTimeFragment.set({note: this.$('.note').val()});
        },
        changeProject: function() {
            console.log('change project');
            this.currentTimeFragment.set({project: this.$('.project').val()});
        }
    
    });
    
    return CollectionView;





})
