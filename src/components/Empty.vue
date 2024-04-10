<template>
	<div class="empty-div" :style="{'height': height + 'px'}">
		<div class="empty-img">
			{{result}}
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			height:{
				type: Number,
				default:()=>{
					return 160
				}
			},
			result: {
				type:String,
				default:() => {
					return '暂无内容'
				}
			}
		},
		data() {
			return{
				
			}
		}
	}
</script>

<style scope>
	.empty-div{
		position: relative;
	}
	.empty-img{
		width: 157px;
		height: 96px;
		background: url('../assets/image/icon_empty.png') no-repeat;
		background-size: 157px 96px;
		padding-top:120px;
		text-align: center;
		line-height: 20px;
		color: #999999;
		font-size: 12px;
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		margin:auto;
	}
</style>