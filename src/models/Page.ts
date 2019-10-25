import React, { ComponentType } from 'react';
import { W } from './AppServices'
import LightState from 'react-light-state';
import DefaultComponent from '../react/default/DefaultComponent';
import Root, { DashoutModelType } from './Root';
import { IDashoutConfig } from './AppServices';

interface IPageModel {
  key: string;
  title: string;
  path: string;
  parent: Page | Root;
  readonly children?: LightState;
  component?: React.ComponentType | React.SFC<any> | boolean;
}

export interface INavigationOptions {
  visible?: boolean;
  component?: React.SFC<{ page: Page, level: number }>;
  icon?: any,
  childPaddingMultiplier?: number
}

export interface IContentOptions {
  maxWidth?: number | string,
  layout?: string
}

interface IHeaderOptions {
  title?: string;
  visible?: boolean;
  controls?: JSX.Element[] | React.ElementType | ComponentType,
}

interface IPageConstructor {
  key: string,
  title: string;
  path: string;
  parent?: Page | Root;
  readonly children?: Array<Page>;
  component?: React.ComponentType | React.SFC<any> | boolean;
  exact?: boolean;
  navigationOptions?: INavigationOptions,
  contentOptions?: IContentOptions;
  headerOptions?: IHeaderOptions;
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
  title: string;
  path: string;
  parent: Page | Root;
  readonly children: LightState;
  exact?: boolean;
  component: React.ComponentType | React.SFC<any> | boolean;
  navigationOptions: INavigationOptions;
  contentOptions: IContentOptions;
  headerOptions: IHeaderOptions;

  constructor({ key, title, path, parent, component, exact = false, navigationOptions, contentOptions, headerOptions }: IPageConstructor) {
    this.key = key;
    this.title = title;
    this.path = path;
    this.parent = parent ? parent : (window as W).AppService.getRoot();
    this.component = component !== false ? (component || DefaultComponent) : false;
    this.exact = exact;
    this.navigationOptions = {
      visible: true,
      component: undefined,
      ...this.getDashoutConfig().navigationOptions, ...navigationOptions ? navigationOptions : {}
    }
    this.contentOptions = {
      maxWidth: '100%',
      ...this.getDashoutConfig().contentOptions, ...contentOptions ? contentOptions : {}
    }
    this.headerOptions = { visible: true, title: this.title, ...headerOptions ? headerOptions : {} }

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

  get type(): DashoutModelType {
    return DashoutModelType.Page
  }

  isChildHaveThisPath(path: string): boolean {
    var say = false;
    var pages = this.children.getState('pages');
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].getPath().includes(path)) {
        say = true;
        break;
      }
    }
    return say;
  }

  haveChildWithEmptyPath(): boolean {
    var say = false;
    var pages = this.children.getState('pages');
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].path === '') {
        say = true;
        break;
      }
    }
    return say;
  }

  getDashoutConfig(): IDashoutConfig {
    return this.parent.getDashoutConfig()
  }
}