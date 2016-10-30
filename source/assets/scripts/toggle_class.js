import 'jquery';

// Toggle a classname on target elements
//
// eg: Use button to toggle a .hide class
//
//     <button data-toggle-class="hide" data-toggle-class-target="h2">
//     <h2>A Secret</h2>
class ToggleClass {
  constructor($el, classname, selector) {
    this.$el = $el;
    this.classname = classname || 'active';
    this.selector = selector;
    this.bind($el);
  }

  onChange() {
    this.toggleClass(this.$el[0].checked);
  }

  onClick(e) {
    e.preventDefault();
    this.toggleClass();
  }

  toggleClass(hasClass) {
    $(this.selector).toggleClass(this.classname, hasClass);
  }

  bind($el) {
    $el.on('click', this.onClick.bind(this));
  }
}

$(function() {
  $('[data-toggle-class-target]').each(function() {
    let $trigger = $(this);
    new ToggleClass($trigger, $trigger.data('toggle-class'), $trigger.data('toggle-class-target'));
  });
});
