<template>
    <el-container class="home">
        <el-main>
            <div id="main_wrapper">
                <span>
                    <div id="main_left_wrapper">
                        <el-table class="el-table"
                                  ref="multipleTable"
                                  :data="insuinge_home_sample"
                                  :row-class-name="tableRowClassName"
                                  @selection-change="handleSelectionChange"
                                  select-on-indeterminate=false>
                            <!-- @row-click="$refs.multipleTable.toggleRowSelection(insuinge_home_sample[0])"-->
                            <el-table-column
                                    type="index"
                                    label="순위"
                                    width="50rem">
                                <!-- prop="ranking"-->
                            </el-table-column>
                            <el-table-column
                                    prop="importance"
                                    label="Importance"
                                    width="100rem"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="content"
                                    label="Content">
                                    <el-button type="text" slot-scope="scope" @click="$refs.multipleTable.toggleRowSelection(insuinge_home_sample[scope.$index]); ">{{scope.row.content}}</el-button> <!--select?-->
                            </el-table-column>
                            <el-table-column
                                    prop="writer"
                                    label="Writer">
                            </el-table-column>
                            <el-table-column
                                    prop="dday"
                                    label="D-day">

                            </el-table-column>
                            <el-table-column
                                    type="selection"
                                    width="55">
                            </el-table-column>
                        </el-table>
                    </div>
                </span>
                <span>
                    <div id="main_right_wrapper">
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
                                    <el-button style="float:left;" @click="next" size="mini">Next</el-button>
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
                </span>
                <div style="clear:both;"></div>
            </div>


        </el-main>
    </el-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

    @Component({
        components: {
            HelloWorld
        }
    })

    export default class Home extends Vue {
        //****************************************table data & method*********************************************
        private insuinge_home_sample:any[] = [{
            ranking:'1',
            importance:'상',
            content: '인수인계 내용1',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'2',
            importance:'상',
            content: '인수인계 내용2',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'True'
        }, {
            ranking:'3',
            importance:'상',
            content: '인수인계 내용3',
            writer: '대위홍길동',
            dday: '2016-05-03',
            check: 'True'
        }, {
            ranking:'5',
            importance:'중',
            content: '인수인계 내용4',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'6',
            importance:'중',
            content: '인수인계 내용',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'7',
            importance:'중',
            content: '인수인계 내용',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'8',
            importance:'중',
            content: '인수인계 내용',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'9',
            importance:'상',
            content: '인수인계 내용',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'10',
            importance:'하',
            content: '인수인계 내용',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }, {
            ranking:'11',
            importance:'하',
            content: '인수인계 내용',
            writer: '대위 홍길동',
            dday: '2016-05-03',
            check: 'false'
        }];

        private multipleSelection:any[] = [];


        //작동안함 : 테이블 1, 3행 색칠하기
        tableRowClassName( data:any): string {
            let className = "";
            let rowIndex = data.rowIndex;
            if (rowIndex === 1) {
                className="warning-row";
            } else if (rowIndex === 3) {
                className= "success-row";
            }

            console.log("@@ ", className);
            return className;
        };

        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        }

        //****************************************table data & method*********************************************-->



        //****************************************step data & method**********************************************-->
        private active:number = 0;
        next() {
            if (this.active++ > 2) this.active = 0;
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
        //****************************************step data & method**********************************************-->

    }



</script>

<style scoped>
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


    #main_wrapper{
        width:70%;
        padding-left:15%;
    }
    #main_left_wrapper{
        border-style:solid;
        float:left;
        width:45%;
        padding:10px
    }
    #main_right_wrapper{
        border-style:solid;
        float:right;
        width:45%;
        padding:10px
    }
    .el-table{
        border-style:dashed;
        border-width:2px;
    }


    .warning-row {
        background-color: oldlace !important;
    }

    .success-row {
        background-color: #f0f9eb !important;
    }
</style>