/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: LoginVo
 * Author: 22932
 * Date: 2024/5/19 13:38:51
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
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * @ClassName: LoginVo
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/19 13:38:51
 */
@Data
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "token")
public class LoginTokenVo {

    private String token;
    private String refreshToken;
}

