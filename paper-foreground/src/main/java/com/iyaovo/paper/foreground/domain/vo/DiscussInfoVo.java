/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: DiscussInfoVo
 * Author: 22932
 * Date: 2024/5/7 14:37:23
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

import java.util.List;

/**
 * @ClassName: DiscussInfoVo
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/7 14:37:23
 */
@Schema(description = "广场讨论vo")
@Slf4j
@Data
@AllArgsConstructor
public class DiscussInfoVo {

   /**
    * 评论id
    */
   @Schema(defaultValue = "评论id")
   private Integer discussId;

   /**
    * 评论内容
    */
   @Schema(defaultValue = "评论内容")
   private String discussContent;

   /**
    * 点赞数
    */
   @Schema(defaultValue = "点赞数")
   private Integer favoriteNumber;

   /**
    * 点赞数
    */
   @Schema(defaultValue = "评论数")
   private Integer commentNumber;

   /**
    * 评论人头像
    */
   @Schema(defaultValue = "评论人头像base64")
   private String picUrl;

   /**
    * 评论人昵称
    */
   @Schema(defaultValue = "评论人昵称")
   private String name;

   /**
    * 该用户是否点赞该讨论
    */
   @Schema(defaultValue = "该用户是否点赞该讨论")
   private Boolean isLike;

   /**
    * 子评论
    */
   @Schema(defaultValue = "子评论list")
   private List<DiscussCommentVo> discussCommentVos;

   public DiscussInfoVo(Integer discussId, String discussContent, Integer favoriteNumber, Integer commentNumber, String picUrl, String name) {
      this.discussId = discussId;
      this.discussContent = discussContent;
      this.favoriteNumber = favoriteNumber;
      this.commentNumber = commentNumber;
      this.picUrl = picUrl;
      this.name = name;
   }
}

