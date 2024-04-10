<template>
  <ul class="list_dropdown_menu">
    <template v-for="(item, index) in menuItems">
      <li :key="index">
        <span
            class="span_menu_item"
            @click="showMenu(item)"
            :class="{ 'active': showList[item.label].expanded ,'parent': item.menuItems}">
          <img v-if="item.iconSrc&&item.iconHoverSrc" :src="checkImgSrc(item)" alt="Icon" class="icon_menu" />
          <img v-if="item.iconSrc&&!item.iconHoverSrc" :src="item.iconSrc" alt="Icon" class="icon_menu" />
          {{ item.label }}
        </span>
        <ul v-show="showList[item.label].expanded" v-if="item.menuItems">
          <li v-for="(subItem, subIndex) in item.menuItems" :key="subIndex">
              <span
                  class="span_menu_item"
                  @click="showMenu(subItem)"
              >
                <img v-if="subItem.iconSrc" :src="subItem.iconSrc" alt="Icon" class="icon_menu" />
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
  name: "DropdownList",
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    defaultExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const showList = {};
    this.menuItems.forEach((item) => {
      showList[item.label] = {
        expanded: this.defaultExpanded,
      };
    });
    return {
      showList,
    };
  },
  methods: {
    checkImgSrc(item){
      if(!this.showList[item.label].expanded)return item.iconSrc;
      if(this.showList[item.label].expanded)return item.iconHoverSrc;
    },
    showMenu(item) {
      if (!item.menuItems) {
        this.getInfo(item);
      }
      if (item.menuItems) {
        this.showList[item.label].expanded = !this.showList[item.label].expanded;
      }
    },
    getInfo(item) {
      const info = JSON.parse(JSON.stringify(item));
      this.$emit("getInfo", info);
    },
  },
  created() {
    if (this.defaultExpanded !== undefined) {
      this.menuItems.forEach((item) => {
        item.expanded = this.defaultExpanded;
      });
    }
  },
};
</script>

<style scoped>
.list_dropdown_menu {
  display: flex;
  flex-direction: column;
  width: 192px;
  padding: 4px;
  align-items: center;
  justify-content: center;
  background-color: #F9F9F9;
}

.span_menu_item {
  position: relative;
  display: flex;
  width: 192px;
  height: 40px;
  margin-bottom: 4px;
  align-items: center;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
}
.span_menu_item.parent {
  box-sizing: border-box;
  padding: 16px 12px;
  font-size: 12px;
  color: #4E83C8;
  background: url("img_list_show.png") right 12px center/10px 10px no-repeat;
}

.span_menu_item.parent.active {
  background: #FFFFFF url("img_list_hide.png") right 12px center/10px 10px no-repeat;
}

.span_menu_item:not(.parent) {
  box-sizing: border-box;
  padding: 12px 12px;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
}

.span_menu_item:not(.parent):hover {
  background-color: rgba(78, 131, 200, 0.05);
}
.span_menu_item:not(.parent) .icon_menu {
  width: 16px;
  height: 16px;
  margin: 0 12px 0 32px;
}

.icon_menu {
  width: 16px;
  height: 16px;
  margin: 0 12px 0 12px;
}
</style>