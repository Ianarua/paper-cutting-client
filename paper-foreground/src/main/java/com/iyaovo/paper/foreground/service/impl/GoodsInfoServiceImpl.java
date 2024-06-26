/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: GoodsInfoServiceImpl
 * Author: 22932
 * Date: 2024/4/13 19:30:56
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.service.impl;

import cn.hutool.core.util.ObjectUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.iyaovo.paper.common.api.CommonPage;
import com.iyaovo.paper.common.constant.Constants;
import com.iyaovo.paper.common.util.ImageToBase64Util;
import com.iyaovo.paper.foreground.domain.dto.IdsParam;
import com.iyaovo.paper.foreground.domain.entity.*;
import com.iyaovo.paper.foreground.domain.vo.CartGoodsVo;
import com.iyaovo.paper.foreground.domain.vo.GoodsInfoVo;
import com.iyaovo.paper.foreground.domain.vo.ShopInfoVo;
import com.iyaovo.paper.foreground.mapper.*;
import com.iyaovo.paper.foreground.service.IBuyerInfoService;
import com.iyaovo.paper.foreground.service.IGoodsInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName: GoodsInfoServiceImpl
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/4/13 19:30:56
 */
@Service
@RequiredArgsConstructor
public class GoodsInfoServiceImpl extends ServiceImpl<GoodsInfoMapper, GoodsInfo> implements IGoodsInfoService {

   private final GoodsInfoMapper goodsInfoMapper;

   private final ShopInfoMapper shopInfoMapper;

   private final GoodsCategoryMapper goodsCategoryMapper;

   private final CartInfoMapper cartInfoMapper;

   private final IBuyerInfoService iBuyerInfoService;

   private final GoodsViewsMapper goodsViewsMapper;

   private final GoodsCollectionMapper goodsCollectionMapper;

   private final ShopFollowMapper shopFollowMapper;



   @Override
   public CommonPage<GoodsInfoVo> showRecommendedGoods(Integer pageNum, Integer pageSize) {
      Page<GoodsInfo> goodsInfoPage = goodsInfoMapper.selectPage(new Page<>(pageNum,pageSize), null);
      List<GoodsInfoVo> goodsInfoVos = goodsInfoToGoodsInfoVo(goodsInfoPage.getRecords());
      Page<GoodsInfoVo> goodsInfoVoPage = new Page<>(pageNum,pageSize,goodsInfoPage.getTotal());
      goodsInfoVoPage.setPages(goodsInfoPage.getPages());
      goodsInfoVoPage.setRecords(goodsInfoVos);
      return CommonPage.restPage(goodsInfoVoPage);
   }

   @Override
   public CommonPage<GoodsInfoVo> showGoodsByGoodsCategoryId(Integer goodsCategoryId, Integer pageNum, Integer pageSize) {
      QueryWrapper<GoodsInfo> goodsInfoQueryWrapper = new QueryWrapper<>();
      goodsInfoQueryWrapper.eq("goods_category_id",goodsCategoryId);
      Page<GoodsInfo> goodsInfoPage = goodsInfoMapper.selectPage(new Page<>(pageNum,pageSize), goodsInfoQueryWrapper);
      List<GoodsInfoVo> goodsInfoVos = goodsInfoToGoodsInfoVo(goodsInfoPage.getRecords());
      Page<GoodsInfoVo> goodsInfoVoPage = new Page<>(pageNum,pageSize,goodsInfoPage.getTotal());
      goodsInfoVoPage.setPages(goodsInfoPage.getPages());
      goodsInfoVoPage.setRecords(goodsInfoVos);
      return CommonPage.restPage(goodsInfoVoPage);
   }




