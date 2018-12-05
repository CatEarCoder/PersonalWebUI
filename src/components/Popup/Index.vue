<template>
  <transition :name="currentTransition">
    <div v-if="value" :class="'v-popup-'+position">
      <slot />
    </div>
  </transition>
</template>

<script>
export default({
	name:"Popup",
	props: {
		transition: String,
		value:{
			type: Boolean,
      default: false
		},
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom'
    }
  },
  computed: {
    currentTransition() {
      return this.transition || (this.position === '' ? 'van-fade' : `popup-slide-${this.position}`);
    }
  },
	created(){
		
	},
  methods: {
 		
  }
});
</script>
<style lang="scss" scoped>
	.v-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    -webkit-transition: 0.3s ease-out;
    transition: 0.3s ease-out;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
	}
	.v-popup-bottom {
    width: 100%;
    top: auto;
    bottom: 0;
    right: auto;
    left: 50%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
	}
	.v-popup-top {
    width: 100%;
    top: 0;
    right: auto;
    bottom: auto;
    left: 50%;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
	}
	.v-popup-right {
    top: 50%;
    right: 0;
    bottom: auto;
    left: auto;
    -webkit-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
	}
</style>
