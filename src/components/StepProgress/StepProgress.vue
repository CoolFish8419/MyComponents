<template>
  <div :class="['step_progress_container', direction]">
    <div v-for="(step, index) in steps" :key="index"
         :class="['each_step', direction, step.status, { 'disabled':!enableClick }]">
      <div :class="['click_area' , step.status ]" @click="getStatus(step)">
        <div class="each_step_circle">
          <span class="step_number" v-if="step.status !== 'finished' && step.status !== 'error'">{{ index + 1 }}</span>
        </div>
        <div class="each_step_label">{{ step.step }}</div>
      </div>
      <div class="each_step_line" v-if="index !== steps.length - 1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepProgress",
  data(){
    return{
    }
  },
  props: {
    direction: {
      type: String,
      default: "horizontal",
    },
    enableClick: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getStatus(status) {
      this.$emit("getStatus",JSON.parse(JSON.stringify(status)));
    },
    updateLineColor() {
      this.$nextTick(() => {
        this.steps.forEach((step, index) => {
          let stepElement = this.$el.querySelectorAll('.each_step')[index];
          if (stepElement && step.status === 'normal' && index > 0) {
            let prevLine = stepElement.previousElementSibling.querySelector('.each_step_line');
            if (prevLine) {
              prevLine.style.borderColor = '#DDDDDD';
            }
          }
        });
      });
    }
  },
  watch: {
    steps: {
      handler: function () {
        this.updateLineColor();
      },
      deep: true
    }
  },
  mounted() {
    this.updateLineColor();
  },
};
</script>

<style>
.step_progress_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.step_progress_container.vertical {
  flex-direction: column;
}

.each_step {
  position: relative;
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  align-items: center;
  justify-content: center;
}
.each_step:nth-child(1){
  margin-left: 0;
}
.step_progress_container.vertical .each_step{
  min-width: 220px;
  margin: 0 0 ;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;

}
.each_step.disabled {
  pointer-events: none;
  cursor: default;

}
.click_area{
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.each_step_circle {
  display: flex;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  align-items: center;
  line-height: 20px;
  font-size: 16px;
  background: #FFFFFF;
  color: #BBBBBB;
  border-radius: 50%;
  border: solid 1px #CCCCCC;
}

.each_step.finished .each_step_circle {
  border: none;
  background: #FFFFFF url("img_finished.png") center/32px 32px no-repeat;
}
.each_step.finished .click_area:hover{
  border: none;
  color: #4A84FA;
}
.click_area.finished:hover .each_step_circle {
  border: none;
  background: #FFFFFF url("img_finished_hover.png") center/32px 32px no-repeat;

}

.each_step.loading {
  pointer-events: none;
  cursor: default;
}

.each_step.loading .each_step_label {
  font-weight: bold;
  color: #333333;
}

.each_step.loading .each_step_circle {
  color: #FFFFFF;
  background: #4A84FA;
  border-radius: 50%;
}
.each_step.normal .click_area:hover{
  border: none;
  color: #4A84FA;
}
.click_area.normal:hover .each_step_circle {
  border: solid 1px #4A84FA;
  color: #4A84FA;
}
.step_number {
  display: inline-block;
}
.click_area.error{
  color: #FF7777;
}

.each_step.error .each_step_circle {
  border: none;
  background: #FFFFFF url("img_error.png") center/32px 32px no-repeat;
}

.each_step.error .click_area:hover{
  color: #FF8888;
}
.click_area.error:hover .each_step_circle{
  border: none;
  background: #FFFFFF url("img_error_hover.png") center/32px 32px no-repeat;
}

.each_step_label {
  display: inline-block;
  margin: 0 16px;
  line-height: 16px;
  font-size: 12px;
  max-width: 8em;
  word-wrap: break-word;
  word-break: break-all;
}
.step_progress_container.vertical .each_step_label{
  max-width: 12em
}

.each_step_line {
  width: 100px;
  border: solid 1px #1777FF;
  cursor: default
}
.step_progress_container.vertical .each_step_line {
  width: 1px;
  height: 32px;
  margin: 16px 15px;
  background-color: #4A84FA;
}</style>