import recommendGoods from './modules/recommendGoods.ts';
import settleGoods from '@/api/ProjectInfo/modules/settleGoods.ts';

/**
 @description 展示推荐物品
 @param pageNum
 @param pageSize
 */
export function getRecommendGoods (pageNum: number = 1, pageSize: number = 6) {
    return recommendGoods(pageNum, pageSize);
}

/**
 * @description 展示结算商品
 * @param ids 商品ids
 */
export function getSettleGoods (ids: number[]) {
    return settleGoods(ids);
}
