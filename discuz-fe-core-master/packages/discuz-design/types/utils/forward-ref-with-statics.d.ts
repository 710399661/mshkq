import { RefAttributes } from 'react';
export declare function forwardRefWithStatics<P, T = any, S = Record<string, unknown>>(component: React.RefForwardingComponent<T, P>, statics?: S): React.FunctionComponent<P & RefAttributes<T>> & S;
