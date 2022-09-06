export interface Section {
    start: number;
    end: number;
}

export interface Progress {
    sectionProgress: number;
    overallProgress: number;
    currentSection: number;
    scrollY: number;
    start: number;
    end: number;
}
