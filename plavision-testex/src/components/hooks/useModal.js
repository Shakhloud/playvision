import {ref} from 'vue';

export function useModal(config) {
    const isVisible = ref(false);
    const modalConfig = ref(config); // Данные конфигурации модального окна

    const show = (config) => {
        isVisible.value = true;
    };

    const hide = () => {
        isVisible.value = false;
    };

    return {
        isVisible,
        modalConfig,
        show,
        hide,
    };
}