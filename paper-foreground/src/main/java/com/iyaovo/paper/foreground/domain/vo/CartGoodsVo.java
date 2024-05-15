/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: CartGoodsVo
 * Author: 22932
 * Date: 2024/5/12 14:57:47
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.domain.vo;

import com.iyaovo.paper.foreground.domain.entity.ShopInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.List;

/**
 * @ClassName: CartGoodsVo
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/12 14:57:47
 */
@Schema(description = "购物车商品vo")
@Slf4j
@Data
@AllArgsConstructor
public class CartGoodsVo {

   @Schema(defaultValue = "商品id")
   private Integer goodsId;

   @Schema(defaultValue = "商品名称")
   private String goodsName;

   @Schema(defaultValue = "商品介绍")
   private String goodsIntroduction;

   @Schema(defaultValue = "标题图片base64形式")
   private String picUrl;

   @Schema(defaultValue = "原价")
   private BigDecimal price;

   @Schema(defaultValue = "促销价格")
   private BigDecimal promotionPrice;

   @Schema(defaultValue = "已售数量")
   private Integer soldNumber;

   @Schema(defaultValue = "库存量")
   private Integer totalNumber;

   @Schema(defaultValue = "店铺")
   private ShopInfo shopInfo;

   @Schema(defaultValue = "是否被收藏")
   private Boolean isCollection;

   @Schema(defaultValue = "是否加入购物车")
   private Boolean isJoinCart;

   @Schema(defaultValue = "购物车id")
   private Integer cartId;

   @Schema(defaultValue = "商品数量")
   private Integer goodsNumber;

   public CartGoodsVo(Integer goodsId, String goodsName, String goodsIntroduction, String picUrl, BigDecimal price, BigDecimal promotionPrice, Integer soldNumber, Integer totalNumber,Integer cartId,Integer goodsNumber) {
      this.goodsId = goodsId;
      this.goodsName = goodsName;
      this.goodsIntroduction = goodsIntroduction;
      this.picUrl = picUrl;
      this.price = price;
      this.promotionPrice = promotionPrice;
      this.soldNumber = soldNumber;
      this.totalNumber = totalNumber;
      this.cartId = cartId;
      this.goodsNumber = goodsNumber;
   }


}

