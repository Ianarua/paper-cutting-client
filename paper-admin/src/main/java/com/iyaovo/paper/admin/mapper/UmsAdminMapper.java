package com.iyaovo.paper.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.iyaovo.paper.admin.domain.entity.UmsAdmin;
import com.iyaovo.paper.admin.domain.entity.UmsAdminExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UmsAdminMapper extends BaseMapper<UmsAdmin> {
    long countByExample(UmsAdminExample example);

    int deleteByExample(UmsAdminExample example);

    int deleteByPrimaryKey(Long id);

    int insert(UmsAdmin record);

    int insertSelective(UmsAdmin record);

    List<UmsAdmin> selectByExample(UmsAdminExample example);

    UmsAdmin selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") UmsAdmin record, @Param("example") UmsAdminExample example);

    int updateByExample(@Param("record") UmsAdmin record, @Param("example") UmsAdminExample example);

    int updateByPrimaryKeySelective(UmsAdmin record);

    int updateByPrimaryKey(UmsAdmin record);
}