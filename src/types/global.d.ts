export {};

declare global {
    interface Window {
        lenis?: import("lenis").default;
    }
}