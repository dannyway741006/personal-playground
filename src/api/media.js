import service from "./initial.ts";
//取得媒體列表
//ids為post＿id，顯示該post關聯的媒體
export function getMedia(filter, page, ids) {
    let url = "/api/media";
    if (filter || page || ids)
        url += "?";
    if (filter)
        url += `filter=${filter}`;
    if (page)
        url += `&page=${page}`;
    if (ids)
        url += `&post_id=${ids}`;
    return service({
        url: url,
        method: "get",
    });
}
//# sourceMappingURL=media.js.map