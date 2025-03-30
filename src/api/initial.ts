// import axios from "axios"
// const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8029"
// const service = axios.create({
//   baseURL: apiUrl,
//   withCredentials: true,
// })

// service.interceptors.request.use(
//   (config) => {
//     // 可以根據 config 進行其他操作
//     // if (config.something) do something
//     return config
//   },
//   (error) => {
//     // handle error
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   (response) => {
//     return response.data
//   },
//   (error) => {
//     // handle error
//     if (error.response) {
//       console.log("in interceptors: ", error.response)
//       // 可以根據 error code 執行特定程式
//       // switch (error.response.status) {
//       //     case 401:
//       //         break;
//       //     default:
//       //         break;
//       // }
//     }
//     return Promise.reject(error)
//   }
// )

// export default service
