import {computed, ref} from 'vue';

export function useModal(config) {
    //Инициализация переменных
    const isVisible = ref(false);
    const modalConfig = ref(config); // Данные конфигурации модального окна

    //Methods
    const show = (config) => {
        isVisible.value = true;
    };
    const hide = () => {
        isVisible.value = false;
    };

    return {
        isVisible,
        modalConfig,
        methods: {
            hide,
            show,
        }
    };
}