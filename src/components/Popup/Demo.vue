<template>
	<div class="demo">
		<v-button @click="setPopup">点我</v-button>
		<v-popup v-model="test">123</v-popup>
	</div>
</template>

<script>
	import Popup from "@/components/Popup/Index"
	import Button from "@/components/Button/Index"
	export default({
		
		data(){
			return {
				test:false
			}
		},
		methods:{
			setPopup(){
				this.test = !this.test;
			}
		},
		created(){
			
		},
		mounted(){
			
		},
		components:{
			"v-popup":Popup,
			"v-button":Button
		}
	})
</script>

<style>
</style>