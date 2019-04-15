<template>
	<div class="stepper">
		<button class="stepper__minus" @click="minus" :disabled="minusDisabled||disabled" :class="{'stepper__minus--disabled':minusDisabled,'stepper__minus--disabled':disabled}"></button>
		<input class="stepper__input" type="number" v-model.trim="currentValue" :disabled="disabled" @input="handChange">
		<button class="stepper__plus" @click="plus" :disabled="plusDisabled||disabled"  :class="{'stepper__plus--disabled':plusDisabled,'stepper__plus--disabled':disabled}"></button>
		{{ minusDisabled }} {{ plusDisabled }}
	</div>
</template>

<script>
	export default{
		name:"Stepper",
		props:{
			value:{
				type:Number,
				default: 0
			},
			min:{
				type:Number
			},
			max:{
				type:Number
			},
			disabled:{
				type:Boolean,
				default: false
			}
		},
		data(){
			return {
				currentValue:this.value,
				minusDisabled:false,
				plusDisabled:false
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				
				if(this.min!=undefined){
					if(this.currentValue <= this.min){
						this.minusDisabled = true;
					}else{
						this.minusDisabled = false;
					}
				}
				if(this.max!=undefined){
					if(this.currentValue >= this.max){
						this.plusDisabled = true;
					}else{
						this.plusDisabled = false;
					}
				}
			},
			minus(){
				this.currentValue --;
				this.changeValue();
			},
			plus(){
				this.currentValue ++;
				this.changeValue();
			},
			changeValue(){
				this.init();
				this.$emit('input', this.currentValue) 
			},
			handChange(){
				if(this.currentValue == ""){
					this.currentValue = 0;
					return false;
				}
				this.currentValue = parseInt(this.currentValue.replace(/[^0-9]/g, ''));
				this.init();
			}
		}
	}
</script>

<style>
	button,input{

		outline:none;
	}
	.stepper {
		font-size: 0;
	}
	.stepper__input {
		width: 30px;
		height: 28px;
		border: 0;
		margin: 1px;
		background-color: #f2f3f5;
		border-radius: 0;
		box-sizing: content-box;
		color: #323233;
		font-size: 14px;
		vertical-align: top;
		text-align: center;
		-webkit-appearance: none;
	}
	.stepper__minus, .stepper__plus {
		width: 28px;
		height: 28px;
		box-sizing: border-box;
		background-color: #f2f3f5;
		border: 0;
		margin: 1px;
		position: relative;
		padding: 5px;
		vertical-align: middle;
	}
	.stepper__minus {
		border-radius: 4px 0 0 4px;
	}
	.stepper__plus {
		border-radius: 0px 4px 4px 0px;
	}
	.stepper__minus::before, .stepper__plus::before, .stepper__plus::after {
		content: '';
		position: absolute;
		margin: auto;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #323233;
	}
	.stepper__minus--disabled::before, .stepper__plus--disabled::before, .stepper__minus--disabled::after, .stepper__plus--disabled::after {
		background-color: #c8c9cc;
	}
	.stepper__minus::before, .stepper__plus::before {
		width: 9px;
		height: 1px;
	}
	.stepper__plus::after {
		width: 1px;
		height: 9px;
	}
</style>
