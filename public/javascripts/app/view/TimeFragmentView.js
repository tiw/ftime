
define(['app/model/TimeFragment', 'text!templates/time-fragment/time-fragment-line.html'], function(TimeFragment, lineTemplate) {
    
    var TimeFragmentView = Backbone.View.extend({
        tagName: 'tr',
        className: 'time-fragment-line',
        template: _.template(lineTemplate),
        initialize: function(){
            
        },
        render: function(){
            try{
                var compiledTemplate = this.template(this.model.toJSON());
                $(this.el).html(compiledTemplate)
            } catch(e) {
                console.log(e);
            }
            return this;
        }
    });

    return TimeFragmentView



});
