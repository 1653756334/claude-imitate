declare namespace Slider {
  interface SlideServerProps {
    lang: Global.SupportedLang;
  }
  interface SlideProps {
    t: Global.Dictionary;
  }
  interface HistoryData {
    id: string;
    title: string;
  }
}

declare namespace Comfirm {
  interface ComfirmProps {
    t: Global.Dictionary;
    title: string;
    content?: string;
    onCancel?: () => void;
    onConfirm: () => void;
    visible: boolean;
  }
}
