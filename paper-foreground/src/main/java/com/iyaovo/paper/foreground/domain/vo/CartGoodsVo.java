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
public class CartGoodsVo extends GoodsInfoVo{

   @Schema(defaultValue = "购物车id")
   private Integer cartId;

   @Schema(defaultValue = "商品数量")
   private Integer goodsNumber;



   public CartGoodsVo(Integer goodsId, String goodsName, String goodsIntroduction, String picUrl, BigDecimal price,
                      BigDecimal promotionPrice, Integer soldNumber, Integer totalNumber, Integer cartId, Integer goodsNumber) {
      super(goodsId, goodsName, goodsIntroduction, picUrl, price, promotionPrice, soldNumber, totalNumber);
      this.cartId = cartId;
      this.goodsNumber = goodsNumber;
   }
}

