import { useEffect } from "react";

// Define types for the handler and element
type TargetElement = HTMLElement | Window;

function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: TargetElement = window,
  deps: any[] = []
) {
  useEffect(() => {
    // Ensure element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // Add event listener, casting handler to EventListener
    const eventListener: EventListener = (event) =>
      handler(event as WindowEventMap[K]);

    element.addEventListener(eventName, eventListener);

    // Clean up event listener on unmount
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, handler, element, ...deps]); // Re-run if eventName or handler changes
}

export default useEventListener;
