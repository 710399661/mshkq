import {getMarkdown} from "./getMarkdown";

export const getHTML = (vditor: IVditor) => {
    if (vditor.currentMode === "sv") {
        return vditor.lute.Md2HTML(getMarkdown(vditor));
    } else if (vditor.currentMode === "wysiwyg") {
      // 解决多个空格导致转义成代码块的问题
      const html = vditor.wysiwyg.element.innerHTML.replace(/\u200b/g, '&nbsp;');
      return vditor.lute.VditorDOM2HTML(html);
    } else if (vditor.currentMode === "ir") {
        return vditor.lute.VditorIRDOM2HTML(vditor.ir.element.innerHTML);
    }
};
