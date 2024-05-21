import IProjectBlock from '@/interface/IProjectBlock.ts';
import { IBusinessInfo } from '@/interface/IBusinessPage.ts';

export interface ISettleItem {
    shopInfoVo: IBusinessInfo;
    projectInfo: Omit<IProjectBlock, 'shopName' | 'shopId'> & { cartId: number };
    quantity: number;
}
