import React, { ComponentClass } from 'react';
import { W } from './AppServices'
import actions from './actions';
import LightState from 'react-light-state';
import DefaultComponent from '../react/DefaultComponent';

interface IPageModel {
  key: string,
  title: String;
  path: string;
  parent?: IPage;
  children?: LightState;
  component?: React.FC | ComponentClass;
}

interface IPageModelConstructor {
  key: string,
  title: String;
  path: string;
  parent?: IPage;
  children?: Array<Page>;
  component?: React.FC | ComponentClass;
  exact?: boolean;
  navigationComponent?: React.FC<{ page: Page, level: number }>;
}

interface IPage extends IPageModel {
  addToSite(): void;
  addSubPage(page: IPage): IPage
}

/**
 * When Page create, it should be ready on Site mapping.
 * So when @method show() has been called, this page link should display on `Navigation` bar and ready to use
 */
export default class Page implements IPage {
  key: string;
  title: String;
  path: string;
  parent?: IPage;
  children: LightState;
  exact?: boolean;
  component: React.FC | ComponentClass;
  navigationComponent?: React.FC<{ page: Page, level: number }>;

  constructor({ key, title, path, parent, children, component, navigationComponent, exact = false }: IPageModelConstructor) {
    this.key = key;
    this.title = title;
    this.path = path;
    this.parent = parent;
    this.component = component || DefaultComponent;
    this.navigationComponent = navigationComponent;
    this.exact = exact;

    this.children = new LightState({
      pages: children ? children.map(page => {
        page.parent = this;
        return page;
      }) : []
    })
  }

  addToSite() {
    (window as W).AppService.dispatch({
      key: actions.core.add_page,
      payload: this
    })
  }

  addSubPage(page: IPage) {
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