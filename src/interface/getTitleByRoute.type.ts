export interface Plugin {
  name: string
  fn: (...args: any[]) => any
}
export interface TitleObj {
  title: string
  title_sub1: string
  title_sub2: string
}
