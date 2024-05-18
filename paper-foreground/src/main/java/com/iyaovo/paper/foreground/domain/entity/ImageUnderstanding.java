/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: ImageUnderstanding
 * Author: 22932
 * Date: 2024/5/17 23:47:10
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
import com.iyaovo.paper.common.domain.BaseEntity;
import com.iyaovo.paper.common.domain.OrderStatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: ImageUnderstanding
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/17 23:47:10
 */
@Schema(description = "订单类")
@Slf4j
@Data
@AllArgsConstructor
@TableName("image_understanding")
public class ImageUnderstanding {
   /**
    * 图片id
    */
   @TableId(value = "image_id",type = IdType.ASSIGN_ID)
   private Long imageId;

   /**
    * 图片url
    */
   @TableField("pic_url")
   private String picUrl;
}