   private List<GoodsInfoVo> goodsInfoToGoodsInfoVo(List<GoodsInfo> goodsInfoList){
      List<GoodsInfoVo> goodsInfoVoList = new ArrayList<GoodsInfoVo>();
      goodsInfoList.forEach(goodsInfo ->{
         if(!ObjectUtil.isEmpty(goodsInfo)){
            //entity转为vo
            GoodsInfoVo goodsInfoVo = new GoodsInfoVo(goodsInfo.getGoodsId(),goodsInfo.getGoodsName(),goodsInfo.getGoodsIntroduction(),ImageToBase64Util.convertFileToBase64(Constants.RESOURCE_PATH+goodsInfo.getPicUrl()), goodsInfo.getPrice(),
                    goodsInfo.getPromotionPrice(),goodsInfo.getSoldNumber(),goodsInfo.getTotalNumber());
            QueryWrapper<GoodsCollection> goodsCollectionQueryWrapper = new QueryWrapper<>();
            goodsCollectionQueryWrapper.eq("goods_id",goodsInfo.getGoodsId())
                    .eq("buyer_id",iBuyerInfoService.getBuyerInfo().getBuyerId());
            GoodsCollection goodsCollection = goodsCollectionMapper.selectOne(goodsCollectionQueryWrapper);
            if(ObjectUtil.isEmpty(goodsCollection)){
               goodsInfoVo.setIsCollection(false);
            }else{
               goodsInfoVo.setIsCollection(true);
            }
            //判断商品是否被加入购物车
            QueryWrapper<CartInfo> cartInfoQueryWrapper = new QueryWrapper<>();
            cartInfoQueryWrapper.eq("goods_id",goodsInfo.getGoodsId())
                    .eq("buyer_id",iBuyerInfoService.getBuyerInfo().getBuyerId());
            CartInfo cartInfo = cartInfoMapper.selectOne(cartInfoQueryWrapper);
            if(ObjectUtil.isEmpty(cartInfo)){
               goodsInfoVo.setIsJoinCart(false);
            }else{
               goodsInfoVo.setIsJoinCart(true);
            }
            //把店铺信息封装到vo
            ShopInfo shopInfo = shopInfoMapper.selectById(goodsInfo.getShopId());
            ShopInfoVo shopInfoVo = new ShopInfoVo(shopInfo.getShopId(), shopInfo.getShopName(), ImageToBase64Util.convertFileToBase64(Constants.RESOURCE_PATH + shopInfo.getPicUrl()));

            QueryWrapper<ShopFollow> shopFollowQueryWrapper = new QueryWrapper<ShopFollow>();
            shopFollowQueryWrapper.eq("shop_id",shopInfo.getShopId())
                            .eq("buyer_id",iBuyerInfoService.getBuyerInfo().getBuyerId());
            ShopFollow shopFollow = shopFollowMapper.selectOne(shopFollowQueryWrapper);
            if(ObjectUtil.isEmpty(shopFollow)){
               shopInfoVo.setIsFavorite(false);
            }else{
               shopInfoVo.setIsFavorite(true);
            }
            goodsInfoVo.setShopInfoVo(shopInfoVo);
            goodsInfoVoList.add(goodsInfoVo);
         }
      });
      return goodsInfoVoList;
   }

   @Override
   public List<CartGoodsVo> showCartGoods() {
      QueryWrapper<GoodsInfoVo> goodsInfoVoQueryWrapper = new QueryWrapper<>();
      QueryWrapper<CartInfo> cartInfoQueryWrapper = new QueryWrapper<>();
      cartInfoQueryWrapper.eq("buyer_id",iBuyerInfoService.getBuyerInfo().getBuyerId());
      List<CartInfo> cartInfoList = cartInfoMapper.selectList(cartInfoQueryWrapper);
      List<CartGoodsVo> cartGoodsVos = new ArrayList<>();
      cartInfoList.forEach(cartInfo -> {
         GoodsInfo goodsInfo = goodsInfoMapper.selectById(cartInfo.getGoodsId());
         if(!ObjectUtil.isEmpty(goodsInfo)){
            List<GoodsInfo> goodsInfoList = new ArrayList<>();
            goodsInfoList.add(goodsInfo);
            GoodsInfoVo goodsInfoVo = goodsInfoToGoodsInfoVo(goodsInfoList).get(0);
            CartGoodsVo cartGoodsVo = goodsInfoVoToCartGoodsVo(goodsInfoVo,cartInfo.getCartId(),cartInfo.getGoodsNumber());
            cartGoodsVos.add(cartGoodsVo);
         }
      });
      return cartGoodsVos;
   }

   @Override
   public List<GoodsInfoVo> showSettleGoods(IdsParam idsParam) {
      List<GoodsInfo> goodsInfoList = new ArrayList<>();
      for (long goodsId : idsParam.getIds()) {
         goodsInfoList.add(goodsInfoMapper.selectById(goodsId));
      }
      return goodsInfoToGoodsInfoVo(goodsInfoList);
   }

   @Override
   public GoodsInfoVo getGoodsById(Integer goodsId) {
      QueryWrapper<GoodsViews> goodsViewsQueryWrapper = new QueryWrapper<>();
      goodsViewsQueryWrapper.eq("goods_id",goodsId);
      GoodsViews goodsViews = goodsViewsMapper.selectOne(goodsViewsQueryWrapper);
      if(goodsViews == null){
         goodsViewsMapper.insert(new GoodsViews(null,goodsId,iBuyerInfoService.getBuyerInfo().getBuyerId(),null));
      }else{
         goodsViews.setCreateTime(LocalDateTime.now());
         goodsViewsMapper.updateById(goodsViews);
      }
      GoodsInfo goodsInfo = goodsInfoMapper.selectById(goodsId);
      List<GoodsInfo> goodsInfoList = new ArrayList<>();
      goodsInfoList.add(goodsInfo);
      return goodsInfoToGoodsInfoVo(goodsInfoList).get(0);
   }

   private CartGoodsVo goodsInfoVoToCartGoodsVo(GoodsInfoVo goodsInfoVo, Integer cartId, Integer goodsNumber){
      CartGoodsVo cartGoodsVo = new CartGoodsVo(goodsInfoVo.getGoodsId(), goodsInfoVo.getGoodsName(), goodsInfoVo.getGoodsIntroduction(),
              goodsInfoVo.getPicUrl(),goodsInfoVo.getPrice(),goodsInfoVo.getPromotionPrice(),
              goodsInfoVo.getSoldNumber(),goodsInfoVo.getTotalNumber(),goodsInfoVo.getShopInfoVo(),goodsInfoVo.getIsCollection(),goodsInfoVo.getIsJoinCart(),cartId,goodsNumber);
      return cartGoodsVo;
   }
}

