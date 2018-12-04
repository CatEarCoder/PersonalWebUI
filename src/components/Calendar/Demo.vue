<template>
	<div class="demo">
		<v-calendar :settings="{maxmonths:3,comeColor:'#2EB6A8',outColor:'#2EB6A8',daysnumber:'200'}" @selectDate="selectDate" timing="future"></v-calendar>
	</div>
</template>

<script>
	import Calendar from "@/components/Calendar/Index"
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			selectDate(data){
				console.log(data)
			}
		},
		created(){
			
		},
		components:{
			"v-calendar":Calendar
		}
	}
</script>

<style>
</style>