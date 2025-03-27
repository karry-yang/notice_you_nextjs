# slate 学习收获

- Slate 的设计原则是 "默认提供基础能力，同时完全开放自定义"，这一理念同时体现在 节点类型 和 渲染方式 上
  renderElement 支持自定的元素节点渲染 默认渲染是简单的 div h1 等独占一行的样式 渲染会处理 children 属性
  renderLeaf 支持的是叶子（文本样式）的渲染 默认是 span 样式 默认不处理 children 属性 children 设空
- Slate 将所有非文本节点（无论块级/行内）视为 Element 类型，统一由 renderElement 处理。
  需通过 element.type 区分处理逻辑
  结合 renderLeaf 实现完整的富文本渲染控制
- `使用`

  ```jsx
  const MyEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(initialValue);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      {/* 工具栏组件 */}
      <Toolbar />

      {/* 可编辑区域 */}
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="输入内容..."
        autoFocus
        onKeyDown={handleKeyDown}
        style={{ padding: '16px', border: '1px solid #eee' }}
      />
    </Slate>
  );
  };
  </Slate>
  ```

1. `<Slate> 组件属性`
   <!-- markdownlint-disable MD033 -->

| 属性名              | 类型                    | 必填 | 作用                                | 示例                                                        |
| :------------------ | :---------------------- | :--- | :---------------------------------- | :---------------------------------------------------------- |
| editor              | Editor                  | ✅   | 编辑器实例（需通过 withReact 包装） | editor={withReact(createEditor())}                          |
| value /initialValue | Node[]                  | ✅   | 编辑器内容（Slate 文档树）          | value={[{ type: 'paragraph', children: [{ text: 'Hi' }] }]} |
| onChange            | (value: Node[]) => void | ✅   | 内容变化回调（需更新 value）        | onChange={(newValue) => setValue(newValue)}                 |
| children            | React.ReactNode         | ✅   | 子组件（通常包含 <Editable>）       | <Slate>{...}</Slate>                                        |

2. `<Editable> 组件属性`

- 渲染控制
  <!-- markdownlint-disable MD033 -->=

  | 属性名            | 类型                                       | 作用示例                           |
  | :---------------- | :----------------------------------------- | :--------------------------------- |
  | renderElement     | (props: RenderElementProps) => JSX.Element | 自定义元素节点渲染（               |
  | renderLeaf        | (props: RenderLeafProps) => JSX.Element    | 自定义文本样式渲染（如加粗、斜体） |
  | renderPlaceholder | (props: { children: any }) => JSX.Element  | 自定义空内容占位符                 |

- 事件处理
     <!-- markdownlint-disable MD033 -->

  | 属性名    | 类型                                  | 作用 示例                                                                                        |
  | :-------- | :------------------------------------ | :----------------------------------------------------------------------------------------------- |
  | onKeyDown | (event: React.KeyboardEvent) => void  | 键盘事件拦截（如自定义快捷键） onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} |
  | onPaste   | (event: React.ClipboardEvent) => void | 粘贴事件处理（如解析 HTML/Markdown） onPaste={handlePaste}                                       |
  | onDrop    | (event: React.DragEvent) => void      | 拖放事件处理（如图片拖入） onDrop={handleFileDrop}                                               |

- 行为控制
     <!-- markdownlint-disable MD033 -->

  | 属性名      | 类型    | 作用 示例                                         |
  | :---------- | :------ | :------------------------------------------------ |
  | readOnly    | boolean | 设为只读模式（禁止编辑） readOnly={isPreviewMode} |
  | autoFocus   | boolean | 初始化时自动聚焦 autoFocus={true}                 |
  | placeholder | string  | 空内容时的提示文本 placeholder="输入内容..."      |
  | spellCheck  | boolean | 启用拼写检查 spellCheck={false}                   |

- 装饰与扩展
     <!-- markdownlint-disable MD033 -->
  | 属性名    | 类型                          | 作用 示例                                                                   |
  | :-------- | :---------------------------- | :-------------------------------------------------------------------------- |
  | decorate  | (entry: NodeEntry) => Range[] | 动态添加文本装饰（如搜索高亮） decorate={([node, path]) => highlightRanges} |
  | style     | React.CSSProperties           | 容器内联样式 style={{ minHeight: '200px', border: '1px solid #ddd' }}       |
  | className | string                        | 容器 CSS 类名 className="slate-editor"                                      |

