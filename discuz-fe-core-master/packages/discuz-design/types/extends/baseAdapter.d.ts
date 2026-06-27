declare class BaseAdapter {
    init(): {};
    defaultAdapter(): {};
    adapterImplement(): void;
}
export declare const baseAdapterFactory: ({ defaultAdapter, adapterImplement }: {
    defaultAdapter: any;
    adapterImplement: any;
}) => {
    new (): {
        defaultAdapter(): any;
        adapterImplement(): any;
        init(): {};
    };
};
export default BaseAdapter;
