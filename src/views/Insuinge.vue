<template>
    <el-container id="whole_wrap">
        <el-main>
            <!-- search part와 table part간의 크기 조정 앎맞게 필요 -->
            <div id="search_part" style="margin-bottom: 20px">
                <el-select v-model="value4" clearable placeholder="조건" style="width: 12%; margin-right: 10px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">

                    </el-option>
                </el-select>

                <el-input
                        v-model="input10"
                        clearable
                        style="width: 50%">

                </el-input>

                <el-button type="primary" icon="el-icon-search" style="width: 10%; margin-left: 10px">검색</el-button>

                <el-button type="info" @click="dialogVisible = true">등록</el-button>

                <el-dialog
                        title="인수인계 사항"
                        :visible.sync="dialogVisible"
                        width="40%"
                        :before-close="handleClose">
                    <el-form :rules="rules" ref="form" :model="form" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="제목" style="width:60%">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="내용" style="width:80%">
                            <el-input type="textarea" v-model="form.text"></el-input>
                        </el-form-item>
                        <el-form-item label="등록일자">
                            <el-col :span="8">
                                <el-date-picker disabled="false" v-model="today" type="text" style="width: 100%;">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="만료일자">
                            <el-col :span="8">
                                <el-date-picker type="date" placeholder="1990-01-01" v-model="form.date" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="중요도">
                            <el-select v-model="form.region" placeholder="중요도"  style="float:left; width:40%">
                                <el-option label="상" value="상"></el-option>
                                <el-option label="중" value="중"></el-option>
                                <el-option label="하" value="하"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-for="(domain, index) in newAutocomplete"
                                      :key="domain.key"
                                      :prop="'domains.' + index + '.value'">

                            <el-autocomplete
                                    v-model="toWhom"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="Please input"
                                    @select="handleSelect"
                                    style="float:left; width:40%">

                            </el-autocomplete>

                                <el-button @click.prevent="removeDomain(domain)">삭제</el-button>
                                <el-button type="primary" @click="addDomain">추가</el-button>

                        </el-form-item>




                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">취소</el-button>
                    <el-button type="primary" @click="dialogVisible = false">등록</el-button>
                    </span>
                </el-dialog>


            </div>

            <div id="table_part"> <!-- 파일을 병합할 경우 footer 부분 생각해서 height 퍼센트 설정-->
                <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        height="100%"
                        style="position: center; margin-bottom: 150px; width: 100%"
                        border="1px"
                        @selection-change="handleSelectionChange">

                    <el-table-column

                            type="index"
                            label="No."
                            width="50"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="importance"
                            label="중요도"
                            width="70"
                            align="center">
                    </el-table-column>


                     <el-table-column
                            prop="title"
                            label="제목"
                            width="282">

                         <template slot-scope="scope">
                         <el-button @click="$refs.multipleTable.toggleRowSelection(tableData3[scope.$index])" type="text">{{ scope.row.title }}</el-button>
                         </template>

                    </el-table-column>

                    <el-table-column
                            prop="upload_date"
                            label="등록날짜"
                            width="150"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="due_date"
                            label="만료날짜"
                            width="150"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="작성자"
                            width="120"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            type="selection"
                            label="확인여부"
                            width="70"
                            align="center">

                    </el-table-column>



                </el-table>
            </div>

            <div id="pagination_part">

            <el-button type="primary" plain style="float: left">이전이력</el-button>

            <el-pagination
                    layout="prev, pager, next"
                    :total="100"
                    style="float: left; margin: 0 10px">

            </el-pagination>

            <el-button type="primary" plain style="float: right">현재이력</el-button>

            </div>

            <div style="clear: both"></div>


        </el-main>
    </el-container>

