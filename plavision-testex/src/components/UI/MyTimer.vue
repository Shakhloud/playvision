<script setup>
import CircleProgress from 'vue3-circle-progress'
import {ref, onMounted, computed, onUnmounted} from 'vue';
//Инициализация пропсов
const props = defineProps({
  time: Number,
  endHandler: Function,
});
//Инициализация необходимых переменных
const currentTime = ref(props.time);
const color = '#437FC0';
const empty_color = '#041743';
let timerId = ref();
//Computed
const progress = computed(() => -(currentTime.value / props.time) * 100);

//Methods
const startTimer = () => {
  const delay = 1000;
  let running = true;
  const repeat = () => {
    if (!running) {
      return;
    }
    if (currentTime.value - 1 === 0) {
      currentTime.value = 0;
      props.endHandler();
      running = false; // Останавливаем таймер
    } else {
      currentTime.value--;
    }
    setTimeout(repeat, delay);
  };
  setTimeout(repeat, delay);

  return {
    stop: () => {
      running = false;
    },
  };
};

//Mounted
onMounted(() => {
  console.log('mounted!');
  timerId = startTimer();
});

//Unmounted
onUnmounted(() => {
  console.log('unmounted!');
  timerId.stop();
});

</script>

<script>
export default {
  name: 'my-timer'
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