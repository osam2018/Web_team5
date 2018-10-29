<template>
    <el-container>
        <el-main>
            <div id="main_box">


                <el-button @click="dialogVisible = true">새 장애현황 등록</el-button>
                <el-dialog
                        title="Tips"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                    <div style="margin-bottom:20px;">
                        새로운 장애현황을 등록하시겠습니까?
                    </div>
                    <el-button @click="dialogVisible = false">취소</el-button>
                    <el-button type="primary" @click="onSubmit();  dialogVisible = false;">등록</el-button>
                </el-dialog>


                <div class="step_box">
                    <el-steps :active="active" finish-status="finish" align-center=true>
                        <el-step title="Step 1"></el-step>
                        <el-step title="Step 2"></el-step>
                        <el-step title="Step 3"></el-step>
                    </el-steps>
                    <div id="step_contentbox">
                        <div id="step_contentbox_titlebox" >
                            <div id="step_contentbox_title">
                                {{step_text[active].title}}
                            </div>
                            <div>
                                <el-button style="float:left;" @click="next()" size="mini">Next</el-button>
                            </div>
                            <div style="clear:both;"></div>
                        </div>

                        <div id="step_contentbox_content">
                            {{step_text[active].text}}
                        </div>
                        <div id="step_contentbox_commentbox">
                            <table id="step_contentbox_commentline">
                                <tr v-for="commentline in step_text[active].comment">
                                    <td class="step_contentbox_commentline_content">{{commentline.content}}</td><td class="step_contentbox_commentline_name">{{commentline.name}}</td><td class="step_contentbox_commentline_enrolledDate">{{commentline.enrolledDate}}</td>
                                </tr>
                                <tr v-if="!step_text[active].comment" >
                                    <td>No comments!</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="step_box">
                    <el-steps :active="active2" finish-status="finish" align-center=true>
                        <el-step title="Step 1"></el-step>
                        <el-step title="Step 2"></el-step>
                        <el-step title="Step 3"></el-step>
                    </el-steps>
                    <div id="step_contentbox">
                        <div id="step_contentbox_titlebox" >
                            <div id="step_contentbox_title">
                                {{step_text2[active2].title}}
                            </div>
                            <div>
                                <el-button style=":floatleft;" @click="next2()" size="mini">Next</el-button>
                            </div>
                            <div style="clear:both;"></div>
                        </div>

                        <div id="step_contentbox_content">
                            {{step_text2[active2].text}}
                        </div>
                        <div id="step_contentbox_commentbox">
                            <table id="step_contentbox_commentline">
                                <tr v-for="commentline in step_text2[active2].comment">
                                    <td class="step_contentbox_commentline_content">{{commentline.content}}</td><td class="step_contentbox_commentline_name">{{commentline.name}}</td><td class="step_contentbox_commentline_enrolledDate">{{commentline.enrolledDate}}</td>
                                </tr>
                                <tr v-if="!step_text2[active2].comment" >
                                    <td>No comments!</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </el-main>
    </el-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import SideMenu from './side-page-sub/SideMenu.vue';
    import SidePage1 from './side-page-sub/SidePage1.vue';
    import SidePage2 from './side-page-sub/SidePage2.vue';
    import SidePage3 from './side-page-sub/SidePage3.vue';
    import SidePage4 from './side-page-sub/SidePage4.vue';

    @Component({
        components: {
            SideMenu,
            SidePage1,
            SidePage2,
            SidePage3,
            SidePage4
        }
    })
    export default class SidePage extends Vue {
        public activePage:string ="SidePage1";

        handleOpen(key:string, keyPath:string) {
            console.log("open ", key, keyPath);
        }

        handleClose(key:string, keyPath:string) {
            console.log("close", key, keyPath);
        }

        handleSelect(key:string, keyPath:string){
            console.log("select", key, keyPath);
            this.$router.replace("/sidepage/"+key);
        }

        //*************************장애현황 단계 data 및 method********************
        private active:number = 0;
        private active2:number = 0;

        async mounted(){
            let result  = await this.$http.get("../mockup_data/jangyae.json");
            console.log(result.data.step_text2);
            this.step_text2 = result.data.step_text2;
        };


        next() {
            if (this.active++ > 2) this.active = 0;
        };
        next2() {
            if (this.active2++ > 2) this.active2 = 0;
        };

        private step_text: any[] = [
            {
                step: 1,
                title: 'step1-title',
                text: '1단계에서 할일',
            }, {
                step: 2,
                title: 'step2-title',
                text: '2단계에서 할일',
            }, {
                step: 3,
                title: 'step3-title',
                text: '3단계에서 할일',
                comment: [{
                    name: "대위 홍길동",
                    enrolledDate: '18-10-11',
                    content: '이렇게 합시다',
                },{
                    name: "소위 ㅁㅁㅁ",
                    enrolledDate: '18-10-12',
                    content: '거의다 끝나감',
                },]
            },{
                step: 4,
                title: 'exit-title',
                text: '끝!!!!',
                comment: [{
                    name: "대위 홍길동",
                    enrolledDate: '18-10-11',
                    content: '이렇게 합시다',
                },{
                    name: "소위 ㅁㅁㅁ",
                    enrolledDate: '18-10-12',
                    content: '거의다 끝나감',
                },]
            },] ;
        private step_text2: any[] = [];

        private step_text2: any[] = [
            {
                step: 1,
                title: '공군자료교환체계 서버 다운',
                text: '공군 체계 담당자 연락 : ㅁㅁㅁ 000-0000-0000',
            }, {
                step: 2,
                title: '담당자 인스턴스 재기동',
                text: 'o11,o21 재기동',
            }, {
                step: 3,
                title: '덤프 확인',
                text: '3단계에서 할일',
                comment: [{
                    name: "상사 ㅇㅇㅇ",
                    enrolledDate: '18-10-11',
                    content: '완료까지 5분전',
                },{
                    name: "하사 김박이",
                    enrolledDate: '18-10-11',
                    content: '확인',
                },]
            },{
                step: 4,
                title: '상황종료',
                text: '재기동 완료 및 로그분석 완료',
                comment: [{
                    name: "대위 홍길동",
                    enrolledDate: '18-10-11',
                    content: '수고하셨습니다.',
                },]
            },] ;

        //***********************************form 제출 data & method***********************

        private dialogVisible:boolean= false;

        handleClose(done) {
            this.$confirm('작성을 취소하시겠습니까?')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        };

        private form = {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        };

        onSubmit() {
            console.log('submit!');
        };


    }
</script>

<style scoped>
    .el-main{
        width:70%;
        padding-left:15%;
    }
    #main_box{
        text-align:center;
        width:80%;
    }
    #enroll_button{
    }

    .step_box{
        text-align:center;
        width:60%;
        margin-left:20%;
        margin-top:30px;
        max-width:60%;
        min-width:60%;
        border-style:solid;
        border-width:4px;
        padding:5px;

    }
    #step_contentbox{
        border-style:solid;
        border-width:2px;
        margin:3px;
        text-align:left;
    }
    #step_contentbox_titlebox{

    }
    #step_contentbox_commentbox{
        border-style:dashed;
        border-width:1px;
        margin:5px;
    }
    #step_contentbox_title{
        border-style:dashed;
        border-width:1px;
        width:80%;
        margin:5px;
        float:left;
    }
    #step_contentbox_content{
        border-style:dashed;
        border-width:1px;
        margin:5px;
    }
    #step_contentbox_commentline{
        font-size:1rem;
    }
    .step_contentbox_commentline_name{
        width:20%;
    }
    .step_contentbox_commentline_content{
        width:60%;
    }
    .step_contentbox_commentline_enrolledDate{
        width:20%;
    }

</style>