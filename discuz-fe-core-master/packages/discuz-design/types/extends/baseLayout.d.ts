declare class BaseLayout {
    init(): {
        component: any;
    };
    defaultLayout(): any;
    layoutImplement(): any;
}
export declare const baseLayoutFactory: ({ layoutImplement }: {
    layoutImplement: any;
}) => {
    new (): {
        layoutImplement(): any;
        init(): {
            component: any;
        };
        defaultLayout(): any;
    };
};
export default BaseLayout;
