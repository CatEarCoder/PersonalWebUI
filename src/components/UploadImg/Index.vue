<template>
  <div class="v-uploader">
    <slot />
    <input
      v-bind="$attrs"
      ref="input"
      type="file"
      class="v-uploader-input"
      :accept="accept"
      :disabled="disabled"
      @change="onChange"
    >
  </div>
</template>

<script>
 

export default ({
  name: 'uploader',

  inheritAttrs: false,

  props: {
    disabled: Boolean,
    beforeRead: Function,
    afterRead: Function,
    isZIP:{
    	type:Boolean,
    	default: true
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE
    }
  },

  methods: {
    onChange(event) {
      let { files } = event.target;
      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files, 0);
      if (!files || (this.beforeRead && !this.beforeRead(files))) {
        return;
      }

      if (Array.isArray(files)) {
        Promise.all(files.map(this.readFile)).then(contents => {
          let oversize = false;
          const payload = files.map((file, index) => {
//          if (file.size > this.maxSize) {
//            oversize = true;
//          }
						if(this.isZIP){
	        		this.ontpys(contents[index],800, 0.5).then((content)=>{
	        			return {
		              file: files[index],
		              content: content
		            };
	        		})
        		}else{
        			return {
	              file: files[index],
	              content: contents[index]
	            };
        		}
          });

          this.onAfterRead(payload, oversize);
        });
      } else {
        this.readFile(files).then(content => {
        	if(this.isZIP){
        		this.ontpys(content,800, 0.5).then((content)=>{
        			this.onAfterRead(
		            { file: files, content },
		            files.size > this.maxSize
		          );
        		})
        	}else{
        		this.onAfterRead(
	            { file: files, content },
	            files.size > this.maxSize
	          );
        	}
        });
      }
    },

    readFile(file) {
      return new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = event => {
          resolve(event.target.result);
        };

        if (this.resultType === 'dataUrl') {
          reader.readAsDataURL(file);
        } else if (this.resultType === 'text') {
          reader.readAsText(file);
        }
      });
    },
		ontpys(base64String, w, quality){
    	let getMimeType = function (urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1];
        // return mime.replace("image/", "");
          return mime;
        };
        var newImage = new Image();
        var imgWidth, imgHeight;
 
        var promise = new Promise(resolve => newImage.onload = resolve);
        newImage.src = base64String;
        return promise.then(() => {
            imgWidth = newImage.width;
            imgHeight = newImage.height;
            var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if (Math.max(imgWidth, imgHeight) > w) {
            if (imgWidth > imgHeight) {
                canvas.width = w;
                canvas.height = w * imgHeight / imgWidth;
            } else {
                canvas.height = w;
                canvas.width = w * imgWidth / imgHeight;
            }
        } else {
            canvas.width = imgWidth;
            canvas.height = imgHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        var base64 = canvas.toDataURL(getMimeType(base64String), quality);
        
        return base64;
      });
    },
    onAfterRead(files, oversize) {
      if (oversize) {
        this.$emit('oversize', files);
      } else {
        this.afterRead && this.afterRead(files);
        this.$refs.input && (this.$refs.input.value = '');
      }
    }
  }
});
</script>
<style lang="scss" scoped>
	.v-uploader{
		position: relative;
		.v-uploader-input{
			position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    opacity: 0;
	    cursor: pointer;
		}
	}
</style>
