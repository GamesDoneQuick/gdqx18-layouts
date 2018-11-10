import * as tslib_1 from "/bundles/gdqx18-layouts/node_modules/tslib/tslib.es6.js";
console.log('atom-sub-alerts');
window.addEventListener('load', () => {
  const {
    customElement
  } = Polymer.decorators;
  const atomTinyAlerts = customElements.get('atom-tiny-alerts');
  /**
   * @customElement
   * @polymer
   */

  let AtomSubAlerts = class AtomSubAlerts extends atomTinyAlerts {
    ready() {
      super.ready();
      nodecg.listenFor('subscription', this._handleSubscription.bind(this));
    }

    _handleSubscription(subscription) {
      let backgroundColor = 'white';
      let holdDuration = 0.067;
      let text = 'New';

      if (subscription.sub_plan && subscription.sub_plan.toLowerCase() === 'prime') {
        backgroundColor = '#6441a4';
        text = 'Prime';
      } else if (subscription.context && subscription.context.toLowerCase() === 'subgift') {
        backgroundColor = '#00ffff';
        text = 'Gift';
      } else if (subscription.sub_plan === '2000') {
        backgroundColor = '#ffba00';
        holdDuration *= 3;
        text = '$9.99';
      } else if (subscription.sub_plan === '3000') {
        backgroundColor = '#ff0099';
        holdDuration *= 6;
        text = '$24.99';
      }

      if (subscription.months <= 1) {
        text += ' Sub';
      } else {
        text += ` Resub x${subscription.months}`;
      }

      this.addAlert({
        text,
        backgroundColor,
        holdDuration
      });
    }

  };
  AtomSubAlerts = tslib_1.__decorate([customElement('atom-sub-alerts')], AtomSubAlerts); // This assignment to window is unnecessary, but tsc complains that the class is unused without it.

  window.AtomSubAlerts = AtomSubAlerts;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tc3ViLWFsZXJ0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBbUJBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVo7QUFDQSxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBSztBQUNwQyxRQUFNO0FBQUMsSUFBQTtBQUFELE1BQWtCLE9BQU8sQ0FBQyxVQUFoQztBQUNBLFFBQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxHQUFmLENBQW1CLGtCQUFuQixDQUF2QjtBQUVBOzs7OztBQUtBLE1BQU0sYUFBYSxHQUFuQixNQUFNLGFBQU4sU0FBNEIsY0FBNUIsQ0FBMEM7QUFDekMsSUFBQSxLQUFLLEdBQUE7QUFDSixZQUFNLEtBQU47QUFDQSxNQUFBLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGNBQWpCLEVBQWlDLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBOEIsSUFBOUIsQ0FBakM7QUFDQTs7QUFFRCxJQUFBLG1CQUFtQixDQUFDLFlBQUQsRUFBaUM7QUFDbkQsVUFBSSxlQUFlLEdBQUcsT0FBdEI7QUFDQSxVQUFJLFlBQVksR0FBRyxLQUFuQjtBQUNBLFVBQUksSUFBSSxHQUFHLEtBQVg7O0FBRUEsVUFBSSxZQUFZLENBQUMsUUFBYixJQUF5QixZQUFZLENBQUMsUUFBYixDQUFzQixXQUF0QixPQUF3QyxPQUFyRSxFQUE4RTtBQUM3RSxRQUFBLGVBQWUsR0FBRyxTQUFsQjtBQUNBLFFBQUEsSUFBSSxHQUFHLE9BQVA7QUFDQSxPQUhELE1BR08sSUFBSSxZQUFZLENBQUMsT0FBYixJQUF3QixZQUFZLENBQUMsT0FBYixDQUFxQixXQUFyQixPQUF1QyxTQUFuRSxFQUE4RTtBQUNwRixRQUFBLGVBQWUsR0FBRyxTQUFsQjtBQUNBLFFBQUEsSUFBSSxHQUFHLE1BQVA7QUFDQSxPQUhNLE1BR0EsSUFBSSxZQUFZLENBQUMsUUFBYixLQUEwQixNQUE5QixFQUFzQztBQUM1QyxRQUFBLGVBQWUsR0FBRyxTQUFsQjtBQUNBLFFBQUEsWUFBWSxJQUFJLENBQWhCO0FBQ0EsUUFBQSxJQUFJLEdBQUcsT0FBUDtBQUNBLE9BSk0sTUFJQSxJQUFJLFlBQVksQ0FBQyxRQUFiLEtBQTBCLE1BQTlCLEVBQXNDO0FBQzVDLFFBQUEsZUFBZSxHQUFHLFNBQWxCO0FBQ0EsUUFBQSxZQUFZLElBQUksQ0FBaEI7QUFDQSxRQUFBLElBQUksR0FBRyxRQUFQO0FBQ0E7O0FBRUQsVUFBSSxZQUFZLENBQUMsTUFBYixJQUF1QixDQUEzQixFQUE4QjtBQUM3QixRQUFBLElBQUksSUFBSSxNQUFSO0FBQ0EsT0FGRCxNQUVPO0FBQ04sUUFBQSxJQUFJLElBQUksV0FBVyxZQUFZLENBQUMsTUFBTSxFQUF0QztBQUNBOztBQUVELFdBQUssUUFBTCxDQUFjO0FBQ2IsUUFBQSxJQURhO0FBRWIsUUFBQSxlQUZhO0FBR2IsUUFBQTtBQUhhLE9BQWQ7QUFLQTs7QUF0Q3dDLEdBQTFDO0FBQU0sRUFBQSxhQUFhLEdBQUEsT0FBQSxDQUFBLFVBQUEsQ0FBQSxDQURsQixhQUFhLENBQUMsaUJBQUQsQ0FDSyxDQUFBLEVBQWIsYUFBYSxDQUFiLENBVDhCLENBa0RwQzs7QUFDQyxFQUFBLE1BQWMsQ0FBQyxhQUFmLEdBQStCLGFBQS9CO0FBQ0QsQ0FwREQiLCJzb3VyY2VSb290IjoiIn0=