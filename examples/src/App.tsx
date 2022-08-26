import * as React from "react";
import Debounce from "../../src"

function Test(props: { a: number, children: React.ReactNode }) {
    return 1
}

class ClassTest extends React.Component<{ a: number, children: React.ReactNode }> {
    render() {
        return <div>123</div>
    }
}

export default function App() {
    return (
        <div>
            <Debounce>
                <button
                    onClick={() => {
                        console.log(1111)
                    }}
                >
                    点击
                </button>
            </Debounce>
        </div>
    )
}