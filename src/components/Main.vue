<script setup>
//Импорты
import {useModal} from "@/components/hooks/useModal";

//Создание модального окна при помощи hook: useModal
//Вся необходимая информация по поводу config расположена в папке public
//В файле config_values.txt

const modal = useModal({
  title: 'Название окна',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie iaculis arcu quis volutpat. Aenean quis est nec arcu vehicula aliquam sit amet nec purus. Donec blandit lobortis massa, mollis faucibus dui sagittis porttitor. Suspendisse sit amet suscipit felis. Phasellus nec mattis dui, id efficitur mi. ',
  close: false,
  timer: {
    seconds: 10,
    isTimer: true,
  },
  btns: [
    //Данные для проверки ситуации, когда кнопок несколько
    {
      id: 2,
      content: 'No',
      bgcolor: 'radial-gradient(ellipse at center, rgba(116,6,24,1) 0%, rgba(172,14,41,1) 100%)',
    },
    {
      id: 3,
      content: 'В поддержку',
      bgcolor: ' radial-gradient(ellipse at center, rgba(17,61,147,1) 0%, rgba(13,76,200,1) 100%)',
      icon: 'https://cdn.icon-icons.com/icons2/1392/PNG/512/consultant_96680.png', //подразумевается url иконки
      position_icon: 'start',
    },
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
    urlPhoto: 'https://dubna.ru/sites/default/files/articles/2022/07/26/18779.png',
    isTitlePhoto: true,
  },
  after_content_photo: {
    urlPhoto: 'https://img.freepik.com/premium-vector/3d-chips-dice-and-cards-for-poker-and-casino-on-the-podium-with-a-bright-neon-arch-in-blue-and-purple-on-a-light-background_851328-254.jpg',
    isAfterContentPhoto: true,
  },
})
</script>

<template>
  <button @click="modal.methods.show">Open</button>
  <my-modal
      v-if="modal.isVisible.value"
      :config="modal.modalConfig.value"
      :methods="modal.methods"
  ></my-modal>
</template>

<style scoped>

</style>