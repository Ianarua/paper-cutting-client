import allOrder from '@/api/Order/modules/allOrder.ts';
import orderByStatus from '@/api/Order/modules/orderByStatus.ts';
import deleteOrder from '@/api/Order/modules/deleteOrder.ts';

/**
 * @description 展示全部订单
 * @param pageNum
 * @param pageSize
 */
export function getAllOrder (pageNum: number = 1, pageSize: number = 100) {
    return allOrder(pageNum, pageSize);
}

/**
 * @description 展示订单by状态
 * @param orderStatus 状态id
 */
export function getOrderByStatus (orderStatus: number) {
    return orderByStatus(orderStatus);
}

/**
 * @description 通过ids删除订单
 * @param ids 订单ids
 */
export function postDeleteOrder (ids: number[]) {
    return deleteOrder(ids);
}
