<template xmlns:el-table="http://www.w3.org/1999/html">
<!-- 编写页面静态部分-->
  <div>
    <el-button type="primary" size="small" v-on:click="query">主要按钮</el-button>
    <router-link  :to="{path:'/cms/page/add/',query:{
    page:this.params.page,
    siteId:this.params.siteId
    }}"
    >
      <el-button type="success" size="small">新增</el-button>
    </router-link>

    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page" >
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)"
          >编辑</el-button>
          <el-button
            size="small"type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="this.params.size"
      v-on:current-change="changePage"
      :total="total" :current-page="this.params.page" style="float: right;">
    </el-pagination>
  </div>
</template>
<script>

  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        list:[],
        total:50,
        params:{
          page:1,//起始页码
          size:5//每页显示数
        }
      }
    },
    methods:{
      //分页查询
      changePage:function (page) {
        this.params.page=page;
          this.query()
      },
      //查询
      query:function () {
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((res)=>{
          console.log()
          this.total= res.queryResult.total
          this.list = res.queryResult.list

        })

      },
      //修改
      edit:function(pageId){
        this.$router.push({path: '/cms/page/edit/'+pageId,query:{
          page: this.params.page,
          siteId: this.params.siteId
          }})
      },
      //删除
      del:function(pageId){
        this.$confirm('您确认提交吗?', '提示', { }).then(() => {
          cmsApi.page_delete(pageId).then(res => {
            if (res.success){
              this.$message.success("删除成功");
              this.query();
            } else {
              this.$message.fail("删除失败")
              this.query();
            }
          })
        })

      },


      //dom元素加载完毕后开始查询
      /*mounted(){
        //当DOM元素渲染完成后调用query
        this.query()
        //初始化站点列表
        this.siteList = [
          {
            siteId:'5a751fab6abb5044e0d19ea1',
            siteName:'门户主站'
          },
          {
            siteId:'102',
            siteName:'测试站'
          }
        ]
      }*/

    },
    //实例生成开始获取参数
    created:function(){

      //从路由获取参数
      this.params.page=Number.parseInt(this.$route.query.page||1);
      this.params.siteId=this.$route.query.siteId||'';

    },
    mounted:function () {
      this.query()

    }

  }
</script>
<style>

</style>
