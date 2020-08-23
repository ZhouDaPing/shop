<template>
    <!-- 登录页 -->
    <div class="login_container">
        <div class="login_box">
            <div class="login_img">
                <img src="../assets/logo.png">
            </div>
            <el-form :model="loginForm" :rules="loginRules" ref="ruleFormRef" class="login_form" label-width="">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
                </el-form-item>
                <el-form-item class="loginBtn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="resetForm" type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'
            },
            loginRules:{
                username:[
                    { required: true,message:'请输入用户名',trigger:'blur'},
                    { min:3,max:5,message:'长度在3到5个字符之间',trigger:'blur'}
                ],
                password:[
                    { required: true,message:'请输入密码',trigger:'blur'},
                    { min:6,max:12,message:'长度在6到12个字符之间',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        // 登录方法
        login:function(){
            this.$refs.ruleFormRef.validate(async valid =>{
                if(!valid){
                   return this.$message.error('用户名或密码错误')
                }
                const {data:res}= await this.$http.post('login',this.loginForm)
                if(res.meta.status !== 200) return this.$message.error('登录失败')
                window.sessionStorage.setItem('token', res.data.token)
                this.$message.success(res.meta.msg)
                // console.log(window.sessionStorage.getItem('token'))
                this.$router.push('/home')
            })
        },
        resetForm:function(){
            //情空表单验证错误信息
            this.$refs.ruleFormRef.resetFields();
        }
    }
}
</script>

<style lang="less" scope>

.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    position: absolute;
    background-color: #fff;
    border-radius: 3px;
    width: 450px;
    height: 300px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .login_img{
        width: 130px;
        height: 130px;
        // background-color: red;
        border: 1px solid #ddd;
        border-radius: 50%;
        padding: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        box-shadow: 0 0 10px #ddd;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.loginBtn{
    float: right
}
</style>