import createAddress from '@/api/Address/modules/createAddress.ts';
import deleteAddress from '@/api/Address/modules/deleteAddress.ts';
import showAllAddress from '@/api/Address/modules/showAllAddress.ts';
import showIdAddress from '@/api/Address/modules/showIdAddress.ts';
import updateAddress from '@/api/Address/modules/updateAddress.ts';
import { IAddress } from '@/interface/IAddress.ts';

/**
 * @description 新建收货地址
 * @param addressDetailData
 * @param addressDetailData.receivingAddressId 收货地址id
 * @param addressDetailData.recipientName  收件人姓名
 * @param addressDetailData.recipientPhone 收件人电话号
 * @param addressDetailData.recipientRegion 地区
 * @param addressDetailData.recipientAddress 详细地址
 */
export function postCreateAddress (addressDetailData: IAddress) {
    const { receivingAddressId, recipientName, recipientPhone, recipientRegion, recipientAddress } = addressDetailData;
    return createAddress(receivingAddressId, recipientName, recipientPhone, recipientRegion, recipientAddress);
}

/**
 * @description 通过id删除收货地址
 * @param receivingAddressId 收货地址id
 */
export function getDeleteAddress (receivingAddressId: number) {
    return deleteAddress(receivingAddressId);
}

/**
 * @description 展示全部收货地址
 */
export function getAllAddress () {
    return showAllAddress();
}

/**
 * @description 通过id获取收货地址
 * @param receivingAddressId 收货地址id
 */
export function getIdAddress (receivingAddressId: number) {
    return showIdAddress(receivingAddressId);
}

/**
 * @description 更改收货地址
 * @param addressDetailData
 * @param addressDetailData.receivingAddressId 收货地址id
 * @param addressDetailData.recipientName  收件人姓名
 * @param addressDetailData.recipientPhone 收件人电话号
 * @param addressDetailData.recipientRegion 地区
 * @param addressDetailData.recipientAddress 详细地址
 */
// receivingAddressId: number, recipientName: string, recipientPhone: number, recipientRegion: string, recipientAddress: string)
export function postUpdateAddress (addressDetailData: IAddress) {
    const { receivingAddressId, recipientName, recipientPhone, recipientRegion, recipientAddress } = addressDetailData;
    return updateAddress(receivingAddressId, recipientName, recipientPhone, recipientRegion, recipientAddress);
}
