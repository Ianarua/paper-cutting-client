import { RouteProp } from '@react-navigation/native';
import { IShopCategory } from '@/interface/IShopPage.ts';
import IProjectBlock from '@/interface/IProjectBlock.ts';
import { IAddress } from '@/interface/IAddress.ts';

export enum Views {
    Shop = '商品',
    ShoppingList = 'ShoppingList',
    ProjectDetail = 'ProjectDetail',
    AddressDetail = 'AddressDetail',
}

export type RootStackParamList = {
    [Views.Shop]: {
        shopCategoryData: IShopCategory;
        callback: () => void;
    };
    [Views.ShoppingList]: {
        goodsCategoryId: number
    },
    [Views.ProjectDetail]: {
        projectBlockData: IProjectBlock;
    };
    [Views.AddressDetail]: {
        addressDetailParams: IAddress
    }
};

export type RootRouteType<RouteName extends keyof RootStackParamList> = RouteProp<RootStackParamList, RouteName>;
