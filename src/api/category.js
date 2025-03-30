import service from "./initial.ts";
//取得分類列表
export function getCategories() {
    return service({
        url: "/api/category",
        method: "get",
    });
}
//建立分類
// export function createCategory(data: any) {
//   return service({
//     url: "/api/category",
//     method: "post",
//     data,
//   });
// }
//排序分類
export function sortCategory(data) {
    return service({
        url: "/api/category/sort",
        method: "post",
        data,
    });
}
//# sourceMappingURL=category.js.map