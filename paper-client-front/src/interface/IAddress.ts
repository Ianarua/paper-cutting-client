export interface IAddress {
    /* 收货地址id */
    receivingAddressId: number;

    // /* 买家id */
    // buyerId: number;

    /* 收件人姓名 */
    recipientName: string;

    /* 收件人电话号 */
    recipientPhone: string;

    /* 地区 */
    recipientRegion: string;

    /* 详细地址 */
    recipientAddress: string;

    [key: string]: any
}

