var textdata = [];

import seachTable from '@/utils/seachTable.js'
import { Http } from '../server/index.js'

export default {
	state: {
		newsMs:{
			newsdata:seachTable,
			columns:[],
			columnsdata:seachTable,
			details:{
				detail:{
					columns_name:"",
					contents:"",
					published_person:"",
					published_time:"",
					reading_times:"",
					pictures:"",
					id:"",
					picture:"",
					title:""
				}
			}
		}
	},
	actions: {
		initNewsList({commit,state}, items){
			var dataFormat = {
				searchGroup: {
					rowNum: 3,
					labelWidth: '100px', // 总体的labelWidth 可以单独为每一项设置
				 	searchBtnHidden: false, // 可选值 
					clearBtnHidden: false, // 可选值 是否显示按钮
					items: [
					{key: 'columnId', name: '栏目名称', type: 'select',options: state.newsMs.columns},
					{key: 'datePicked', name: '时间', type: 'dataPick',dataPickType:'datetimerange'}],
					actions: []
				},
				tableGroup: {
					tHeadData: [
						{prop: "title",name: '标题'}, 
						{prop: "column",name: '栏目'}, 
						{prop: "publishedTime",name: '发布时间'}, 
						{prop: "publishedPerson",name: '发布人'},
						{prop: "readingTimes",name: '阅读次数'} 
					],
					tData:[],
					Opration: {
						width: '200',
						actions: [{
								key: 'details', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
								name: '详情', // 操作按钮名字
								size: 'small', // 可选 用于按钮大小
								type: 'text', // 可选 按钮类型
						}]
					}
				},
				loading: true
			};
			if(items.isEdit == '1'){
				dataFormat.searchGroup.actions.push({
					key: 'columndetail', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
					name: '查看栏目',  // 操作按钮名字
					//size: 'small', // 可选 用于按钮大小
					type: 'primary',  // 可选 按钮类型
				},{
					key: 'newNews', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
					name: '新增资讯',  // 操作按钮名字
					//size: 'small', // 可选 用于按钮大小
					type: 'primary',  // 可选 按钮类型
				});
				dataFormat.tableGroup.Opration.actions.push({
						key: 'edit', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
						name: '编辑', // 操作按钮名字
						size: 'small', // 可选 用于按钮大小
						type: 'text', // 可选 按钮类型
				},{
						key: 'delete', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
						name: '删除', // 操作按钮名字
						size: 'small', // 可选 用于按钮大小
						type: 'text', // 可选 按钮类型
				})
			}
			dataFormat.pagination = {
				total: 0,  
				currentPage: 1,  
				pageSize: 10
			}
			
			  
			commit('getNewsListSuccess', dataFormat);
		},
		//资讯列表
		getNewsList({commit,state}, items) {

            var dataFormat = {
				searchGroup: {
					rowNum: 3,
					labelWidth: '100px', // 总体的labelWidth 可以单独为每一项设置
				 	searchBtnHidden: false, // 可选值 
					clearBtnHidden: false, // 可选值 是否显示按钮
					items: [
					{key: 'columnId', name: '栏目名称', type: 'select',options: state.newsMs.columns},
					{key: 'datePicked', name: '时间', type: 'dataPick',dataPickType:'daterange'}],
					actions: []
				},
				tableGroup: {
					tHeadData: [
						{prop: "title",name: '标题'}, 
						{prop: "column",name: '栏目'}, 
						{prop: "publishedTime",name: '发布时间'}, 
						{prop: "publishedPerson",name: '发布人'},
						{prop: "readingTimes",name: '阅读次数'} 
					],
					tData:[],
					Opration: {
						width: '200',
						actions: [{
								key: 'details', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
								name: '详情', // 操作按钮名字
								size: 'small', // 可选 用于按钮大小
								type: 'text', // 可选 按钮类型
						}]
					}
				},
				loading: true
			};
			if(items.isEdit == '1'){
				dataFormat.searchGroup.actions.push({
					key: 'columndetail', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
					name: '查看栏目',  // 操作按钮名字
					//size: 'small', // 可选 用于按钮大小
					type: 'primary',  // 可选 按钮类型
				},{
					key: 'newNews', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
					name: '新增资讯',  // 操作按钮名字
					//size: 'small', // 可选 用于按钮大小
					type: 'primary',  // 可选 按钮类型
				});
				dataFormat.tableGroup.Opration.actions.push({
						key: 'edit', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
						name: '编辑', // 操作按钮名字
						size: 'small', // 可选 用于按钮大小
						type: 'text', // 可选 按钮类型
				},{
						key: 'delete', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
						name: '删除', // 操作按钮名字
						size: 'small', // 可选 用于按钮大小
						type: 'text', // 可选 按钮类型
				})
			}
            dataFormat.pagination = {
				total: 0,  
				currentPage: 1,  
				pageSize: 10
			}
			let columnName = state.newsMs.columns.filter(item=>{ 
				return item.value == items.columnId && items.columnId != undefined
			});
			let params1 = {
				param:{
					column: columnName.length == 0 ? "" : columnName[0].label,
					pageno: items.currentPage == undefined ? dataFormat.pagination.currentPage : items.currentPage,
					pagesize: items.pageSize == undefined ? dataFormat.pagination.pageSize : items.pageSize,
					publishstart: items.datePicked == undefined ? "" : items.datePicked[0],
					publishend: items.datePicked == undefined ? "" : items.datePicked[1] ,
				}
			}
			Http({url: '/web/information/getColumn',data:params1})
			.then((res) => {
				if (res.code === 1) {
					let pageData = res.data.data.pageData;
					let list =  res.data.data.list;
					list.map(item=>{
						if(item.readingTimes == ""){
							item.readingTimes = 0;
						}
					})
					dataFormat.tableGroup.tData = list;
					dataFormat.pagination = {
						total: pageData.totalCount,  
						currentPage: pageData.pageNo,  
						pageSize: pageData.pageSize
					}
					dataFormat.loading = false;
					commit('getNewsListSuccess', dataFormat);
				}
			})
			.catch(function (error) {
			  console.log(error);
			});
		},

		getAllColumns({ commit, state }, items){
			let params = {
				param:{}
			};
			return new Promise((resolve, reject) => {
			  Http({url: '/web/information/getAllColumn',data:params})
			  .then((res) => {
			     if(res.code === 1){
					console.log(res)
					let dataArr = [];
			     	let searchData = res.data.data;
			     	
			     	searchData.map(item=>{
			     		dataArr.push({
			     			"value":item.id,
			     			"label":item.columns_name
			     		})
			     	});
			     	commit('getALlColumnSuccess', dataArr);
					resolve()
			    }
			  
			 })
			.catch(function (error) {
			    console.log(error);
			  });
			})
		},
		initColumnList({ commit, state }, items){
			var dataFormat = {
				searchGroup: {
					rowNum: 3,
					labelWidth: '100px', // 总体的labelWidth 可以单独为每一项设置
				 	searchBtnHidden: true, // 可选值 
					clearBtnHidden: true, // 可选值 是否显示按钮
					items: [],
					actions: []
				},
				tableGroup: {
					tHeadData: [
						{prop: "columns_name",name: '栏目名称'}, 
					],
					tData:[],
					Opration: {
						width: '200',
						actions: []
					}
				},
				loading: true
			};
			if(items.isEdit == '1'){
				dataFormat.searchGroup.actions.push({
					key: 'newNews', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
					name: '新增',  // 操作按钮名字
					//size: 'small', // 可选 用于按钮大小
					type: 'primary',  // 可选 按钮类型
				});
				dataFormat.tableGroup.Opration.actions.push({
						key: 'delete', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
						name: '删除', // 操作按钮名字
						size: 'small', // 可选 用于按钮大小
						type: 'text', // 可选 按钮类型
				})
			}
			dataFormat.pagination = {
				total: 0,  
				currentPage: 1,  
				pageSize: 10
			}
			commit("getALlColumnDataSuccess",dataFormat)
		},
		getColumnList({ commit, state }, items){
			var dataFormat = {
				searchGroup: {
					rowNum: 3,
					labelWidth: '100px', // 总体的labelWidth 可以单独为每一项设置
				 	searchBtnHidden: true, // 可选值 
					clearBtnHidden: true, // 可选值 是否显示按钮
					items: [],
					actions: []
				},
				tableGroup: {
					tHeadData: [
						{prop: "columns_name",name: '栏目名称'}, 
					],
					tData:[],
					Opration: {
						width: '200',
						actions: []
					}
				},
				loading: true
			};
			if(items.isEdit == '1'){
				dataFormat.searchGroup.actions.push({
					key: 'newNews', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
					name: '新增',  // 操作按钮名字
					//size: 'small', // 可选 用于按钮大小
					type: 'primary',  // 可选 按钮类型
				});
				dataFormat.tableGroup.Opration.actions.push({
						key: 'delete', // 可选(如果用多个方法时，必填 不然无法区分点击了哪个方法) 用于回传确定点击的是那个方法
						name: '删除', // 操作按钮名字
						size: 'small', // 可选 用于按钮大小
						type: 'text', // 可选 按钮类型
				})
			}
			let params = {
				param:{}
			};
			Http({url: '/web/information/getAllColumn',data:params})
			  .then((res) => {
				dataFormat.loading = false;
			    if(res.code === 1){
			     	let searchData = res.data.data;
					dataFormat.tableGroup.tData = searchData;
			     	commit("getALlColumnDataSuccess",dataFormat)
			    }
				
			 })
			.catch(function (error) {
			    console.log(error);
			});
		},
		//查看详情
		getNewsListDetails({ commit, state }, items) {
			return new Promise((resolve, reject) => {
				Http({url: '/web/information/selectDetailsById',data:{param:{columnId:items}}})
				.then((res) => {
					if(res.code === 1){
						let dataFormat = {
							detail:{
								columns_name:res.data.data.columns_name,
								columnsId:res.data.data.columnsId,
								contents:res.data.data.contents,
								published_person:res.data.data.published_person,
								published_time:res.data.data.published_time,
								reading_times:res.data.data.reading_times,
								pictures:res.data.data.pictures,
								id:res.data.data.id,
								picture:res.data.data.picture,
								title:res.data.data.title
							}
						}
						commit('getNewsListDetailsSuccess', dataFormat);
						resolve();
					}
				})
				.catch(function (error) {
				  console.log(error);
				});
			})
		}
	},
	mutations: {
		
		getNewsListSuccess(state, data) {
			state.newsMs.newsdata = data;
		},
		getNewsListDetailsSuccess(state, data) {
			state.newsMs.details = data;
		},
		getALlColumnSuccess(state, data){
			state.newsMs.columns = data;
		},
		getALlColumnDataSuccess(state, data){
			state.newsMs.columnsdata = data;
		}
	}
}