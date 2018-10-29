<template>


    <el-container id="app">
        <div id="header-logo-user">
            <span id="logo" style="float:left;">
                <h1><router-link to="/home" @click="default_nav" style="text-decoration: none; color:black">D A M O A</router-link></h1>
                <div id="logo_explanation"></div>
                Digital All-day Monitoring Operation Assistant
            </span>
            <div class="user-info">
                <span>
                    <router-link to="/home">대위 홍길동</router-link>
                    <br><router-link to="/insuinge">5</router-link>건
                    <br><router-link to="/jangyae">2</router-link>건
                </span>
            </div>
            <div class="user-info">
                <span>
                    사용자
                    <br>미확인 인수인계
                    <br>등록된 장애현황
                </span>
            </div>
            <div style="clear:both;"></div>
        </div>
        <el-header class="header">

            <div id="nav">
                <el-menu :default-active="activePage" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="insuinge">인수인계</el-menu-item>
                    <el-menu-item index="jangyae">장애현황</el-menu-item>
                    <!--
                    <el-menu-item index="manual">메뉴얼</el-menu-item>
                    <el-menu-item index="usersetting">사용자 설정</el-menu-item>
                    -->
                </el-menu>
            </div>
        </el-header>
        <router-view/>


    </el-container>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    @Component({})
    export default class Home extends Vue {
        public activePage: string = "home";

        handleSelect(key: string, keyPath: string) {
            this.$router.replace("/" + key);
        };

        default_nav(){
            this.filterValue='undefined';
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
    #header-logo-user{
        font-color:white !important;
        padding: 10px;
        margin-bottom:2;
        background-color: white;
    }
    #logo h1{
        font-size:3rem;
        font-color: white;
        text-decoration-color: white;
        margin-top:0;
        margin-bottom:1;
        text-decoration: none;
    }
    #logo_explanation{
        color: white;
        margin-top:2px;
    }

    .el-header, .el-footer {
        background-color: #636363;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
    }

    .el-main {
        color: #333;
        text-align: center;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .user-info {
        float:right;
        padding-right:30px;
    }
</style>
