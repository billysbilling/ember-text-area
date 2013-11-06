var i18n = require('i18n');

module.exports = Em.Component.extend(require('ember-field-mixin'), {
    template: require('../templates/text-area'),
    
    classNameBindings: [':text-field', ':text-area', 'value:has-value', 'hasFocus:focus', 'grow', 'disabled', 'required', 'flexClass', 'block'],

    init: function() {
        this._super();
        this.updateMirror();
    },
    
    didInsertElement: function() {
        var self = this,
            textarea = this.$('textarea');
        if (this.get('grow')) {
            var mirror = this.$('.mirror'),
                minLines = this.get('minLines'),
                maxLines = this.get('maxLines'),
                lineHeight = parseInt(mirror.css('line-height')),
                vpadding = parseInt(mirror.css('border-top-width')) + parseInt(mirror.css('padding-top')) + parseInt(mirror.css('padding-bottom')) + parseInt(mirror.css('border-bottom-width')),
                css = {};
            css.minHeight = vpadding + lineHeight * minLines;
            if (maxLines) {
                css.maxHeight = vpadding + lineHeight * maxLines;
            }
            mirror.css(css);
        }
        textarea.focus(function() {
            Em.run(function() {
                self.didFocus();
            })
        });
        textarea.blur(function() {
            Em.run(function() {
                self.didBlur();
            })
        });
    },
    
    value: "",
    placeholder: i18n.tProperty('placeholder'),
    
    disabled: false,
    
    required: false,
    
    minLines: 1,
    maxLines: null,

    flex: null,

    flexClass: function() {
        var flex = this.get('flex');
        return flex ? 'flex-'+flex : null;
    }.property('flex'),

    block: false,

    valueDidChange: function() {
        this.updateMirror();
    }.observes('value'),

    grow: false,
    mirrorValue: null,
    updateMirror: function() {
        if (this.get('grow')) {
            this.set('mirrorValue', this.get('value') || this.get('placeholder'));
        }
    },

    hasFocus: false,
    
    focus: function() {
        this.$('input').focus();
    },
    
    didFocus: function() {
        this.set('hasFocus', true);
    },
    
    didBlur: function() {
        this.set('hasFocus', false);
    },
    
    innerTextAreaClass: require('./inner-text-area')
});