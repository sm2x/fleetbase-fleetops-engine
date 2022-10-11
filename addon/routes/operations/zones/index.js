import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class OperationsZonesIndexRoute extends Route {
  /**
   * Inject the `loader` service.
   *
   * @var {Service}
   */
  @service loader;

  model() {
    return this.store.query('service-area', { with: ['zones'] });
  }

  /**
   * Loading event handler for route.
   *
   * @param {Transition} transition
   */
  @action
  loading(transition) {
    this.loader.showOnInitialTransition(
      transition,
      '#mainContent',
      'Loading zones...'
    );
  }
}
