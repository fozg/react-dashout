import React, { ComponentType } from 'react';
import { W } from './AppServices'
import LightState from 'react-light-state';
import DefaultComponent from '../react/default/DefaultComponent';
import Root from './Root';

interface IPageModel {
  key: string,
  title: String;
  path: string;
  parent: Page | Root;
  readonly children?: LightState;
  component?: React.FC | ComponentType | React.ElementType;
}

interface INavigationOptions {
  visible: boolean
}

interface IPageModelConstructor {
  key: string,
  title: String;
  path: string;
  parent?: Page | Root;
  readonly children?: Array<Page>;
  component?: React.FC | ComponentType | React.ElementType;
  exact?: boolean;
  navigationComponent?: React.FC<{ page: Page, level: number }>;
  navigationOptions?: INavigationOptions
}

interface IPage extends IPageModel {
  addToSite(): void;
  addPage(page: Page): Page
}

/**
 * When Page create, it should be ready on Site mapping.
 * So when @method show() has been called, this page link should display on `Navigation` bar and ready to use
 */
export default class Page implements IPage {
  key: string;
  title: String;
  path: string;
  parent: Page | Root;
  readonly children: LightState;
  exact?: boolean;
  component: React.FC | ComponentType | React.ElementType;
  navigationComponent?: React.FC<{ page: Page, level: number }>;
  navigationOptions: INavigationOptions

  constructor({ key, title, path, parent, component, navigationComponent, exact = false, navigationOptions }: IPageModelConstructor) {
    this.key = key;
    this.title = title;
    this.path = path;
    this.parent = parent ? parent : (window as W).AppService.getRoot();
    this.component = component || DefaultComponent;
    this.navigationComponent = navigationComponent;
    this.exact = exact;
    this.navigationOptions = navigationOptions ? navigationOptions : { visible: true }

    this.children = new LightState({
      pages: []
    })

    this.parent.addPage(this)
  }

  addToSite() {

  }

  getPath(): string {
    return this.parent.getPath() + this.path;
  }

  addPage(page: Page) {
    page.parent = this;
    this.children.setState({
      pages: this.children.getState('pages').concat(page)
    })
    return page;
  }

  usePages(): Array<Page> {
    return this.children.useStore((state: any) => (state.pages))
  }
}