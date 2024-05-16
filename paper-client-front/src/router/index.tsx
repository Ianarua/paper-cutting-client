import Main from '../views/Main';
import HomeScreen from '../views/HomeScreen';
import ShoppingScreen from '../views/ShoppingScreen';
import CarScreen from '../views/CarScreen';
import MineScreen from '../views/MineScreen';

import PersonalInfo from '../views/PersonalInfo';
import ProjectDetail from '../views/ProjectDetail';
import SignUp from '../views/SignUp';
import SetUp from '../views/SetUp';
import Address from '@/views/Adress';
import Settle from '@/views/Settle';
import Order from '@/views/Order';
import AddressDetail from '@/views/Adress/components/AddressDetail';
import ShoppingList from '@/views/ShoppingList';
import BusinessDetail from '@/views/BusinessDetail';

/*
    只配置stack
 */
interface IBottomTab {
    name: string,
    component: any,
}

interface IRouter {
    name: string,       // 页面名字,供跳转使用
    title?: string,      // 头部标题
    component: any,
    // bottomTab?: IBottomTab[]
}

const router: IRouter[] = [
    {
        name: 'Main',
        title: '首页',
        component: Main,

    },
    {
        name: 'SignUp',
        title: '签到',
        component: SignUp
    },
    {
        name: 'ProjectDetail',
        title: '商品信息',
        component: ProjectDetail
    },
    {
        name: 'ShoppingList',
        title: '商品列表',
        component: ShoppingList
    },
    {
        name: 'PersonalInfo',
        title: '个人信息',
        component: PersonalInfo
    },
    {
        name: 'SetUp',
        title: '设置',
        component: SetUp
    },
    {
        name: 'Address',
        title: '收货地址',
        component: Address
    },
    {
        name: 'AddressDetail',
        title: '编辑收货地址',
        component: AddressDetail
    },
    {
        name: 'Settle',
        title: '结算',
        component: Settle
    },
    {
        name: 'Order',
        title: '我的订单',
        component: Order
    },
    {
        name: 'BusinessDetail',
        title: '店铺详情页',
        component: BusinessDetail
    }
];

export default router;
