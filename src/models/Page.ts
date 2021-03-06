import React, { ComponentType, CSSProperties } from 'react'
import { W } from './AppServices'
import LightState from 'react-light-state'
import DefaultComponent from '../react/default/DefaultComponent'
import Root, { DashoutModelType } from './Root'
import { IDashoutConfig } from './AppServices'

interface IPageModel {
  key: string
  path: string
  parent: Page | Root
  readonly children?: LightState
  component?: React.ComponentType | React.SFC<any> | boolean
}

export interface INavigationOptions {
  visible?: boolean
  component?: React.SFC<{ page: Page; level: number }>
  icon?: any
  childPaddingMultiplier?: number,
  badge?: any,
  badgeStyle?: CSSProperties 
}

export interface IContentOptions {
  maxWidth?: number | string
  layout?: string
}

interface IHeaderOptions {
  title?: string
  visible?: boolean
  controls?: JSX.Element[] | React.ElementType | ComponentType
  masterLayoutComponent?: React.FC
}

interface IPageConstructor {
  key: string
  title: string
  path: string
  parent?: Page | Root
  readonly children?: Array<Page>
  component?: React.ComponentType | React.SFC<any> | boolean
  exact?: boolean
  navigationOptions?: INavigationOptions
  contentOptions?: IContentOptions
  headerOptions?: IHeaderOptions
  layouted?: boolean
}

interface IPage extends IPageModel {
  addToSite(): void
  addPage(page: Page): Page
}

/**
 * When Page create, it should be ready on Site mapping.
 * So when @method show() has been called, this page link should display on `Navigation` bar and ready to use
 */
export default class Page implements IPage {
  key: string
  path: string
  parent: Page | Root
  readonly children: LightState
  readonly state: LightState
  exact?: boolean
  component: React.ComponentType | React.SFC<any> | boolean
  navigationOptions: INavigationOptions
  contentOptions: IContentOptions
  headerOptions: IHeaderOptions
  layouted: boolean

  constructor({
    key,
    title,
    path,
    parent,
    component,
    exact = false,
    navigationOptions,
    contentOptions,
    headerOptions,
    layouted = true
  }: IPageConstructor) {
    this.key = key
    this.path = path
    this.parent = parent ? parent : (window as W).AppService.getRoot()
    this.component = component !== false ? component || DefaultComponent : false
    this.exact = exact
    this.layouted = layouted
    this.navigationOptions = {
      visible: true,
      component: undefined,
      ...this.getDashoutConfig().navigationOptions,
      ...(navigationOptions ? navigationOptions : {}),
    }
    this.contentOptions = {
      maxWidth: '100%',
      ...this.getDashoutConfig().contentOptions,
      ...(contentOptions ? contentOptions : {}),
    }
    this.headerOptions = {
      visible: true,
      ...(headerOptions ? headerOptions : {}),
    }

    this.children = new LightState({
      pages: [],
    })
    this.parent.addPage(this)
    this.state = new LightState({
      title,
      breadcrumbTitle: title,
      headerTitle: title,
    })
  }

  addToSite() {}

  getPath(): string {
    return this.parent.getPath() + this.path
  }

  getPathPages(): Array<Page> {
    return [...this.parent.getPathPages(), this]
  }

  addPage(page: Page) {
    page.parent = this
    this.children.setState({
      pages: this.children.getState('pages').concat(page),
    })
    return page
  }

  usePages(): Array<Page> {
    return this.children.useStore((state: any) => state.pages)
  }

  get type(): DashoutModelType {
    return DashoutModelType.Page
  }

  isChildHaveThisPath(path: string): boolean {
    var say = false
    var pages = this.children.getState('pages')
    for (var i = 0; i < pages.length; i++) {
      if (path.includes(pages[i].getPath())) {
        say = true
        break
      }
    }
    return say
  }

  haveChildWithEmptyPath(): boolean {
    var say = false
    var pages = this.children.getState('pages')
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].path === '') {
        say = true
        break
      }
    }
    return say
  }

  getDashoutConfig(): IDashoutConfig {
    return this.parent.getDashoutConfig()
  }

  get Root(): Root {
    return this.parent.Root
  }

  setActivePage(context: Page = this): void {
    this.parent.setActivePage(context)
  }

  set title(newTitle: string) {
    this.state.setState({ title: newTitle })
  }

  get title() {
    return this.state.getState('title')
  }

  set breadcrumbTitle(newTitle: string) {
    this.state.setState({ breadcrumbTitle: newTitle })
  }

  get breadcrumbTitle() {
    return this.state.getState('breadcrumbTitle')
  }

  useState(): { title: string; breadcrumbTitle: string; headerTitle: string } {
    return this.state.useStore((state: any) => state)
  }
}
