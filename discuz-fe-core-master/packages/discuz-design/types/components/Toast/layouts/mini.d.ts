/// <reference types="react" />
import { ToastProps } from '../interface';
interface ToastMiniProps extends ToastProps {
    visible?: boolean;
}
declare function Toast(props: ToastMiniProps): JSX.Element;
declare namespace Toast {
    var info: ({ content, duration, hasMask, onClose, position, className, style, }: ToastProps) => boolean;
    var success: ({ content, duration, hasMask, onClose, position, className, style, }: ToastProps) => boolean;
    var warning: ({ content, duration, hasMask, onClose, position, className, style, }: ToastProps) => boolean;
    var error: ({ content, duration, hasMask, onClose, position, className, style, }: ToastProps) => boolean;
    var loading: ({ content, duration, hasMask, onClose, position, className, style, }: ToastProps) => boolean;
    var hide: () => boolean;
}
export declare const MiniLayout: () => typeof Toast;
export {};
