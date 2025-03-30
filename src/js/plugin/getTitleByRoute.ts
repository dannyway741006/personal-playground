import { menuItems } from "../../data/navigation.json"
import type { Plugin, TitleObj } from "../../interface/index"
/*
取得路由對應的中文標題，若需新增標題，請修改routeToTitle.json
輸出：{ project路由, title中文標題 }
*/
class GetTitleData {
  plugins: Plugin[] = []
  use(plugin: Plugin) {
    this.plugins.push(plugin)
    this[plugin.name] = plugin.fn
  }
  [key: string]: any
}
const projectTitle = {
  name: "getProjectTitle",
  async fn() {
    interface SubLink {
      id: number
      key: string
      text: string
      to: string | null
    }

    interface SubItem {
      id: number
      to?: string | null
      fatherKey: string
      key: string
      text: string
      icon: string
      subLinks: SubLink[] | null
    }

    interface MenuItems {
      id?: number
      key: string
      icon: string
      text: string
      to?: string | null
      subLinks: SubItem[] | null
    }

    interface TitleData {
      title: string
      title_sub1: string
      title_sub2: string
    }
    console.log("getProjectTitle::", window.location.pathname)
    let titleData: TitleData = {
      title: "",
      title_sub1: "",
      title_sub2: "",
    }
    let fullPathArr = window.location.pathname.split("/")
    const levelMapping = {
      1: (text: string) => (titleData.title = text),
      2: (text: string) => (titleData.title_sub1 = `\t/\t${text}`),
      3: (text: string) => (titleData.title_sub2 = `\t/\t${text}`),
    }

    const updateTitleData = (
      item: SubLink | SubItem | MenuItems,
      level: 1 | 2 | 3
    ) => {
      if (fullPathArr.includes(item.key)) {
        levelMapping[level](item.text)
      }
    }

    const traverseMenuItems = (
      items: (MenuItems | SubItem | SubLink)[],
      level: 1 | 2 | 3
    ) => {
      items.forEach((item) => {
        if (fullPathArr.includes(item.key)) {
          updateTitleData(item, level)
          if ("subLinks" in item && item.subLinks) {
            traverseMenuItems(item.subLinks, (level + 1) as 1 | 2 | 3)
          }
        }
      })
    }

    traverseMenuItems(menuItems, 1 as 1 | 2 | 3)
    return titleData
  },
}

export { GetTitleData, projectTitle }
