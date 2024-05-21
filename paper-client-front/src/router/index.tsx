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
import Camera from '@/views/Camera';
import Login from '@/views/Login';
import Register from '@/views/Register';
import StartPage from '@/views/StartPage';

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
        name: 'StartPage',
        title: '首屏启动',
        component: StartPage
    },
    {
        name: 'Main',
        title: '首页',
        component: Main,

    },
    {
        name: 'Login',
        title: '登录',
        component: Login
    },
    {
        name: 'Register',
        title: '注册',
        component: Register
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
    },
    {
        name: 'Camera',
        title: '选择图片',
        component: Camera
    }
];

export default router;
