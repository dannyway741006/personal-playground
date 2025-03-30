//debounce 第一次觸發後，每隔一段時間觸發一次
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let isFirstCall = true

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this
    if (isFirstCall) {
      func.apply(context, args)
      isFirstCall = false
      return
    }

    clearTimeout(timeout!)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

//高度重新定義
const allResize = (entity: HTMLElement) => {
  entity.style.height = window.innerHeight + "px"
  window.addEventListener("orientationchange", () => {
    let appResize = setTimeout(() => {
      entity.style.height = window.innerHeight + "px"
      clearTimeout(appResize)
    }, 300)
  })
  window.addEventListener("resize", () => {
    let appResize = setTimeout(() => {
      entity.style.height = window.innerHeight + "px"
      clearTimeout(appResize)
    }, 300)
  })
}
//ScrollTo Top
const scrollTo = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
//號碼長度限制並過濾消毒(XSRF)
const inputFilter = (e: Event, number: number): Promise<void> => {
  return new Promise((resolve) => {
    ;(e.target as HTMLInputElement).value = (
      e.target as HTMLInputElement
    ).value.replace(/[^\d]/g, "") //不是數字會取代為空值
    if ((e.target as HTMLInputElement).value.length > number) {
      ;(e.target as HTMLInputElement).value = (
        e.target as HTMLInputElement
      ).value.slice(0, number)
    }
    resolve() // 執行成功時 resolve
  })
}
// 大圖載入判斷
const imgLoad = (currentClass: string | Element): Promise<boolean> => {
  let avatar = ""
  let imgUrl = ""
  let modalElement = document.querySelector(`.${currentClass}`) as Element
  if (currentClass) {
    avatar = getComputedStyle(modalElement).backgroundImage
    console.log("avatar::", avatar)
  }
  const matchResult = avatar.match(/url\("(\S*)"\)/)
  if (matchResult) {
    imgUrl = matchResult[1]
  }
  let bgImg = new Image()
  bgImg.src = imgUrl
  return new Promise((resolve) => {
    bgImg.onload = () => {
      setTimeout(() => {
        resolve(true)
      }, 500)
    }
  })
}

//取得元素高度
const getElementHeight = (elementId: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const checkElementHeight = () => {
      const element = document.getElementById(elementId)
      const actions = {
        true: () => resolve(element!.offsetHeight),
        false: () => setTimeout(checkElementHeight, 100),
      }
      actions[!!element ? "true" : "false"]()
    }

    checkElementHeight()
  })
}
export { debounce, allResize, scrollTo, inputFilter, imgLoad, getElementHeight }
