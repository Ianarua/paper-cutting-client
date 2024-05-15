export interface IOrderBlock {
    /* 订单Id */
    orderId: number;

    /* 商品Id */
    goodsId: number;

    /* 用户Id */
    buyerId: number;

    /* 订单状态 可用值:待付款,待发货,待收货,待评价,退款/售后 */
    orderStatus: number;

    /* 地址Id */
    receivingAddressId: number;
}
