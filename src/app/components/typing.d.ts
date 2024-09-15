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

declare namespace DropDown {
  interface DropdownItem {
    label: string;
  }
  
  interface DropdownMenuProps {
    buttonText: string;
    callback: (item: DropdownItem) => void;
    items: DropdownItem[];
    width?: string;
  }
}

declare namespace HintText {
  interface HintTextProps {
    children: React.ReactNode;
    className?: string;
    hintText: string;
    more?: number;
    position?: "top" | "bottom";
  }
}
