<script>
import {ref, computed} from 'vue';

export default {
  name: 'my-modal',
  props: {
    config: Object,
    hide: Function,
  },
  data() {
    return {
      placeholder: null,
    }
  },
  methods: {
    endHandler() {
      this.hide();
    },
    hideHandler() {
      if (this.config?.timer?.isTimer === false) {
        this.hide();
      }
    },
    placeholderInit() {
      if (this.config?.form?.type === 'email') {
        this.placeholder = 'example@email.com'
      }
      if (this.config?.form?.type === 'text') {
        this.placeholder = 'Введите запрошенные данные'
      }
      if (this.config?.form?.type === 'password') {
        this.placeholder = 'Введите пароль'
      }
    }
  },
  mounted() {
    this.placeholderInit();
  },
  setup(props) {
    const form__input = ref({
      isValid: false,
      message: '',
      content: '',
    });
    const startValidation = ref(false);

    const isNotRequired = computed(() => {
      if (startValidation.value) {
        if (form__input.value.content === null || form__input.value.content === undefined || form__input.value.content === '') {
          form__input.value.message = 'Обязательное поле'
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
        props.hide();
        //Код отправки данных на сервер
      }
    }

    return {
      form__input,
      isNotRequired,
      submitHandler,
      startValidation,
    }
  }
}
</script>

<template>
  <div>{{ isNotRequired }}</div>
  <div class="modal" @click.stop="hideHandler">
    <div @click.stop class="modal__content">
      <p class="modal__title">
        {{ config?.title }}
      </p>
      <div v-if="config?.close && !config?.timer?.isTimer" class="modal__close modal__close-btn" @click="hide">
        <i class="gg-close"></i>
      </div>
      <div v-if="config?.timer?.isTimer" class="modal__close">
        <my-timer
            :time="config?.timer?.seconds"
            :end-handler="endHandler"
        />
      </div>
      <div class="modal__body">
        <div v-show="config?.title_photo?.isTitlePhoto === true">
          <img class='title__photo' :src="config?.title_photo?.urlPhoto">
        </div>
        <div :style="{
          color: config?.body_title?.color
        }" class="modal__body-title">
          {{ config?.body_title?.content }}
        </div>
        <div class="modal__body-content">
          {{ config?.body }}
        </div>
        <div v-show="config?.after_content_photo?.isAfterContentPhoto === true">
          <img class='after-content-photo' :src="config?.after_content_photo?.urlPhoto">
        </div>
        <div v-if="config?.form?.isForm" class="modal__form-wrapper">
          <input class="modal__form" v-model='form__input.content' :type="config?.form?.type" :placeholder="placeholder"
                 :class="{ invalid: isNotRequired === false}" @focus="startValidation = true">
          <span v-show="isNotRequired === false" class="modal__form-error">{{ form__input.message }}</span>
        </div>
      </div>
      <div class="btns__wrapper">
        <div v-for="btn in config?.btns" :key="btn.id">

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