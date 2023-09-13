<script>
import CircleProgress from 'vue3-circle-progress'

export default {
  components: {
    CircleProgress,
  },
  name: 'my-timer',
  props: {
    time: Number,
    endHandler: Function,
  },
  data() {
    return {
      currentTime: this.time,
      intervalId: null,
      color: '#437FC0',
      empty_color: '#041743',
    }
  },
  methods: {
    startTimer() {
      console.log()
      this.intervalId = setInterval(() => {
        if (this.currentTime - 1 === 0) {
          this.currentTime = 0;
          clearInterval(this.intervalId);
          this.endHandler();
        } else {
          this.currentTime--;
        }
      }, 1000)
    }
  },
  computed: {
    progress() {
      return -(this.currentTime / this.time) * 100;
    },
  },
  mounted() {
    this.startTimer()
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="time">
      {{ currentTime }}
    </div>
    <circle-progress class="progress-bar"
                     :percent=progress
                     :size="23"
                     :border-width="3"
                     :border-bg-width="3"
                     :fill-color="color"
                     :empty-color="empty_color"

    />
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

.time {
  position: absolute;
  border-radius: 50%;
  background-color: #041743;
  color: #437FC0;
  font-weight: 700;
  left: 1px;
  top: 2px;
  width: 20px;
  font-size: 12px;
  text-align: center;
  height: 20px;
  padding-top: 2px;
}
</style>