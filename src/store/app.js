// Utilities
import { defineStore } from "pinia";
export const useAppStore = defineStore("app", {
    state: () => ({
        //Lang
        openLang: [],
        //User
        isAuthenticated: false,
        userData: null,
    }),
    actions: {
        // 更新lang並將status為1的放在最前面
        setOpenLang(newOpenLang) {
            this.openLang = newOpenLang.sort((a, b) => {
                if (a.status === 1 && b.status !== 1) {
                    return -1;
                }
                else if (a.status !== 1 && b.status === 1) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        },
    },
});
//# sourceMappingURL=app.js.map