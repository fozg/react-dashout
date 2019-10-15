/**
 * All app flow state should be go here.
 */
import { AppEvent } from './AppEvent';
import Root from './Root';
import Page from './Page';
import actions from './actions';

interface IAppServices {
  root: Root | undefined;
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

  getRoot(): Root
}

interface IAction {
  key: String;
  payload: Object
}

export type W = (typeof window) & {
  AppService: AppService;
};

export default class AppService implements IAppServices {
  root: Root;
  appEventsMap: Map<String, Function>;

  constructor() {
    // App must have a Site
    this.root = new Root();
    this.appEventsMap = new Map();

    // setup global for this service
    (window as W).AppService = this;
  }

  init(done?: Function) {
    // default events go here.
    this.addAppEvent(new AppEvent({
      key: actions.core.add_page_to_root, action: (payload: Page) => {
        this.root.addPage(payload)
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
      return;
      // throw new Error("AppEvent keys already decleare.");
    } else {
      this.appEventsMap.set(appEvent.key, appEvent.action);
    }
  }

  getRoot() {
    return this.root;
  }
}