<template>
  <MiddleCenterDlg v-show="open">
    <div
        class="ui_dlg_container"
        style="width: 900px;padding: 24px 0 48px 0;overflow: hidden"
    >
      <div class="detail-info">
        <div class="header-div-title ui_mar_left_24">请选择地址</div>
      </div>
      <div class="ui_container ui_mar_top_36" style="padding: 0 42px">
        <div class="clearfix ui_mar_top_12">
          <div class="ui_fl address_search">
            <span>当前地址</span>
            <input class="cs_input ui_mar_left_12" disabled v-model="searchAddress"
                   placeholder="请输入地址" style="width:324px;"/>
          </div>

        </div>
        <div id="container" style="width: 100%; height: 400px;" class="ui_mar_top_12"></div>
      </div>
      <div class="ui_container cs_align_center">
        <button
            class="bottom_btn_cancel"
            style="margin-top: 40px"
            @click="cancel"
        >
          取消
        </button>
        <button
            class="bottom_btn_confirm ui_mar_left_48"
            style="margin-top: 40px"
            @click="confirm"
        >
          确认
        </button>
      </div>
    </div>
  </MiddleCenterDlg>
</template>

<script>

    import MiddleCenterDlg from './MiddleCenterDlg'
    import AMapLoader from '@amap/amap-jsapi-loader';

    export default {
        name: 'BaiduMapSelect',
        components: {
            MiddleCenterDlg
        },
        data() {
            return {
                // 搜索地址
                searchAddress: "",
                // 地址信息
                addressInfo: {
                    // 经度
                    longitude: "",
                    // 纬度
                    latitude: "",
                    // 省
                    province: "",
                    // 市
                    city: "",
                    // 区
                    district: "",
                    // 详细地址
                    address: "",
                },
                open: false,
                markAddressList: [],
                clickPoint: null,
                pointObj: [118.759127, 30.939278],
                addressInfoDetail: '',
                isClickFlag: false,
                gdMap: null,
                Geocoder: null,
                point: {},
                marker: {},
                result: null,
                searchKeys: '',
                placeSearch: null,
                autocomplete: null
            }
        },
        mounted() {

        },
        methods: {
            selectAddress() {
                console.log(this.searchKeys);
                let that = this;
                this.placeSearch.search(this.searchKeys, function (status, result) {
                    console.log(status)
                    console.log(result)
                    setTimeout(() => {
                        if(status == 'complete' && result.info === 'ok') {
                            console.log(result);
                            if(!that.isEmpty(result.poiList) && result.poiList.pois.length > 0) {
                                let point = [result.poiList.pois[0].location.lng,result.poiList.pois[0].location.lat];
                                that.addMark(point)
                            }

                        }
                    }, 200)

                })
            },
            init(lnglat) {
                let that = this;
                // 地图实例对象 （amap 为容器的id）
                AMapLoader.load({
                    "key": "8aa3f86e0da80fa4151fc8cb79f62faf",              // 申请好的Web端开发者Key，首次调用 load 时必填
                    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    "plugins": ['AMap.Geolocation', 'AMap.Geocoder', 'AMap.AutoComplete', 'AMap.PlaceSearch'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                }).then((AMap) => {

                    this.gdMap = new AMap.Map('container', {
                        resizeEnable: true,
                        zoom: 15
                    });
                    // 注入插件（定位插件，地理编码插件）
                    // 定位
                    this.currentPosition(lnglat);
                    this.gdMap.on('click', (e) => {
                        let lnglat = [e.lnglat.lng, e.lnglat.lat];
                        this.addMark(lnglat)
                    });
                    var autoOptions = {
                        city: '宣城',
                        input: "keys"//使用联想输入的input的id
                    };
                    this.autocomplete = new AMap.AutoComplete(autoOptions);
                    this.placeSearch = new AMap.PlaceSearch({
                        city: '宣城',
                        map: this.gdMap
                    });
                })
            },

            currentPosition(lnglat) {
                if (lnglat) {
                    // 有传入坐标点，直接定位到坐标点
                    this.gdMap.setCenter(lnglat);
                    this.addMark(lnglat);
                    // 获取地址
                    this.getAddress(lnglat)
                } else {
                    // 没有传入坐标点，则定位到当前所在位置
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,
                        timeout: 10000,
                        zoomToAccuracy: true,
                        buttonPosition: 'RB'
                    });
                    geolocation.getCurrentPosition((status, result) => {
                        if (status === 'complete') {
                            let points = [result.position.lng, result.position.lat];
                            map.setCenter(points);// 设置中心点
                            this.addMark(points);// 添加标记
                            // 存下坐标与地址
                            this.point = points;
                            this.getAddress(points)
                        } else {
                            console.log('定位失败', result)
                        }
                    })
                }
            },

            // 添加标记
            addMark(points) {
                this.gdMap.clearMap();
                this.marker = new AMap.Marker({
                    size: new AMap.Size(20, 30),    // 图标尺寸
                    image: '//webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png',  // Icon的图像
                    position: points, // 基点位置
                    offset: new AMap.Pixel(-10, 0), // 设置点标记偏移量
                    anchor: 'bottom-left', // 设置锚点方位
                });
                this.gdMap.add(this.marker);
                this.getAddress(points)
            },

            // 根据坐标返回地址(逆地理编码)
            getAddress(points) {
                let geocoder = new AMap.Geocoder({radius: 1000});
                this.clickPoint = points;
                geocoder.getAddress(points, (status, result) => {
                    if (status === 'complete' && result.regeocode) {
                        this.result = result;
                        this.searchAddress = result.regeocode.formattedAddress
                    }
                })
            },
            // /** 打开地图选择 */
            show(obj) {
                this.open = true;
                if (JSON.stringify(obj) != '{}') {
                    this.pointObj = [obj.longitude, obj.latitude]
                }
                this.addressInfo = {
                    longitude: "",
                    latitude: "",
                    province: "",
                    city: "",
                    district: "",
                    address: "",
                };
                this.$nextTick(() => {
                    this.init(this.pointObj);
                });
            },
            // /** 确认选择 */
            confirm() {
                let obj = {
                    longitude: this.clickPoint[0],
                    latitude: this.clickPoint[1],
                    province: this.result.regeocode.addressComponent.province,
                    city: this.result.regeocode.addressComponent.city,
                    district: this.result.regeocode.addressComponent.district,
                    address: this.result.regeocode.formattedAddress,
                };
                this.$emit("confirmMapAddress", obj);
                this.open = false;
            },
            cancel() {
                this.open = false;
            }
        },
    }
</script>
<style>
  .amap-sug-result {
    display: none;
    z-index: 10240 !important;
  }
</style>
<style scoped>
  .address_search {
    font-size: 12px;
    display: block;
  }

  .address_search span {
    display: block;
    float: left;
    line-height: 32px;
  }
</style>