</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

    @Component({
        components: {
            HelloWorld
        }
    })
    export default class Home extends Vue {

        today = new Date();
        dd = this.today.getDate();
        mm = this.today.getMonth()+1; //January is 0!
        yyyy = this.today.getFullYear();

        today : any  = '';
        public mounted() {

            this.today = this.yyyy +"-"+this.mm+"-"+this.dd;
        };

        private input10: string = "";


        private options: any[] = [{
            value: '중요도',
            label: '중요도'
        }, {
            value: '제목',
            label: '제목'
        }, {
            value: '등록날짜',
            label: '등록날짜'
        }, {
            value: '만료날짜',
            label: '만료날짜'
        },{
            value: '작성자',
            label: '작성자'
        }];

        private  dialogVisible: boolean = false;

        private form: any[] = [{
            name: '',
            text: '',
            date: '',
            region: '',
        }];

        private newAutocomplete: any [] = [{
            newAutocomplete: {
            domains: [{



                key: 1,
                value: ''
            }],
            email: ''
            }
         }];


        private toWhom : any[] = [{
        links: [],
        toWhom: '',
        timeout:  null
        }];

        loadAll() {
            return [
                { "value": "소령 김병팔", "link": "https://github.com/vuejs/vue" },
                { "value": "소령(진) 원민혁", "link": "https://github.com/ElemeFE/element" },
                { "value": "대위 이호석", "link": "https://github.com/ElemeFE/cooking" },
                { "value": "대위 손병간", "link": "https://github.com/ElemeFE/mint-ui" },
                { "value": "중사 박진호", "link": "https://github.com/vuejs/vuex" },
                { "value": "중사 정도영", "link": "https://github.com/vuejs/vue-router" },
                { "value": "하사 안민호", "link": "https://github.com/babel/babel" }
            ];
        };

        querySearchAsync(queryString, cb) {
            var links = this.links;
            var results = queryString ? links.filter(this.createFilter(queryString)) : links;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        };

        createFilter(queryString) {
            return (link) => {
                return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        };

        handleSelect(item) {

        };

        mounted() {
            this.links = this.loadAll();
        };

        removeDomain(item) {
            var index = this.newAutocomplete.indexOf(item);
            if (index !== 0) {
                this.newAutocomplete.splice(index, 1);
            }
        };

        addDomain() {
            this.newAutocomplete.push({
                key: Date.now(),
                value: ''
            })
        };

        handleClose(done) {
            this.$confirm('닫으시면 저장되지 않습니다. 닫으시겠습니까?', '경고', {
                confirmButtonText: '예',
                cancelButtonText: '아니요',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '저장되지 않았습니다.'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '닫기를 취소하였습니다.'
                });
            });
        }

        private tableData3: any[] = [{
            importance: '중',
            title: '금일 당직근무 인수인계 상황입니다.',
            upload_date: '2018-10-26',
            due_date: '2018-10-26',
            name: '소령(진) 원민혁',
        }, {
            importance: '상',
            title: '다음주 FTX 훈련관련 전파사항입니다.',
            upload_date: '2018-10-26',
            due_date: '2018-11-02',
            name: '소령 김병팔',
        }, {
            importance: '하',
            title: '18-4호 지휘관 서신입니다.',
            upload_date: '2018-10-26',
            due_date: '2018-10-29',
            name: '대위 손병간',
        }, {
            importance: '중',
            title: '사격훈련간 통제관 전파사항입니다.',
            upload_date: '2018-10-25',
            due_date: '2018-10-31',
            name: '중사 박진호',
        }, {
            importance: '상',
            title: 'Black & White 상황입니다.',
            upload_date: '2018-10-10',
            due_date: '2018-10-10',
            name: '대위 이호석',
        }, {
            importance: '하',
            title: '서버장애 해결훈련 상황입니다.',
            upload_date: '2018-10-02',
            due_date: '2018-10-12',
            name: '중사 정도영',
        }, {
            importance: '중',
            title: '연락체계 수정사항입니다.',
            upload_date: '2018-09-30',
            due_date: '2018-09-30',
            name: '하사 안민호',
        }];

        private multipleSelection: any [] = [];

         handleSelectionChange(val) {
            this.multipleSelection = val;
         };

        private value4: string = '';
    }


</script>

<style scoped>

    #whole_wrap{
        width:980px;
        margin:0 auto;
    }

    #table_part{
        width: 95%;
        margin:0 auto;
    }

    #pagination_part{
        display: inline-block;
    }

</style>