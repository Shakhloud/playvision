<script setup>
import {ref, computed, onMounted} from 'vue';

const props = defineProps({
  config: Object,
  methods: Object,
});

const form__input = ref({
  isValid: false,
  message: '',
  content: '',
});

const startValidation = ref(false);
let placeholder = ref(null);
let timerInactive = ref(false);

const endHandler = () => {
  props.methods?.hide();
};
const placeholderInit = () => {
  if (props.config?.form?.type === 'email') {
    placeholder.value = 'example@email.com'
  }
  if (props.config?.form?.type === 'text') {
    placeholder.value = 'Введите запрошенные данные'
  }
  if (props.config?.form?.type === 'password') {
    placeholder.value = 'Введите пароль'
  }
};

const hideHandler = () => {
  if (props.config?.timer?.isTimer === false) {
    props.methods?.hide();
  }
};

const HandleToggleTimer = (newTimerInactiveValue) => {
  timerInactive.value = newTimerInactiveValue;
};

onMounted(() => {
  placeholderInit();
})

const isNotRequired = computed(() => {
  if (startValidation.value) {
    if (form__input.value.content === null || form__input.value.content === undefined || form__input.value.content === '') {
      form__input.value.message = 'Обязательное поле'
      form__input.value.isValid = false;
      return false;
    }
    form__input.value.isValid = true;
    return true;
  } else {
    return null;
  }
})

const submitHandler = () => {
  if (form__input.value.isValid) {
    props.methods?.hide();
    //Код отправки данных на сервер
  }
}
</script>
<script>
export default {
  name: 'my-modal',
}
</script>

<template>
  <div>{{ isNotRequired }}</div>
  <div class="modal" @click.stop="hideHandler">
    <div @click.stop class="modal__content">
      <p class="modal__title">
        {{ props.config?.title }}
      </p>
      <div v-if="props.config?.close && !props.config?.timer?.isTimer" class="modal__close modal__close-btn"
           @click="props.methods?.hide">
        <i class="gg-close"></i>
      </div>
      <div v-if="props.config?.timer?.isTimer" class="modal__close">
        <my-timer
            :time="props.config?.timer?.seconds"
            :end-handler="endHandler"
        />
      </div>
      <div class="modal__body">
        <div class="bgImg" v-show="props.config?.title_photo?.isTitlePhoto === true">
          <img class='title__photo' :src="props.config?.title_photo?.urlPhoto">
        </div>
        <div :style="{
          color: props.config?.body_title?.color
        }" class="modal__body-title">
          {{ props.config?.body_title?.content }}
        </div>
        <div class="modal__body-content">
          {{ props.config?.body }}
        </div>
        <div v-show="props.config?.after_content_photo?.isAfterContentPhoto === true">
          <img class='after-content-photo' :src="props.config?.after_content_photo?.urlPhoto">
        </div>
        <div v-if="props.config?.form?.isForm" class="modal__form-wrapper">
          <input class="modal__form" v-model='form__input.content' :type="config?.form?.type" :placeholder="placeholder"
                 :class="{ invalid: isNotRequired === false}" @focus="startValidation = true">
          <span v-show="isNotRequired === false" class="modal__form-error">{{ form__input.message }}</span>
        </div>
      </div>
      <div v-show="props.config?.btns !== undefined" class="btns__wrapper">
        <div v-for="btn in props.config?.btns" :key="btn.id">

          <button type="submit" @click="submitHandler" class="btn"
                  :style="`background: ${isNotRequired ? btn?.bgcolor : 'radial-gradient(ellipse at center, rgba(45,47,49,1) 0%, rgba(65,68,72,1) 100%)'}`"
                  :class="{invalid_btn: !isNotRequired}">
            <img v-show="btn.position_icon === 'start'" class="btn__icon" :src='btn.icon' alt="Иконка">
            <div class="btn_content">{{ btn.content }}</div>
            <img v-show="btn.position_icon === 'end'" class="btn__icon" :src='btn.icon' alt="Иконка">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.after-content-photo {
  margin: 10px 0 0 0;
  max-width: 40%;
}

.title__photo {
  max-width: 60%;
}

.modal__form-wrapper {
  margin-top: 15px;
}

.modal__form {
  background-color: #010B25;
  border: 1px solid #041743;
  padding: 8px;
  border-radius: 15px;
  color: white;
  width: 70%;
  outline: none;
}

.modal__form-error {
  margin-top: 5px;
  color: red;
  font-size: 10px;
  display: block;
}

.invalid {
  border: 1px solid red;
}

.btns__wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 400px;
  margin-top: 10px;
  padding: 0 10px;
}

.btn_content {
  margin: 0 10px;
}

.btn {
  width: 122px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-weight: 700;
  font-size: 12px;
  color: white;
  cursor: pointer;
  background: #fff0f0;
  border: none;
  border-radius: 0.75em;
  transition: transform 0.15s;
  transform-style: preserve-3d;
}

.invalid_btn {
  cursor: default;
}

.btn__icon {
  width: 15px;
}

.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  display: flex;
}

.modal__content {
  position: relative;
  margin: auto;
  background: linear-gradient(0deg, rgba(3, 0, 62, 1) 0%, rgba(30, 67, 113, 1) 100%);
  border-radius: 12px;
  min-height: 100px;
  min-width: 400px;
  padding: 5px 4px 15px 4px;
}

.modal__body {
  background: #010B25;
  text-align: center;
  padding: 10px;
  margin-top: 5px;
  max-width: 400px;
}

.modal__title {
  font-weight: 700;
  color: #437FC0;
  text-align: center;
}

.modal__body-content {
  color: white;
  font-size: 12px;
}

.modal__body-title {
  font-weight: 700;
  font-size: 19px;
  margin-bottom: 10px;
  margin-top: 15px;
}

.modal__close {
  position: absolute;
  top: 3px;
  right: 3px;
}

.modal__close-btn {
  cursor: pointer;
}
</style>