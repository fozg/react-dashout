import LightState from 'react-light-state';
import Page from './Page';

interface IRoot {
  rootState: LightState

  addPage(page: Page): void

  removePage(page: Page): void
}

export enum DashoutModelType {
  Page = "Page",
  Root = "Root"
}

export default class Root implements IRoot {
  readonly rootState: LightState;
  constructor() {
    this.rootState = new LightState({
      pages: []
    });
  }

  addPage(page: Page) {
    page.parent = this;
    this.rootState.setState({
      pages: this.rootState.getState('pages').concat(page)
    })
  }

  removePage(page: Page) {
    throw new Error("Not implement.")
  }

  usePages(): Array<Page> {
    return this.rootState.useStore((state: any) => (state.pages))
  }

  getPath(): string {
    return ''
  }

  get type(): DashoutModelType {
    return DashoutModelType.Root
  }
}