# react 新体会

没有传统意义上的"实例"
react 函数式组件的设计摒弃了类组件需要在构造函数中显示的绑定 this 和方法，并且没有设计 this（闭包特性替代 this）,
设计 hooks 去管理生命周期和状态
采用闭包的方式去调用方法、状态，内部方法利用闭包保存词法环境的方式去访问参数，
React 维护着一个"虚拟 DOM 树"，每个组件对应一个"fiber 节点"所有状态都存储在 Fiber 节点中
函数式组件本质上还是函数有 this 的，但是在设计的时候摒弃了 因为方法调用 参数保存都使用闭包的特性实现了 避免了 this 的繁琐和一些误区的可能

## 基础

### 生命周期(`挂载 更新 卸载`)

生命周期对应关系

- <!-- markdownlint-disable MD033 -->
  | 类组件生命周期           | 函数式组件实现方式                |
  | :----------------------- | :-------------------------------- |
  | constructor              | useState 初始化状态               |
  | componentDidMount        | useEffect 空依赖数组              |
  | componentDidUpdate       | useEffect 带依赖数组              |
  | componentWillUnmount     | useEffect 的清理函数              |
  | shouldComponentUpdate    | React.memo + useMemo/useCallback  |
  | getDerivedStateFromProps | useState + useEffect 监听 props   |
  | getSnapshotBeforeUpdate  | 目前没有直接对应，可通过 ref 模拟 |

### 闭包

- 概念：闭包是指有权访问另一个函数作用域中变量的函数，即使这个函数是在其外部被调用。简单说，闭包让函数可以"记住"并访问它被创建时的词法作用域，即使这个函数在其词法作用域之外执行。
- `闭包会记住词法环境`----(环境记录(Environment Record)：存储当前作用域内的变量和函数声明;对外部词法环境的引用(outer)：指向父级作用域)
  当内部函数(inner)引用了外部函数(outer)的变量时：
  JavaScript 引擎会标记这些被引用的变量为"被闭包引用"
  这些变量会被提升到堆内存(Heap)中特殊区域存储
  即使外部函数执行完毕，只要内部函数还存在引用，这些变量就不会被回收
  当函数被调用时，JavaScript 引擎会：创建一个新的执行上下文(Execution Context)、新的词法环境(Lexical Environment) 这个新环境会记录：当前函数的局部变量+对定义时所在作用域(outer)的引用，这样多个函数的实列就会有多套基于初始环境和变量的环境 ，等于多个独立的位面 互不影响
- `JavaScript 使用标记-清除垃圾回收算法`：
  从根对象(全局变量等)开始标记所有可达对
  清除所有未被标记的对象
  只要闭包函数还在被引用，它引用的整个作用域链都会被视为"可达"，无引用时会被回收

- 函数式组件：没有 this 的设计，

### react 重新渲染为什么能保存状态?

- React 能够保存状态的核心机制是 Fiber 架构 + 闭包 + Hook 链表三者的协同工作
- Fiber 架构的关键作用 ：
  状态实际保存在 Fiber 节点中
  渲染阶段：遍历 Fiber 树，执行组件函数生成 Virtual DOM
  提交阶段：将变化应用到真实 DOM
  双缓存机制：维护 current（当前）和 workInProgress（新）两棵树
- 流程：`组件函数执行（闭包环境创建setState 函数引用+fiber节点创建保存-当前 state 值 + 更新队列）-->函数方法从闭包环境读取从 Fiber.memoizedState 获取的状态去创建闭包--->产生新的状态--->更新 fiber 状态列表()`
  写路径：闭包 → Fiber 队列 → 重新渲染
  用户操作触发闭包内的 setState
  更新被写入 Fiber 的 updateQueue
  调度新渲染
  读路径：Fiber.memoizedState → 新闭包
  新渲染从 Fiber 读取最新状态
  创建包含新值的新闭包
  ps 闭包一直在组件销毁之前都不会改变 是 setsate 的引用保存
