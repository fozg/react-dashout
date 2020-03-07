import LightState from 'react-light-state'
import Page, { IContentOptions } from './Page'
import { IDashoutConfig } from './AppServices'

interface IRoot {
  rootState: LightState

  addPage(page: Page): void

  removePage(page: Page): void
}

export enum DashoutModelType {
  Page = 'Page',
  Root = 'Root',
}

export default class Root implements IRoot {
  readonly rootState: LightState
  private dashoutConfig: IDashoutConfig
  contentOptions?: IContentOptions
  path = ''

  constructor(initConfig: IDashoutConfig) {
    this.dashoutConfig = initConfig
    this.contentOptions = {}
    this.rootState = new LightState({
      pages: [],
      MasterLayoutEnabled: false,
      activePage: null,
    })
  }

  addPage(page: Page) {
    page.parent = this
    this.rootState.setState({
      pages: this.rootState.getState('pages').concat(page),
    })
  }

  removePage(page: Page) {
    throw new Error('Not implement.')
  }

  usePages(): Array<Page> {
    return this.rootState.useStore((state: any) => state.pages)
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

  setMasterLayoutEnabled(value: boolean) {
    this.rootState.setState({ MasterLayoutEnabled: value })
  }

  useMasterLayoutEnabled() {
    return this.rootState.useStore((state: any) => state.MasterLayoutEnabled)
  }

  get Root(): Root {
    return this
  }

  setActivePage(context: Page): void {
    this.rootState.setState({
      activePage: context,
      MasterLayoutEnabled:
        context.parent.contentOptions &&
        context.parent.contentOptions.layout === 'MasterLayout',
    })
  }

  useActivePage(): Page | null {
    return this.rootState.useStore((state: any) => state.activePage)
  }

  getPathPages(): Array<Page> {
    return []
  }
}
