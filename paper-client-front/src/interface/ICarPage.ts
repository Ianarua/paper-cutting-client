import { IBusinessInfo } from '@/interface/IBusinessPage.ts';
import IProjectBlock from '@/interface/IProjectBlock.ts';

export interface ICarItem {
    shopInfoVo: IBusinessInfo;    // 商家店铺信息
    projectInfo: Omit<IProjectBlock, 'shopName' | 'shopId'> & { cartId: number };      // 商品信息
}
