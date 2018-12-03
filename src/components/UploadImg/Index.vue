<template>
	<div class="uploader-box">
		<input type="file" accept="image/*" class="my-uploader__input">
	</div>
</template>

<script>
</script>

<style lang="sass">
	.uploader-box{
		width:100px;
		height:100px;
		.my-uploader__input{
			width: 100%;
			height:100%;
			opacity: 0;
		}
	}
</style>