//进行route的
const { body } = document;
const WIDTH = 1024
const RATIO = 3

export default {
    watch: {
       $route(route){
          if(this.device === 'mobile' && this.sidebar.opened){
	     
	  }
       }
    },
    beforeMount(){
       window.addEventListener('resize',this.resizeHandler);
    },
    Mounted(){
        const isMobile = this.isMobile();
	if(isMobile){
	    
	}
    },
    methods:{
       isMobile(){
           const rect = body.getBoundingClientRect();
	   return rect.width - RATIO < WIDTH
       },
       resizeHandler(){
           if(!document.hidden){
	        const isMobile = this.isMobile();

		if(isMobile){
		    
		}
	   }
       }
    }
}
