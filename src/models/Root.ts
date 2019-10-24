import LightState from 'react-light-state';
import Page from './Page';
import { IDashoutConfig } from './AppServices';

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
  private dashoutConfig: IDashoutConfig
  key: string

  constructor(initConfig: IDashoutConfig) {
    this.key = 'root'
    this.dashoutConfig = initConfig;
    this.rootState = new LightState({
      pages: [],
      activePage: null
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

  useActivePage(): Page {
    return this.rootState.useStore((state: any) => (state.activePage))
  }

  getPath(): string {
    return ''
  }

  get type(): DashoutModelType {
    return DashoutModelType.Root
  }

  getDashoutConfig(): IDashoutConfig {
    return this.dashoutConfig
  }

  setFocus({ context, lastContext, isFocus, isWayDown }: { context: Page, lastContext: Page, isFocus: boolean, isWayDown: boolean }) {
  this.rootState.setState({ activePage: context })
  this.rootState.getState('pages').forEach((page: Page) => {
    if (lastContext.key !== page.key) {
      page.setFocus({context, isFocus: false, isWayDown: true})
    }
  })
}
}