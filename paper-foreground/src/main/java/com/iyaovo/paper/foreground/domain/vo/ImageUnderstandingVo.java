/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: ImageUnderstandingVo
 * Author: 22932
 * Date: 2024/5/17 23:49:17
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.domain.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: ImageUnderstandingVo
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/17 23:49:17
 */
@Data
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "图像理解vo")
public class ImageUnderstandingVo {


   /**
    * 图片url
    */
   @Schema(description = "图片url的base64")
   private String picUrl;

   /**
    * Fuyu-8B返回的内容
    */
   @Schema(description = "Fuyu-8B返回的内容")
   private String content;
}

