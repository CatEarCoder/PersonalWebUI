<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled"
    @click="onClick"
    :class="['v-button','v-button-'+type,'v-button-'+size]"
  	>
    <loading v-if="loading" size="20px" :color="type === 'default' ? void 0 : ''" />
    <span v-else class="b('text')">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>

<script>
export default({
	props: {
    text: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    nativeType: String,
    bottomAction: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
	created(){
		
	},
  methods: {
    onClick(event) {
      if (!this.loading && !this.disabled) {
        this.$emit('click', event);
      }
    },
    b(){
 
    }
  }
});
</script>
<style lang="scss" scoped>
	.v-button {
    position: relative;
    padding: 0;
    display: inline-block;
    height: 44px;
    line-height: 42px;
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 16px;
    text-align: center;
    -webkit-appearance: none;
    -webkit-text-size-adjust: 100%;
 }
 .v-button-default {
    color: #323233;
    background-color: #fff;
    border: 1px solid #ebedf0;
	}
	.v-button-normal {
    padding: 0 15px;
    font-size: 14px;
	}
</style>
