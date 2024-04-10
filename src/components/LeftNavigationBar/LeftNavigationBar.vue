<template>
  <ul class="list_dropdown_menu">
    <template v-for="(item, index) in menuItems">
      <li v-if="onlyOneLevel">
        <span
            @click="redirect(item)"
            class="span_menu_item"
            :class="{ 'active': item.label===isActive,
                     'disabled':item.disabled }">
          <img v-if="item.iconSrc&&item.iconSrcActive" :src="getIconSrc(item)" alt="Icon" class="icon_menu_left" />
          {{ item.label }}
        </span>
      </li>
      <li v-if="!onlyOneLevel" :key="index">
        <div
            class="span_menu_item"
            @click="showMenu(item)"
            :class="{ 'active': showList[item.label].expanded ,
                      'parent': item.menuItems,
                      'disabled':item.disabled
            }">
          <div class="icon_menu"/>
          {{ item.label }}
        </div>
        <ul v-show="showList[item.label].expanded" v-if="item.menuItems">
          <li v-for="(subItem, subIndex) in item.menuItems" :key="subIndex">
              <span
                  @click="redirect(item,subItem)"
                  class="span_menu_item"
                  :class="{ 'active':subItem.label===isActive,
                            'disabled':subItem.disabled }">
                {{ subItem.label }}
              </span>
          </li>
        </ul>
      </li>

    </template>
  </ul>
</template>

<script>
export default {
  name: "LeftNavigationBar",
  props: {
    menuItems: {
      type: Array,
      required: true
    },
    defaultExpanded: {
      type: Boolean,
      default: false
    },
    showFirstPage: {
      type: Boolean,
      default: false
    },
  },
  data() {
    const showList = {};
    this.menuItems.forEach((item) => {
      if (item.disabled !== undefined && item.disabled === true) {
        showList[item.label] = {
          expanded: false
        };
        return;
      }
      showList[item.label] = {
        expanded: this.defaultExpanded,
        link:item.link,
        label:item.label
      };
    });
    return {
      showList,
      breadItem: [],
      activeSubItem: "",
      onlyOneLevel: false,
      isActive:"",
      iconSrc:null
    };
  },
  methods: {
    showMenu(item) {
      if (item.menuItems) {
        this.checkRouterLink(item);
        this.showList[item.label].expanded = !this.showList[item.label].expanded;
      }
    },
    redirect(item, subItem) {
      if(!this.onlyOneLevel){
        this.activeSubItem = subItem.link;
        if (subItem.link) {
          this.isActive=subItem.label
          this.checkRouterLink(subItem);
        }
      }
      else {
        this.activeSubItem = item.link;
        if (item.link) {
          this.isActive=item.label
          this.checkRouterLink(item);
        }
      }
    },
    findFirstTrueKey() {
      for (let key in this.showList) {
        if (this.showList[key].expanded === true) {
          return key;
        }
      }
    },
    findLinkName(link){
      this.menuItems.forEach(item=>{
        if(item.menuItems){
          item.menuItems.forEach(subItem=>{
            if(subItem.link ===link){
              this.isActive=subItem.label;
            }
          })
        }
        else{
          if(item.link ===link){
            this.isActive=item.label;
          }
        }
      })
    },
    checkInnerLink(link){
      this.menuItems.forEach(item=>{
        if(item.menuItems){
          item.menuItems.forEach(subItem=>{
            if(subItem.innerPage){
              subItem.innerPage.forEach(subItem1 => {
                if (subItem1.link === link) {
                  this.isActive = subItem.label;
                }
              });
            }
          })
        }
        else{
          if(item.innerPage){
            item.innerPage.forEach(subItem => {
              if (subItem.link === link) {
                this.isActive = item.label;
              }
            });
          }
        }
      })
    },

    checkRouterLink(item) {
      const currentPath = this.$router.currentRoute.path;
      if (item.link !== currentPath && item.link) {
        this.$router.push(`${item.link}`);
      }
    },
    updateRouter() {
      this.activeSubItem = this.$router.currentRoute.path;
      this.findLinkName(this.activeSubItem);
      this.checkInnerLink(this.activeSubItem);
    },
    getIconSrc(item) {
      if (item.link !== this.activeSubItem&&this.isActive!==item.label) {
        return item.iconSrc;
      } else if (item.link === this.activeSubItem||this.isActive===item.label) {
        return item.iconSrcActive;
      }
    },
  },
  created() {
    const hasNoMenuItems = this.menuItems.every(item => !item.hasOwnProperty("menuItems"));
    this.onlyOneLevel = !!hasNoMenuItems;
    for (let key in this.showList) {
      if (this.showList[key].link === this.$router.currentRoute.path) {
        this.isActive=this.showList[key].label;
        break;
      }
    }
    if(this.showFirstPage){
      let firstShown = this.findFirstTrueKey();
      this.menuItems.forEach(item => {
        if (firstShown === item.label) {
          this.isActive=item.label;
          this.$router.push(`${item.link}`);
        }
      });
    }
    this.updateRouter();
  },
  watch: {
    $route: "updateRouter"
  },
};
</script>
<style scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list_dropdown_menu {
  display: flex;
  flex-direction: column;
  width: 212px;
  height: 100%;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0);
  max-width: 235px;
  min-width: fit-content;
  max-height: calc(100vh - 50px);
  overflow-y: auto;
}

.span_menu_item {
  position: relative;
  display: flex;
  width: 212px;
  min-height: 44px;
  height: fit-content;
  margin-top: 4px;
  align-items: center;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.span_menu_item label {
  max-width: 134px;
}

.span_menu_item.parent:nth-child(1) {
  margin-top: 0;
}

.span_menu_item.parent {
  box-sizing: border-box;
  padding: 12px 38px 12px 12px;
  font-size: 12px;
  color: #333333;
  background: url("./img_list_show.png") right 12px center/10px 10px no-repeat;
}

.span_menu_item.parent:hover {
  background-color: #FAFAFA;
}

.span_menu_item.parent.disabled {
  color: #AAAAAA;
  cursor: default;
  background: url("./img_list_show_disabled.png") right 12px center/10px 10px no-repeat;
  pointer-events: none;
}

.span_menu_item.parent.active {
  color: #1777FF;
  background: #FFFFFF url("./img_list_hide.png") right 12px center/10px 10px no-repeat;
}

.span_menu_item:not(.parent) {
  box-sizing: border-box;
  padding: 12px 40px;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
}

.span_menu_item:not(.parent):hover {
  background-color: #FAFAFA;
}

.span_menu_item:not(.parent).active {
  color: #1777FF;
  background-color: #E6F4FF;
}

.span_menu_item:not(.parent).disabled {
  color: #AAAAAA;
  cursor: default;
  pointer-events: none;
}
.icon_menu_left{
  width: 16px;
  height: 16px;
  min-width: 16px;
  margin-right: 24px;
}
.icon_menu {
  width: 16px;
  height: 16px;
  min-width: 16px;
  margin-left: 4px;
  margin-right: 12px;
  background: url("./img_list_left.png") center /16px 16px no-repeat;
}

.span_menu_item.parent.active .icon_menu {
  background: url("./img_list_left_used.png") center /16px 16px no-repeat;
}

.span_menu_item.parent.disabled .icon_menu {
  background: url("./img_list_left_disabled.png") center /16px 16px no-repeat;
}
</style>