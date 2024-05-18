/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: ImageUnderstandingServiceImpl
 * Author: 22932
 * Date: 2024/5/17 23:52:27
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.iyaovo.paper.foreground.domain.entity.ImageUnderstanding;
import com.iyaovo.paper.foreground.domain.vo.ImageUnderstandingVo;
import com.iyaovo.paper.foreground.mapper.ImageUnderstandingMapper;
import com.iyaovo.paper.foreground.service.ImageUnderstandingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @ClassName: ImageUnderstandingServiceImpl
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/17 23:52:27
 */
@Service
@RequiredArgsConstructor
public class ImageUnderstandingServiceImpl extends ServiceImpl<ImageUnderstandingMapper, ImageUnderstanding> implements ImageUnderstandingService {

   private final ImageUnderstandingMapper imageUnderstandingMapper;

   @Override
   public ImageUnderstandingVo imageUnderstanding(String picUrl) {
      //图片存储到本地
      imageUnderstandingMapper.insert(new ImageUnderstanding(null,picUrl));
      return null;
   }
}

