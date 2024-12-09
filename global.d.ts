export {};

declare global {
  interface Window {
    authFirebase: ReturnType<typeof getAuth>;
  }
}
