<template>
	<div class='v-calendar'>
		<div class="canlendar-wrapper">
		 	<table class='dateZone'>
		 		<tr>
		 			<td class='colo'>日</td>
		 			<td>一</td>
		 			<td>二</td>
		 			<td>三</td>
		 			<td>四</td>
		 			<td>五</td>
		 			<td class='colo'>六</td>
		 		</tr>
		 	</table>
		 	<div class='tbody'>
		 		<div class="m" v-for="item,monthIndex in Callist">
		 			<div class='ny1'> {{ item.year }} 年 {{ item.month < 10?"0"+item.month:item.month }} 月</div>
		 			<table class='dateTable'>
		 				<tr v-for="row,index in Math.ceil(item.trData.length/7)">
		 					<td v-for="col,i in days" @click="selectDate(monthIndex,item.trData[index*7+i],$event)" :data-set="item.year+'-'+item.month+'-'+item.trData[index*7+i]" v-bind:class="{'active today':item.trData[index*7+i]==today&&monthIndex==0,'gray':item.trData[index*7+i]<today&&monthIndex==0}"><p>{{ item.trData[index*7+i] }}</p><p>{{ item.year + "-" +item.month + "-" + item.trData[index*7+i] | dateText}}</p></td>
		 				</tr>
		 			</table>
		 		</div>
		 	</div>
	 	</div>
	</div>
</template>
<script>
	import lunarday from '@/utils/Lunarday';
	let holiday = {"0101":"元旦","0214":"情人节","0308": "妇女节","0312":"植树节","0315": "消费者权益日","0401": "愚人节","0501": "劳动节","0512": "护士节","0601":"儿童节","0701": "建党节","0801": "建军节","0910": "教师节","1001": "国庆节","1224": "平安夜","1225":"圣诞节"};
	let holiday1 = {"0101":"春节","0115": "元宵节","0505": "端午节","0707": "七夕节","0815": "中秋节","0909": "重阳节","1208": "腊八节","1224": "小年"};
	export default{
		props:["settings","timing"],
		data(){
			return {
				Callist:[],
				days:7,
				today:0,
				tomorrow:0,
				selectedDate:[{month:0,days:1}],
				dateData:[],
				startDate:"",
				endDate:""
			}
		},
		filters:{
			dateText(value){
				if(value.indexOf("undefined")!=-1) return "";
				let m = parseInt(value.split("-")[1])<10?"0"+parseInt(value.split("-")[1]):parseInt(value.split("-")[1])+"";
				let d = parseInt(value.split("-")[2])<10?"0"+parseInt(value.split("-")[2]):parseInt(value.split("-")[2])+"";
				
				let y1 = value.split("-")[0];
				let m1 = value.split("-")[1];
				let d1 = value.split("-")[2];
				
				let curDate = new Date().getMonth()+1 == value.split("-")[0] && new Date().getDate() == value.split("-")[1];
				let tomorrow = new Date().getMonth()+1 == value.split("-")[0] && new Date().getDate() + 1 == parseInt(value.split("-")[1]);
				let k = m+d;
				let text = "";
				if(holiday[k]){
					text = holiday[k];
				}
				else{
					text = lunarday.GetLunarDay(y1,m1,d1).substr(2,2);
				}
				return text;
			}
		},
		methods:{
			done(){
				this.$emit('selectDate',{startDate:this.startDate,endDate:this.endDate})
			},
			clear(){
				var tds = document.getElementsByTagName("td");
				this.initCalendar();
				for(var i=0;i<tds.length;i++){
					if(!tds[i].classList.contains('today')){
						tds[i].classList.remove('active');
						tds[i].classList.remove('selected');
					}
					else{
						tds[i].classList.add('active');
					}
                }
 				this.$emit('selectDate',{startDate:this.startDate,endDate:this.endDate});
			},
			_isLeapYear: function(year) {
          return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
      },
			initCalendar(){
				this.Callist=[];
				this.startDate="";
				this.endDate="";
				
				this.dateData=[];
				//公历节日
				
				for (var q = 0; q<this.settings.maxmonths; q++) {
					var obj={};
            var select = q;
            var currentDate = new Date();
            currentDate.setDate(1);
            currentDate.setMonth(currentDate.getMonth() + q);
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth();
            var setcurrentDate = new Date(currentYear, currentMonth, 1);
            var firstDay = setcurrentDate.getDay();
            var yf = currentMonth + 1;
            this.dateData.push({year:currentYear,month:yf});
						obj.year = currentYear;
						obj.month = yf;
            obj.trData=[];
            var DaysInMonth = [];
            if (this._isLeapYear(currentYear)) {
                DaysInMonth = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            } else {
                DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            }
            var Ntd = firstDay + DaysInMonth[currentMonth];
            var Ntr = Math.ceil(Ntd / 7);

            for(var i=0;i<DaysInMonth[currentMonth];i++){
            	obj.trData[firstDay++]=i+1;
            }
            this.Callist.push(obj);
        }
				this.selectedDate=[{year:this.dateData[0].year,month:0,days:1}];
				this._initselected();
			},
			_initselected:function(){
        var strDays = new Date().getDate();
        var arry = [];
        var arry1 = [];
        this.selectedDate[0].days=strDays;
        this.today=strDays;
        this.selectedDate[0].days=strDays;
        this.startDate=this.dateData[0].year+'-'+this.dateData[this.selectedDate[0].month].month+'-'+this.selectedDate[0].days;
        this.tomorrow=strDays+1;
			},
			selectDate(mIndex,days,e){
				console.log(mIndex)
				if(e.target.classList.contains('gray')||e.target.innerText==""){
					return false;
				}
				var tds = document.getElementsByTagName("td");
				if(mIndex<this.selectedDate[0].month){
					for(var i=0;i<tds.length;i++){
	 					tds[i].classList.remove('active');

	                }
					e.target.classList.add('active');
					this.selectedDate=[{
						year:this.dateData[mIndex].year,
						month:mIndex,
						days:days
					}]
					this.checkColor(false);
					return false;
				}
				if(mIndex==this.selectedDate[0].month&&days<this.selectedDate[0].days){
					for(var i=0;i<tds.length;i++){
	 					tds[i].classList.remove('active');

	                }
					e.target.classList.add('active');
					this.selectedDate=[{
						year:this.dateData[mIndex].year,
						month:mIndex,
						days:days
					}]
					this.checkColor(false);
					return false;
				}
				if(this.selectedDate.length==2){
					for(var i=0;i<tds.length;i++){
	 					tds[i].classList.remove('active');

	                }
					e.target.classList.add('active');
					this.selectedDate=[{
						year:this.dateData[mIndex].year,
						month:mIndex,
						days:days
					}]
					this.checkColor(false);
					return false;
				}
				else{

					e.target.classList.add('active');

					this.selectedDate.push({
						year:this.dateData[mIndex].year,
						month:mIndex,
						days:days
					})
					
					if(this.selectedDate.length==2){

						this.checkColor(true);
					}
				}


			},
			checkColor(type){
				var tds = document.getElementsByTagName("td");
				let arr=[];
				for(var i=0;i<tds.length;i++){
					if(tds[i].classList.contains('active')){
 						arr.push(i);
					}
				}
				if(type){
					for(var i=arr[0]+1;i<arr[1];i++){
						if(tds[i].innerText!=""){
	 						tds[i].classList.add('selected');
	 					}
	            	}
 
					this.startDate=this.selectedDate[0].year+'-'+this.dateData[this.selectedDate[0].month].month+'-'+this.selectedDate[0].days;
					this.endDate=this.selectedDate[1].year+'-'+this.dateData[this.selectedDate[1].month].month+'-'+this.selectedDate[1].days;
					this.done();
				}
				else{
					for(var i=0;i<tds.length;i++){
	 					tds[i].classList.remove('selected');
	            	}
					this.startDate=this.selectedDate[0].year+'-'+this.dateData[this.selectedDate[0].month].month+'-'+this.selectedDate[0].days;
					this.endDate="";
					this.done();
				}

			},
			
		},
		created(){
			console.log(this.settings)
			if(!this.settings){
				this.settings = {
					maxmonths:1,
					comeColor:'#2EB6A8',
					outColor:'#2EB6A8',
					daysnumber:"200"
				};
			}
		},
		mounted(){
			this.initCalendar();
		}
	}
