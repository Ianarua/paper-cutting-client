/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: DailySign
 * Author: 22932
 * Date: 2024/4/12 17:46:29
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

import java.time.LocalDateTime;

/**
 * @ClassName: DailySign
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/4/12 17:46:29
 */
@Schema(description = "日常签到")
@Slf4j
@Data
@AllArgsConstructor
@TableName("daily_sign")
public class DailySign {

   /**
    * 每日签到id
    */
   @TableId(value = "daily_sign_id",type = IdType.AUTO)
   private Integer dailySignId;

   /**
    * 用户id
    */
   @TableField("buyer_id")
   private Long buyerId;

   /**
    * 签到时间
    */
   @TableField("sign_time")
   private String signTime;
}

