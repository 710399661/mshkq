import { useMemo, useState } from "react";

export function usePopoverAnimation(
  parentSetState: (v: boolean) => void,
  delay: number = 300
): [boolean, (v: boolean) => void, () => void] {
  const [state, setState] = useState(true);
  const [innerClose, unMount] = useMemo(() => {
    let timer: number;

    let innerClose = (v: boolean) => {
      setState(v);
      timer = window.setTimeout(() => {
        parentSetState(v);
        setState(true);
      }, delay);
    };
    let unMount = () => clearTimeout(timer);

    return [innerClose, unMount];
  }, [state, setState, parentSetState, delay]);

  return [state, innerClose, unMount];
}
