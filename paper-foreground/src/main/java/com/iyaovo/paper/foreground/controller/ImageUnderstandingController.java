/**
 * Copyright (C), 2000-2024, XXX有限公司
 * FileName: ImageUnderstandingController
 * Author: 22932
 * Date: 2024/5/17 23:56:08
 * Description:
 * <p>
 * History:
 * <author> 作者姓名
 * <time> 修改时间
 * <version> 版本号
 * <desc> 版本描述
 */
package com.iyaovo.paper.foreground.controller;

import cn.hutool.crypto.SecureUtil;
import cn.hutool.json.JSONArray;
import com.iyaovo.paper.common.api.CommonResult;
import com.iyaovo.paper.common.api.ResultCode;
import com.iyaovo.paper.common.constant.Constants;
import com.iyaovo.paper.common.util.ImageToBase64Util;
import com.iyaovo.paper.foreground.domain.vo.ImageUnderstandingVo;
import com.iyaovo.paper.foreground.service.ImageUnderstandingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;

import okhttp3.RequestBody;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

/**
 * @ClassName: ImageUnderstandingController
 * @Description: java类描述
 * @Author: 22932
 * @Date: 2024/5/17 23:56:08
 */
@RestController
@RequestMapping("/imageUnderstanding")
@Tag(name = "图片内容理解接口")
@Slf4j
@RequiredArgsConstructor
public class ImageUnderstandingController {



   @Value("${fuyu8b.client_id}")
   private String API_KEY ;

   @Value("${fuyu8b.client_secret}")
   private String SECRET_KEY ;

   @Value("${baiduTranslate.appId}")
   private String appId;

   @Value("${baiduTranslate.apiKey}")
   private String apiKey;

   private final ImageUnderstandingService imageUnderstandingService;

   private static final OkHttpClient HTTP_CLIENT = new OkHttpClient().newBuilder().build();


   @PostMapping("")
   @Operation(summary = "图片内容理解")
   public CommonResult<ImageUnderstandingVo>  imageUnderstanding(@RequestParam("picUrl") String picUrl) {
      //将图片保存到本地
      imageUnderstandingService.imageUnderstanding(picUrl);
      //通过fuyu8b大模型理解图片
      MediaType mediaType = MediaType.parse("application/json");
      String picUrlBase64 = ImageToBase64Util.convertFileToBase64(Constants.RESOURCE_PATH+picUrl);
      RequestBody body = RequestBody.create(mediaType, "{\"prompt\":\""+ Constants.PROMPT + "\",\"image\":\""+ picUrlBase64 +"\"}");
      Request request = null;
      String result = null;
      try {
         request = new Request.Builder()
                 .url("https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/image2text/fuyu_8b?access_token=" + getAccessToken())
                 .method("POST", body)
                 .addHeader("Content-Type", "application/json")
                 .build();
         Response response = HTTP_CLIENT.newCall(request).execute();
         JSONObject jsonObject = new JSONObject(response.body().string());
         result = jsonObject.getString("result");
      } catch (IOException e) {
         return CommonResult.failed(ResultCode.FAILED,e.getMessage());
      } catch (JSONException e) {
         return CommonResult.failed(ResultCode.FAILED,e.getMessage());
      }

      return CommonResult.success(new ImageUnderstandingVo(picUrlBase64,translate(result)));
   }

   /**
    * 从用户的AK，SK生成鉴权签名（Access Token）
    *
    * @return 鉴权签名（Access Token）
    * @throws IOException IO异常
    */
    private String getAccessToken() throws IOException, JSONException {
      MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
      RequestBody body = RequestBody.create(mediaType, "grant_type=client_credentials&client_id=" + API_KEY
              + "&client_secret=" + SECRET_KEY);
      Request request = new Request.Builder()
              .url("https://aip.baidubce.com/oauth/2.0/token")
              .method("POST", body)
              .addHeader("Content-Type", "application/x-www-form-urlencoded")
              .build();
      Response response = HTTP_CLIENT.newCall(request).execute();
      return new JSONObject(response.body().string()).getString("access_token");
   }

   /**
    * 将fuyu8b给出的结果翻译为中文
    * @param word
    * @return
    */
   private  String translate(String word){
      try {
         String sourceText = word;
         String encodedText = URLEncoder.encode(sourceText, "UTF-8");

         String url = "http://api.fanyi.baidu.com/api/trans/vip/translate?q="+encodedText+"&from=en&to=zh&appid=" + appId + "&salt=1435660288&sign=" + SecureUtil.md5(appId + sourceText + "1435660288" + apiKey);

         URL obj = new URL(url);
         HttpURLConnection con = (HttpURLConnection) obj.openConnection();
         con.setRequestProperty("User-Agent", "Mozilla/5.0");

         BufferedReader in = new BufferedReader(
                 new InputStreamReader(con.getInputStream()));
         String inputLine;
         StringBuilder response = new StringBuilder();

         while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
         }
         in.close();
         return parseResult(response.toString());
      }catch (Exception e){
         return  word;
      }
   }

   private static String parseResult(String inputJson){
      // 将JSON字符串转换为JSONObject
      cn.hutool.json.JSONObject jsonObject = new cn.hutool.json.JSONObject(inputJson);
      // 从JSONObject中获取trans_result JSONArray
      JSONArray transResultArray = jsonObject.getJSONArray("trans_result");
      // 假设我们只关心第一个翻译结果
      cn.hutool.json.JSONObject firstTranslation = transResultArray.getJSONObject(0);
      // 从JSONObject中获取dst字段的值
      return firstTranslation.getStr("dst");
   }
}

