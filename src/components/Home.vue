<template>
	<div id="app">
    <el-container class="home-container">

    	<!-- 头部区域 -->
        <el-header>
        	<div>
        		<span>电商后台管理系统</span>
        	</div>
        	<el-button type="info" @click='logout'>退出</el-button>
        </el-header>

      <!-- 页面主体区 -->
    <el-container>
      	<!-- 侧边栏 -->
        <el-aside :width="isCollapse?'64px':'200px'">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <el-menu background-color="#333744" text-color="#fff" active-text-color="#409efe" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
        	<!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id" >
      	    <!-- 一级菜单模板区 -->
            <template slot="title">
        	    <!-- 图标 -->
                <i :class="iconsobj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
        	<template slot="title">
        	    <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
            </template>
            </el-menu-item>
            </el-submenu>
        </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
        <!-- 路由占位符 -->
        <router-view>
        </router-view>
        </el-main>
      </el-container>

    </el-container>
    </div>
</template>

<script>
	export default {
		data(){
			return {
				menulist:[],
				iconsobj:{
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao'
				},
				//是否折叠
				isCollapse:false,
				//被激活的链接地址
				activePath:'',
			}
		},
		created() {
			this.getMenuList()
			this.activePath = window.sessionStorage.getItem('activePath')
		},
		methods:{
			logout(){
				window.sessionStorage.clear();
				this.$router.push('/login')
			},
		    async getMenuList(){
		    	const { data: res } = await this.$http.get('menus')
		    	if (res.meta.status !== 200) {return this.$message.error(res.meta.msg)}
		    	this.menulist = res.data
		    	// console.log(this.menulist)
		    },
		    //点击切换菜单折叠与展开
		    toggleCollapse(){
		    	this.isCollapse = !this.isCollapse;
		    },
		    //保存链接的激活状态
		    saveNavState(activePath,activeId){
		    	window.sessionStorage.setItem('activePath', activePath)
		    	this.activePath = activePath
		    }
		}
	};
</script>

<style lang="less" scoped>	
.home-container{
	height: 100%;
}
.el-header{
	background-color: #373d41;
	display: flex;
	justify-content: space-between;
	padding-left: 0;
	align-items: center;
	color: #fff;
	font-size: 20px;
	> div {
		display: flex;
		align-items: center;
		span{
			margin-left: 15px;
		}
	}
}
.el-aside{
	background-color: #333744;
	/*height: 100%;*/
}
.el-main{
	background-color: #eaedf1;
}
.iconfont{
	margin-right: 10px;
}
.el-menu{
	border-right: none;
}
.toggle-button{
	background-color: #4a5064;
	color:#fff;
	font-size: 10px;
	text-align: center;
	letter-spacing: 0.2em;
	cursor: pointer;
	width: 100%;
}
</style>