<template>
	<div class="main">
		<v-uploader :after-read="onRead" :isZIP=true><v-button type="default">点击选择</v-button></v-uploader>
	</div>
</template>

<script>
	import Uploader from "@/components/UploadImg/Index"
	import Button from "@/components/Button/Index"
	export default {
    data() {
      return {
      }
    },
    methods:{
    	onRead(content){
    		console.log(content)
    	}
    },
    created(){
    	
    },
    mounted(){
    	
    },
    components:{
    	"v-uploader":Uploader,
    	"v-button":Button
    }
 }
</script>

<style lang="scss">
.uploader-box{
	position:relative;
}
</style>