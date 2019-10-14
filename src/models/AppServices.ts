/**
 * All app flow state should be go here.
 */
import { AppEvent } from './AppEvent';
import Site from './Site';
import Page from './Page';
import actions from './actions';

interface IAppServices {
  site: Site | undefined;
  appEventsMap: Map<String, Function>;
  /**
   * Must init some core AppEvent.
   */
  init(): void;

  /**
   * Dispatch an AppEvent to AppService, to execute this event.
   */
  dispatch({ key, payload }: IAction): void;

  /**
   * Add an AppEvent to AppSerivces Events list.
   */
  addAppEvent(appEvent: AppEvent): void

  getSite(): Site
}

interface IAction {
  key: String;
  payload: Object
}

export type W = (typeof window) & {
  AppService: AppService;
};

export default class AppService implements IAppServices {
  site: Site;
  appEventsMap: Map<String, Function>;

  constructor() {
    // App must have a Site
    this.site = new Site();
    this.appEventsMap = new Map();

    // setup global for this service
    (window as W).AppService = this;
  }

  init(done?: Function) {
    // default events go here.
    this.addAppEvent(new AppEvent({
      key: actions.core.add_page, action: (payload: Page) => {
        this.site.addPage(payload)
      }
    }))
    
    if (done) {
      done();
    }
  }

  dispatch({ key, payload }: IAction) {
    const action = this.appEventsMap.get(key);
    if (action) {
      action(payload)
    } else {
      return
    }
  }

  addAppEvent(appEvent: AppEvent) {
    if (this.appEventsMap.has(appEvent.key)) {
      throw new Error("AppEvent keys already decleare.");
    } else {
      this.appEventsMap.set(appEvent.key, appEvent.action);
    }
  }

  getSite() {
    return this.site;
  }
}