-ps 为什么需要 children 节点
A：首先富文本开发需要层层嵌套的结构 children 属性可以确保结构嵌套
使用的时父子索引快速进行选取计算 children 属性可以快速定位节点的位置
统一结构 叶子节点 children 可以作为占位符

## slate 结构

-

## 了解 slate 的 Json 数据树

- 案列：
  ```json
  {
    "children": [
      {
        "type": "paragraph", // Path: [0]
        "children": [
          { "text": "Hello " }, // Path: [0, 0]
          { "text": "World", "bold": true } // Path: [0, 1]
        ]
      },
      {
        "type": "image", // Path: [1]
        "url": "...",
        "children": [{ "text": "" }] // Path: [1, 0]
      }
    ]
  }
  ```
- type 类型：type 是用于区分不同节点类型的字段，其取值完全由开发者自定义，但通常会遵循一些常见约定。区分大小写
  slate 允许使用自定义的业务类型 但是必须要有`chiledren`这个属性
- 块级元素（Block）
- <!-- markdownlint-disable MD033 -->
  | 类型名          | 用途       | 示例数据结构                                                                    |
  | :-------------- | :--------- | :------------------------------------------------------------------------------ |
  | `paragraph`     | 普通段落   | `{ type: 'paragraph', children: [{ text: '...' }] }`                            |
  | `heading-1`     | 一级标题   | `{ type: 'heading-1', children: [{ text: 'Title' }] }`                          |
  | `heading-2`     | 二级标题   | `{ type: 'heading-2', children: [{ text: 'Subtitle' }] }`                       |
  | `block-quote`   | 引用块     | `{ type: 'block-quote', children: [{ text: 'Quote...' }] }`                     |
  | `code-block`    | 代码块     | `{ type: 'code-block', language: 'js', children: [{ text: 'const x=1;' }] }`    |
  | `bulleted-list` | 无序列表   | `{ type: 'bulleted-list', children: [{ type: 'list-item', children: [...] }] }` |
  | `numbered-list` | 有序列表   | 同上，替换为 `type: 'numbered-list'`                                            |
  | `list-item`     | 列表项     | `{ type: 'list-item', children: [{ text: 'Item 1' }] }`                         |
  | `table`         | 表格       | `{ type: 'table', children: [/* 行节点 */] }`                                   |
  | `table-row`     | 表格行     | `{ type: 'table-row', children: [/* 单元格 */] }`                               |
  | `table-cell`    | 表格单元格 | `{ type: 'table-cell', children: [{ text: 'Data' }] }`                          |
  行内元素（Inline）
- <!-- markdownlint-disable MD033 -->
  | 类型名    | 用途   | 示例数据结构                                                             |
  | :-------- | :----- | :----------------------------------------------------------------------- |
  | `link`    | 超链接 | `{ type: 'link', url: 'https://xx.com', children: [{ text: 'Click' }] }` |
  | `image`   | 图片   | `{ type: 'image', url: 'a.jpg', children: [{ text: '' }] }`              |
  | `mention` | @提及  | `{ type: 'mention', user: { id: 1 }, children: [{ text: '@Alice' }] }`   |
  特殊类型
- <!-- markdownlint-disable MD033 -->

  | 类型名        | 用途             | 示例数据结构                                                            |
  | :------------ | :--------------- | :---------------------------------------------------------------------- |
  | `void`        | 不可编辑的空元素 | `{ type: 'image', url: 'a.jpg', children: [{ text: '' }], void: true }` |
  | `inline-math` | 数学公式         | `{ type: 'inline-math', formula: 'E=mc^2', children: [{ text: '' }] }`  |

  ## 自定义元素指南

  - 定义节点类型与数据结构 关键参数

