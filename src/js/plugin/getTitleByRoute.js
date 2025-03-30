import { menuItems } from "../../data/navigation.json";
/*
取得路由對應的中文標題，若需新增標題，請修改routeToTitle.json
輸出：{ project路由, title中文標題 }
*/
class GetTitleData {
    plugins = [];
    use(plugin) {
        this.plugins.push(plugin);
        this[plugin.name] = plugin.fn;
    }
}
const projectTitle = {
    name: "getProjectTitle",
    async fn() {
        console.log("getProjectTitle::", window.location.pathname);
        let titleData = {
            title: "",
            title_sub1: "",
            title_sub2: "",
        };
        let fullPathArr = window.location.pathname.split("/");
        const levelMapping = {
            1: (text) => (titleData.title = text),
            2: (text) => (titleData.title_sub1 = `\t/\t${text}`),
            3: (text) => (titleData.title_sub2 = `\t/\t${text}`),
        };
        const updateTitleData = (item, level) => {
            if (fullPathArr.includes(item.key)) {
                levelMapping[level](item.text);
            }
        };
        const traverseMenuItems = (items, level) => {
            items.forEach((item) => {
                if (fullPathArr.includes(item.key)) {
                    updateTitleData(item, level);
                    if ("subLinks" in item && item.subLinks) {
                        traverseMenuItems(item.subLinks, (level + 1));
                    }
                }
            });
        };
        traverseMenuItems(menuItems, 1);
        return titleData;
    },
};
export { GetTitleData, projectTitle };
//# sourceMappingURL=getTitleByRoute.js.map