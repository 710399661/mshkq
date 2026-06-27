export function createCallbackManager(): {
    add: (opt: Function | {
        callback: Function;
        ctx: any;
    }) => void;
    remove: (opt: Function | {
        callback: Function;
        ctx: any;
    }) => void;
    count: () => number;
    trigger: (...args: any[]) => void;
};
