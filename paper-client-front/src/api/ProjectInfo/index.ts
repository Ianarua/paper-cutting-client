import recommendGoods from './modules/recommendGoods.ts';
import settleGoods from '@/api/ProjectInfo/modules/settleGoods.ts';
import idByGoods from '@/api/ProjectInfo/modules/idByGoods.ts';

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

/**
 * @description 通过id获取商品
 * @param goodsId 商品id
 */
export function getIdGoods (goodsId: number) {
    return idByGoods(goodsId);
}
