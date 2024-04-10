<template>
  <div class="breadcrumb">
        <span v-for="(item, index) in breadcrumbItems" :key="item.id">
            <a v-if="item.link" :class="{ active:index === breadcrumbItems.length - 1 }"
               :href="`${$router.resolve(`${item.link}`).href}`">
                <div class="circle_end" v-if="index === breadcrumbItems.length - 1 && separator === '|'"></div>
                {{ item.label }}
            </a>
            <span v-else>
                {{ item.label }}
            </span>
            <a v-if="index < breadcrumbItems.length - 1" class="separator"
                  :class="{'special-separator': separator==='|'}">{{ separator }}</a>
            <span v-else class="txt_end"> - 当前所在页</span>
        </span>
  </div>
</template>
<script>
export default {
  name: "BreadCrumb",
  props: {
    homePageSrc:"",
    menuItems: {
      type: Array
    },
    separator: {
      type: String,
      default: "/"
    }
  },
  data() {
    return {
      breadcrumbItems: [],
      currentRoutePath: ""
    };
  },
  created() {
    this.updateBreadcrumb();
    this.currentRoutePath = this.$router.currentRoute.path;
  },
  methods: {
    updateBreadcrumb() {
      const currentRoutePath = this.$router.currentRoute.path;
      let breadcrumbItems = [
        {
          id: "home",
          label: "主页",
        }
      ];
      if(this.homePageSrc){
        breadcrumbItems[0].link=this.homePageSrc;
      }
      this.menuItems.forEach(menuItem => {
        if (menuItem.link === currentRoutePath) {
          breadcrumbItems.push({
            label: menuItem.label,
            link: menuItem.link
          });
          this.breadcrumbItems = breadcrumbItems;
          return;
        }
        if (menuItem.menuItems) {
          menuItem.menuItems.forEach(subItem => {
            if (subItem.link === currentRoutePath) {
              breadcrumbItems.push({
                    label: menuItem.label,
                    link: menuItem.link
                  },
                  {
                    label: subItem.label,
                    link: subItem.link
                  });
            }
          });
        }
      });
      this.breadcrumbItems = breadcrumbItems;
    }
  },
  watch: {
    $route: "updateBreadcrumb"
  }
};
</script>


<style scoped>
.breadcrumb .active {
  display: inline-flex;
  flex-direction: row;
  color: #333333;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 20px;
  color: #333333;
}

.circle_end {
  width: 10px;
  height: 10px;
  margin: 5px 8px 5px 0;
  background-color: #FF6E0D;
  border-radius: 5px;

}
.breadcrumb span:nth-last-child(1) {
  box-sizing: border-box;
  font-weight: bold;
  color: #333333;
  cursor: default;
  pointer-events: none;
}

.breadcrumb a {
  text-decoration: none;
  color: #999999;
}

.breadcrumb a:hover {
  color: #666666;
}

.breadcrumb .separator {
  margin: 0 8px;
  color: #CCCCCC;
}

.breadcrumb .special-separator {
  margin: 0 20px;
}

.txt_end {
  font-weight: bold;
}
</style>