import withChildrenCategory from '@/api/Category/modules/withChildrenCategory.ts';
import goodsByCategory from '@/api/Category/modules/goodsByCategory.ts';

/**
 * @description 查询所有商品分类的一级分类及子分类
 */
export function getWithChildrenCategory () {
    return withChildrenCategory();
}

/**
 * @description 根据分类id查询改分类里面的商品信息
 * @param goodsCategoryId 分类id
 * @param pageNum
 * @param pageSize
 */
export function getGoodsByCategory (goodsCategoryId: number, pageNum: number = 1, pageSize: number = 100) {
    return goodsByCategory(goodsCategoryId, pageNum, pageSize);
}