</script>
<style lang="scss" $scoped>
.v-calendar{
	width: 100%;
	overflow:hidden;
	height:100%;
	background: #fff;
	font-size: 16px;
	.canlendar-wrapper{
		
		position: relative;
		width: 100%;
		height:auto;
		overflow-y:scroll;
		.dateZone{
			width:100%;
			margin:auto;
			background:#ffffff;
			border-bottom:1PX solid #ddd;
			border-top:1PX solid #ddd;
			color:#666;
			z-index:9999;
			position:fixed;
			top:0;
			left:0;
			td{
				background:#ffffff;
				height:30px;
				line-height: 30px;
				width:14.2%;
				font-size: 14px;
			}
			.colo{
				color:#fa967f;
			}
		}
		.tbody {
	    margin-top :48px;
			.m{
				overflow: hidden;
				border-bottom:1PX solid #ddd;
				table{
					border-color:#ddd;
				}
				.dateTable{
					width:99.4%;
					margin:auto;
	
					td{
						background:#fff;
						color: #555;
						width:14.2%;
						font-size: 14px;
					}
					td.active{
						background-color:#2eb6a8 ;
						color:#fff;
						border-radius: 5px;
					}
					td.gray{
						color:#a2a2a2!important;
					}
					td.selected{
						background-color: #e0f4f2;
					}
				}
			}
			.ny1{
				width:100%;
				text-align:center;
				padding:5px 0;
				color: #555;
				background-color: #FAFAFA;
				border-bottom:1PX solid #ddd;
				font-size: 15px;
				line-height: 28px;
			}
		}
	

	}
	table{
		border-spacing: 0;
	}
	td{
		text-align:center;
		padding:8px 0;
		p{
			pointer-events: none;
			height:20px;
			line-height:20px;
			font-size: 12px;
			letter-spacing: 1px;
		}
	}
}
</style>
