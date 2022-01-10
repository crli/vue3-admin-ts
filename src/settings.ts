/*
 * @Author: crli
 * @Date: 2021-12-15 11:02:19
 * @LastEditors: crli
 * @LastEditTime: 2022-01-10 10:15:09
 * @Description: file content
 */
interface settingTy {
  title: string
  fixedHeader: boolean
  sidebarLogo: boolean
  showTitle: boolean
  showLeftMenu: boolean
  ShowDropDown: boolean
  showHamburger: boolean
  isNeedLogin: boolean
  isNeedNprogress: boolean
  mainNeedAnimation: boolean
  needTagsView: boolean
  tagsViewNum: number
  openProdMock: boolean
  errorLog: string | Array<string>
}

const setting: settingTy = {
  title: 'VUE3-ADMIN-TS',
  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the title in Navbar
   */
  showTitle: false,
  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description Whether show the drop-down
   */
  ShowDropDown: true,
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description Whether need login
   */
  isNeedLogin: true,
  /* page  animation related*/
  /**
   * @type {boolean} true | false
   * @description Whether need animation of main area
   */
  mainNeedAnimation: true,
  /**
   * @type {boolean} true | false
   * @description Whether need nprogress
   */
  isNeedNprogress: true,

  /**
   * @type {boolean} true | false
   * @description Whether show TagsView
   */
  needTagsView: true,
  /**
   * @description TagsView show number
   */
  tagsViewNum: 6,
  //showSettings: true
  /**
   * @type {boolean} true | false
   * @description Whether  open prod mock
   */
  openProdMock: true,
  /**
   * @type {string | array} 'serve' | ['build', 'serve']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['build', 'serve']
   */
  errorLog: ['serve', 'build']
}

export default setting
