<template>
  <div class="switch" :class="{ 'switch-on': value }" @click="toggleSwitch">
    <div class="switch_handle"></div>
  </div>
</template>

<script>
export default {
  name: 'SwitchChanger',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleSwitch() {
      this.$emit('input', !this.value);
    },
  },
};
</script>

<style scoped>
.switch {
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: #E5E5E5;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}

.switch-on {
  background-color: var(--main-color);
}

.switch_handle {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #FFFFFF;
  border-radius: 50%;
}

.switch-on .switch_handle {
  transform: translateX(20px);
}
</style>