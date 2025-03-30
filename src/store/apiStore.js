import { defineStore } from "pinia";
import { ref } from "vue";
export const useApiStore = defineStore("apiStore", () => {
    // const ASSET_URL = import.meta.env.VITE_ASSET_URL
    const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
    const NODE_ENV = import.meta.env.VITE_NODE_ENV;
    const WEB_IP = import.meta.env.VITE_WEB_IP;
    const WEB_PORT = import.meta.env.VITE_WEB_PORT;
    const TCP_IP = import.meta.env.VITE_TCP_IP;
    const TCP_PORT = import.meta.env.VITE_TCP_PORT;
    const WEBSOCKET_IP = import.meta.env.VITE_WEBSOCKET_IP;
    const WEBSOCKET_PORT = import.meta.env.VITE_WEBSOCKET_PORT;
    const API_URL = import.meta.env.VITE_API_URL;
    const CONNECT_IP = import.meta.env.VITE_CONNECT_IP;
    const vite_node_env = ref(NODE_ENV || "");
    const vite_public_path = ref(PUBLIC_URL || "");
    const vite_web_ip = ref(WEB_IP);
    const vite_web_port = ref(WEB_PORT);
    const vite_tcp_ip = ref(TCP_IP);
    const vite_tcp_port = ref(TCP_PORT);
    const vite_websocket_ip = ref(WEBSOCKET_IP);
    const vite_websocket_port = ref(WEBSOCKET_PORT);
    const vite_api_url = ref(API_URL || "");
    const vite_connect_ip = ref(CONNECT_IP || "");
    const isAllReady = ref(false);
    const inRouterResData = ref({});
    const readyName = ref("");
    const getApiData = ref({});
    const locale = ref("zh_cht");
    const apiLoading = ref(true);
    const dataUpdateLoading = ref(false);
    const isCheck = ref(false);
    const isSocketLink = ref("red-darken-3");
    const modeDatabase = ref({});
    const currentDatabase = ref({});
    const currentUseDatabase = ref({});
    const isDisconnected = ref(true);
    const isPowerLoading = ref(false);
    const isLightLoading = ref(false);
    const appBarLightIndex = ref("null");
    const appBarPowerIndex = ref("null");
    const menuCurrentKey = ref("");
    return {
        locale,
        vite_node_env,
        vite_api_url,
        // vite_asset_url,
        vite_public_path,
        vite_web_port,
        vite_tcp_port,
        vite_websocket_port,
        vite_web_ip,
        vite_tcp_ip,
        vite_connect_ip,
        vite_websocket_ip,
        inRouterResData,
        getApiData,
        apiLoading,
        isCheck,
        isDisconnected,
        dataUpdateLoading,
        appBarLightIndex,
        appBarPowerIndex,
        menuCurrentKey,
        isAllReady,
        readyName,
        isPowerLoading,
        isLightLoading,
        isSocketLink,
        modeDatabase,
        currentDatabase,
        currentUseDatabase,
    };
});
//# sourceMappingURL=apiStore.js.map