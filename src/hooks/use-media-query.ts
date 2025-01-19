import { ref, watchEffect, type MaybeRefOrGetter, toValue } from "vue";

export function useMediaQuery(query: MaybeRefOrGetter<string>) {
  const value = ref(false);

  watchEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      value.value = event.matches;
    };

    const result = matchMedia(toValue(query));
    result.addEventListener("change", onChange);
    value.value = result.matches;

    return () => result.removeEventListener("change", onChange);
  });

  return value;
}
