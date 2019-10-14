import LightState from 'react-light-state';
import Page from './Page';

interface ISite {
  siteState: LightState

  addPage(page: Page): void

  removePage(page: Page): void
}

export default class Site implements ISite {
  siteState: LightState;
  constructor() {
    this.siteState = new LightState({
      pages: []
    });
  }

  addPage(page: Page) {
    this.siteState.setState({
      pages: this.siteState.getState('pages').concat(page)
    })
  }

  removePage(page: Page) {
    throw new Error("Not implement.")
  }

  usePages(): Array<Page> {
    return this.siteState.useStore((state: any) => (state.pages))
  }
}