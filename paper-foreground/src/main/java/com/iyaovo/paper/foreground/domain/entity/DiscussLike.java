/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: DiscussLike
 * Author: 22932
 * Date: 2024/5/15 16:46:23
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: DiscussLike
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/15 16:46:23
 */
@Schema(description = "商品类别")
@Slf4j
@Data
@AllArgsConstructor
@TableName("discuss_like")
public class DiscussLike {

   /**
    * 喜欢id
    */
   @TableId(value = "like_id",type = IdType.AUTO)
   private Integer likeId;

   /**
    * 讨论id
    */
   @TableField("discuss_id")
   private Integer discussId;

   /**
    * 用户id
    */
   @TableField("buyer_id")
   private Long buyerId;

}

