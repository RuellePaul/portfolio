export function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function relativeProgress(progress: number, start: number, end: number) {
    return clamp((progress - start) / (end - start), 0, 1);
}
