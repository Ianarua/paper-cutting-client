export interface ILogin {
    username: string,
    password: string,
    [key: string]: string // 添加索引签名,不然报错
}
