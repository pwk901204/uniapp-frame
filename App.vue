<script>
    export default {
        onLaunch: function() {
            console.log('App Launch');
        },
        onShow: function() {
            console.log('App Show')
			this.$store.commit('setSubmitFlag', true)
			this.$store.commit('setHideTextarea', false)
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style>
	/* 组件样式文件 */
    @import './common/uni.css'; 
	
	/* 公共样式文件 */
    @import './common/common.less';
</style>
