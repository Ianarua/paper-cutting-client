import showShop from '@/api/Business/modules/showShop.ts';
import showGoods from '@/api/Business/modules/showGoods.ts';

/**
 * @description 展示商品by店铺id
 * @param shopId 店铺id
 */
export function getShopInfo (shopId: number) {
    return showShop(shopId);
}

/**
 * @description 展示店铺介绍by店铺id
 * @param shopId 店铺id
 * @param pageNum
 * @param pageSize
 */
export function getShopGoods (shopId: number, pageNum: number = 1, pageSize: number = 10) {
    return showGoods(shopId, pageNum, pageSize);
}
