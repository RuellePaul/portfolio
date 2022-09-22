import React, {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from 'react';
import {Path} from 'src/components/Universe/utils/FlightPath';

export interface Section {
    height: number;
    paths: Path[];
}

export interface SectionsContextValue {
    sections: Section[];
    setSections: Dispatch<SetStateAction<Section[]>>;
}

interface SectionsProviderProps {
    children?: ReactNode;
}

export const SectionsContext = createContext<SectionsContextValue>({
    sections: [],
    setSections: () => {}
});

export const SectionsProvider: FC<SectionsProviderProps> = ({children}) => {
    const [sections, setSections] = useState<Section[]>([]);

    return (
        <SectionsContext.Provider
            value={{
                sections: sections,
                setSections: setSections
            }}
        >
            {children}
        </SectionsContext.Provider>
    );
};

export const SectionsConsumer = SectionsContext.Consumer;

export const useSections = (): SectionsContextValue => useContext(SectionsContext);