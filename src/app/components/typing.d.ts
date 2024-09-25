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
    title: string;
    content?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    visible: boolean;
    yesText?: string;
    noText?: string;
  }
}

declare namespace Modify {
  interface ModifyProps {
    title: string;
    content: string;
    onCancel?: () => void;
    onConfirm?: (value: string) => void;
    visible: boolean;
    yesText?: string;
    noText?: string;
  }
}
declare namespace DropDown {
  interface DropdownItem {
    label: string;
    value: string;
  }
  
  interface DropdownMenuProps {
    children: React.ReactNode;
    callback: (item: DropdownItem) => void;
    items: DropdownItem[];
    width?: string;
    position?: "top" | "bottom";
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
