
📦 **Installation**
``` javascript
npm install @components-plus/debounce
```
🔨 **Usage**

```
function App() {
    return (
        <div>
            <Debounce>
                <button
                    onClick={() => {
                        console.log("点击了")
                    }}
                >
                    点击
                </button>
            </Debounce>
        </div>
    )
}
```
see demo

**🔨 API**

| name  | type                                                                    | description | defaultValue           | required |
| :---- |:------------------------------------------------------------------------|-------------|------------------------|----------|
| delay | number                                                                  | 延迟时间        | 250                    | false    |
| is    | FunctionComponent&lt;P> ComponentClass&lt;P> keyof ReactHTML<br> string |             |              | false    |

