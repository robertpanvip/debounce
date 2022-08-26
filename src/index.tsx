import * as React from "react"

interface FunctionComponent<P = {}> {
    (props: P, context?: any): React.ReactNode;

    defaultProps?: Partial<P>;
    displayName?: string;
}

type FunctionDebounceProps<P> = {
    [key in keyof P]: P[keyof P];
} & {
    delay?: number;
    is: FunctionComponent<P>;
};

type ClassDebounceProps<P> = {
    [key in keyof P]: P[keyof P];
} & {
    delay?: number;
    is: React.ComponentClass<P>;
};

type ReactHTMLDebounceProps<P extends React.HTMLAttributes<T>, T extends HTMLElement> = {
    [key in keyof P]?: P[keyof P];
} & {
    [key in keyof T]?: T[keyof T];
} & {
    delay?: number;
    is: keyof React.ReactHTML | string;
}

type SVGDebounceProps<P extends React.SVGAttributes<T>, T extends SVGElement> = {
    [key in keyof P]?: P[keyof P];
} & {
    [key in keyof T]?: T[keyof T];
} & {
    is: keyof React.ReactSVG | string;
}
type DebounceProps = {
    delay?: number;
    children: React.ReactElement
}

function debounce(fn: Function, delay: number | undefined) {
    let timer: NodeJS.Timer; // 声明计时器
    return function (...args: any[]) {
        // @ts-ignore
        const context = this;
        clearTimeout(timer!);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

function Debounce<P extends {}>(props: FunctionDebounceProps<P>): React.ReactElement<P>;
function Debounce<P extends {}, T extends HTMLElement>(props: ClassDebounceProps<P>): React.ReactElement<P>;
function Debounce<P extends React.HTMLAttributes<T>, T extends HTMLElement>(props: ReactHTMLDebounceProps<P, T>): React.ReactElement;
function Debounce<P extends React.SVGAttributes<T>, T extends SVGElement>(props: SVGDebounceProps<P, T>): React.ReactElement;

function Debounce(props: DebounceProps): React.ReactElement;


function Debounce({is, delay = 250, ...rest}: Record<string, any>) {
    if (is === undefined) {
        const children = rest.children;
        const callback = debounce(children.props.onClick, delay)
        return React.cloneElement(children, {
            ...children.props,
            onClick: (e: React.MouseEvent) => {
                if (children.props.onClick) {
                    return callback(e)
                }
            }
        })
    }
    const callback = debounce(rest.onClick, delay)
    return React.createElement(is, {
        ...rest,
        onClick: (e: React.MouseEvent) => {
            if (rest.onClick) {
                return callback(e)
            }
        }
    })
}

export default Debounce