/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: ImageUnderstandingService
 * Author: 22932
 * Date: 2024/5/17 23:51:53
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.iyaovo.paper.foreground.domain.entity.ImageUnderstanding;
import com.iyaovo.paper.foreground.domain.vo.ImageUnderstandingVo;

/**
 * @ClassName: ImageUnderstandingService
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/17 23:51:53
 */
public interface ImageUnderstandingService extends IService<ImageUnderstanding> {

    ImageUnderstandingVo imageUnderstanding(String picUrl);
}

