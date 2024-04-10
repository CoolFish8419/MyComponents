<template>
    <div>
        <div class="search_bar">
            <input type="text" v-model="searchInput"
                   placeholder="请输入搜索地点" @change="searchLocation" />
            <div id="panel"></div>
        </div>
        <div class="content_bar" v-if="searchResults.length">
            <div v-for="item in showResults" :key="item.id" class="content_item"
            @click="selectLocation(item)">
                <span>{{item.name}}</span>
                <p>{{item.address}}</p>
            </div>
            <button class="btn_pre" @click="prePage">上一页</button>
            <button class="btn_next" @click="nextPage">下一页</button>
            <p>当前第{{currentPage}}页，总共{{totalPages}}页</p>
        </div>
        <div id="container">
        </div>
        <div class="selected_location">
            <div>{{ selectedLocation.name }}</div>
            <div>{{ selectedLocation.address }}</div>
            <div>经度：{{ selectedLocation.location.lng }}</div>
            <div>纬度：{{ selectedLocation.location.lat }}</div>
        </div>
    </div>
</template>

<script>
    import AMapLoader from '@amap/amap-jsapi-loader';
    window._AMapSecurityConfig = {
        securityJsCode:'4c7d5a27583ec63076c7573ca8dc0fa7',
    }
    export default {
        name: "MapContainer.vue",
        data(){
            return{
                map: null,
                marker: null,
                searchInput: '',
                selectedLocation: {
                    name: '',
                    address: '',
                    location: {
                        lng: 0,
                        lat: 0
                    }
                },
                searchResults:[],
                pageSize:5,
                currentPage:1,
            }
        },
        computed:{
            totalPages(){
                return Math.ceil(this.searchResults.length/this.pageSize)
            },
            startIndex(){
                return (this.currentPage - 1) * this.pageSize;
            },
            endIndex(){
                if(this.currentPage<this.totalPages)
                return this.currentPage * this.pageSize;
                else return this.searchResults.length;
            },
            showResults(){
                return this.searchResults.slice(this.startIndex,this.endIndex);
            }
        },
        methods:{
            initMap(){
                const apiKey="9f32d4c04bfb747019fa320d91a013bc";
                AMapLoader.load({
                    key:apiKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
                    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins:['AMap.PlaceSearch'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                }).then((AMap)=>{
                    this.map = new AMap.Map("container",{  //设置地图容器id
                        viewMode:"2D",    //是否为3D地图模式
                        zoom:5,           //初始化地图级别
                        center:[105.602725,37.076636], //初始化地图中心点位置
                    });
                    this.map.on('click',this.handleMapClick);
                }).catch(e=>{
                    console.log(e);
                })
            },
            searchLocation() {
                const locationSearch=this.searchInput;
                AMap.plugin('AMap.PlaceSearch', () => {
                    const placeSearch = new AMap.PlaceSearch({
                        pageSize: 10, // 若采用自定义显示框，此为返回的数据数，若使用内含panel显示，则此为单页显示数
                        pageIndex: 1, // 页码
                        city: "全国", // 城市
                        citylimit: false,  //是否强制限制在设置的城市内搜索
                        map: this.map, // 展现结果的地图实例
                        autoFitView:true,
                        showCover:false,
                        });
                    placeSearch.search(locationSearch, (status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            //清除所有自动生成的marker
                            this.map.clearMap();
                            //获得搜索结果
                            const pois = result.poiList.pois;
                            this.searchResults=pois;
                            //为每个点位定义一个红色的marker，并且为每个marker绑定一个点击事件
                            let marker=[]
                            for(let i=0;i<pois.length;i++)
                            {
                                marker[i]=new AMap.Marker({
                                    position:[pois[i].location.lng,pois[i].location.lat],
                                    icon:new AMap.Icon({
                                        size:new AMap.Size(20,27),
                                        imageSize: new AMap.Size(20,27),
                                        image:"https://a.amap.com/jsapi/static/image/plugin/marker_red.png",
                                    }),
                                    offset: new AMap.Pixel(-10, -23),
                                });
                                this.map.add(marker[i]);
                                //给marker绑定点击事件
                                marker[i].on('click',()=>{this.selectLocation(pois[i])})
                            }
                            // 获取搜索结果中的第一个位置
                            const location = result.poiList.pois[0];
                            this.selectLocation(location);
                        }
                    });
                });
            },
            selectLocation(location) {
                // 清除之前的标记
                if (this.marker) {
                    this.map.remove(this.marker);
                    this.marker = null;
                }
                // 在地图上标记选定的位置
                this.marker = new AMap.Marker({
                    position: [location.location.lng, location.location.lat]
                });
                this.map.add(this.marker);
                //让地图中心位置跟着点击位置移动
                this.map.setCenter([location.location.lng, location.location.lat]);
                // 更新选定位置的信息
                this.selectedLocation.name = location.name;
                this.selectedLocation.address = location.address || '';
                this.selectedLocation.location = {
                    lng: location.location.lng,
                    lat: location.location.lat
                };
                this.$emit('selectedLocation', this.selectedLocation)
            },
            // 处理地图点击事件
            handleMapClick(event) {
                const lnglat = event.lnglat;
                AMap.plugin('AMap.Geocoder', () => {
                    const geocoder = new AMap.Geocoder();
                    geocoder.getAddress(lnglat, (status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            const location = result.regeocode.formattedAddress;
                            this.selectLocation({
                                name: '点击位置',
                                address: location,
                                location: { lng: lnglat.getLng(), lat: lnglat.getLat() }
                            });
                        }
                    });
                });
            },
            prePage(){
                if(this.currentPage>1)
                this.currentPage-=1;
            },
            nextPage(){
                if(this.currentPage<this.totalPages)
                this.currentPage+=1;
            },
        },
        mounted(){
            //DOM初始化完成进行地图初始化
            this.initMap();
        }
    }
</script>

<style scoped>
    #container{
        padding:0px;
        margin: 0px;
        width: 600px;
        height: 500px;
    }
    .search_bar{
        position:absolute;
        top:0;
        left:0;
        z-index:999;
        width: 200px;
        height: 40px;
        border:1px solid #CCCCCC;
    }
    .search_bar input{
        color:#5C5C5C;
        width: 198px;
        height: 38px;
        line-height: 40px;
        padding-left:2px;
    }
    .content_bar{
        position:absolute;
        top:40px;
        left:0;
        z-index:999;
        width:200px;
        max-height: 400px;
        background-color: #FFFFFF;
    }
    .content_item{
        border:1px solid #CCCCCC;
        border-top:none;
        padding:4px 1px;
        background-color: #FFFFFF;
    }
    .content_item p{
        font-size:12px;
        color:#5C5C5C;
    }
    .btn_next{
        margin-left:10px;
    }
</style>