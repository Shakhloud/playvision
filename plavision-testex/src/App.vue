<script>
import {useModal} from '@/components/hooks/useModal';
import MyModal from "@/components/UI/MyModal.vue";

export default {
  components: {MyModal},
  setup(props) {
    const modal = useModal({
      title: 'Название окна',
      body_title: {
        content: 'Заголовок',
        color: 'green',
      },
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie iaculis arcu quis volutpat. Aenean quis est nec arcu vehicula aliquam sit amet nec purus. Donec blandit lobortis massa, mollis faucibus dui sagittis porttitor. Suspendisse sit amet suscipit felis. Phasellus nec mattis dui, id efficitur mi. ',
      close: true,
      timer: {
        seconds: 10,
        isTimer: false,
      },
      btns: [
        /*{
          id: 2,
          content: 'No',
          bgcolor: 'radial-gradient(ellipse at center, rgba(116,6,24,1) 0%, rgba(172,14,41,1) 100%)',
        },
        {
          id: 3,
          content: 'В поддержку',
          bgcolor: ' radial-gradient(ellipse at center, rgba(17,61,147,1) 0%, rgba(13,76,200,1) 100%)',
          icon: 'https://cdn.icon-icons.com/icons2/1392/PNG/512/consultant_96680.png', //подразумевается url иконки
          position_icon: 'start', //defaultValue = start
        },*/
        {
          id: 1,
          content: 'Далее',
          bgcolor: 'radial-gradient(ellipse at center, rgba(0,116,9,1) 0%, rgba(1,189,17,1) 100%)',
        },
      ],
      form: {
        type: 'email',
        isForm: true,
      },
      title_photo: {
        urlPhoto: 'Url вашей фотографии',
        isTitlePhoto: true,
      },
      after_content_photo: {
        urlPhoto: 'Url вашей фотографии',
        isAfterContentPhoto: true,
      }
    });
    return {
      modal,
    };
  },
  methods: {
    endHandler() {
      console.log('end');
    }
  }
}
</script>

<template>
  <button @click="modal.show">Open</button>
  <my-modal
      v-if="modal.isVisible.value"
      :config="modal.modalConfig.value"
      :hide="modal.hide"
  ></my-modal>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@300;400&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Karla', sans-serif;
}
</style>