```ts
type CustomElement =
  | { type: "paragraph"; children: CustomText[] } // 基础段落
  | { type: "image"; url: string; children: [EmptyText] } // 图片节点
  | { type: "tweet"; tweetId: string; children: [EmptyText] }; // 自定义推特嵌入

//基础要求：Slate 规定所有文本节点必须有 text 属性（即使是空字符串）。
//样式支持：通过可选属性（如 bold）声明文本支持的样式标记，确保类型安全。
//所有元素的 children 最终都会指向 CustomText（叶子节点）
type CustomText = { text: string; bold?: boolean }; // 文本样式

// 为什么需要？
//Slate 本身是用 TypeScript 编写的，其核心类型（如 Element 和 Text）默认是通用的。
//通过 declare module，我们可以 扩展 Slate 的类型系统，使其识别我们自定义的节点类型。
//底层原理
//TypeScript 的 模块增强（Module Augmentation） 特性，允许在不修改原始库代码的情况下，扩展第三方库的类型定义。
//如果不声明会怎样？
//使用自定义节点类型时，TypeScript 会报类型错误（如 Property 'url' does not exist on type 'Element'）。
declare module "slate" {
  interface CustomTypes {
    Element: CustomElement; // 注册自定义元素类型
    Text: CustomText; // 注册自定义文本属性
  }
}
```

- 实现节点渲染方法

```js
{
  attributes: any; // 必须注入到DOM元素的Slate属性
  children: ReactNode; // 子节点内容
  element: Element; // 当前节点数据（含自定义type和属性）
}
```

```jsx
const renderElement = ({ attributes, children, element }) => {
  switch (element.type) {
    case "image":
      return (
        <div {...attributes} contentEditable={false}>
          <img src={element.url} />
          {children} {/* Void 元素仍需保留 children */}
        </div>
      );
    case "tweet":
      return <TwitterEmbed {...attributes} tweetId={element.tweetId} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
```

- 注册节点行为（插件，可选）

  ```jsx
  const withImages = (editor: Editor) => {
    const { isVoid } = editor;

    editor.isVoid = (element) =>
      element.type === "image" ? true : isVoid(element); // 声明图片为 Void 元素

    editor.insertImage = (url) => {
      // 自定义插入方法
      Transforms.insertNodes(editor, {
        type: "image",
        url,
        children: [{ text: "" }],
      });
    };

    return editor;
  };
  // 使用插件
  const editor = withImages(withReact(createEditor()));
  ```

## 参数讲解

- attributes 每个节点经过 slate 动态计算出来的参数集 `是由辑器内部状态变更驱动的`
- attributes 的数据来源
  <!-- markdownlint-disable MD033 -->

  | 数据类别     | 来源                                       | 示例                                                                     |
  | :----------- | :----------------------------------------- | :----------------------------------------------------------------------- |
  | 节点类型标识 | Slate 根据节点类型自动生成                 | data-slate-node="element"（元素节点） data-slate-leaf="true"（文本节点） |
  | 选区状态     | 根据当前 editor.selection 动态计算         | data-slate-selected="true"（当节点被选中时）                             |
  | 内部唯一标识 | Slate 在渲染时分配的节点唯一 ID            | data-key="a1b2c3"                                                        |
  | 可编辑性控制 | 由节点类型（如 Void 元素）或编辑器状态决定 | contenteditable="false"（图片节点）                                      |
  | 文本方向     | 继承自编辑器全局设置或节点特定配置         | dir="rtl"（从右向左排版）                                                |

    <!-- markdownlint-disable MD033 -->

  属性变化的驱动来源
  | 触发场景 | 驱动逻辑 | 影响的 attributes 属性示例 |
  | :------------- | :---------------------------------------------- | :------------------------------------ |
  | 文档内容修改 | 插入/删除节点时，路径变化导致 data-key 重新分配 | data-key |
  | 选区变化 | 光标移动或文本选中时，重新计算节点选中状态 | data-slate-selected, data-slate-focus |
  | 编辑器配置变更 | 修改 editor.dir 或 editor.isVoid 等全局设置 | dir, contenteditable |
  | 插件干预 | 插件覆盖 editor.isInline 或 editor.isVoid 方法 | data-slate-inline, data-slate-void |

  | 概念     | 用途                         | 必须属性       | 示例                                        |
  | :------- | :--------------------------- | :------------- | ------------------------------------------- |
  | element  | 构建块级结构（段落、列表等） | type, children | { type: 'paragraph', children: [...] }      |
  | children | 定义节点的子元素列表         | 始终是数组     | [{ text: 'Hello' }, { type: 'image', ... }] |
  | text     | 叶子节点（文本内容）         | text           | { text: 'Hello', bold: true }               |
