import IProjectBlock from '@/interface/IProjectBlock.ts';
import { IBusinessInfo } from '@/interface/IBusinessPage.ts';

export interface ISettleItem {
    shopInfo: IBusinessInfo;
    projectInfo: Omit<IProjectBlock, 'shopName' | 'shopId'> & { cartId: number };
    quantity: number;
}
