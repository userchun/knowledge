# setState什么时候是同步、什么时候是异步

setState的同步异步特性取决于执行上下文

1. 同步

- 在setTimeout/setInterval等宏任务中调用setState
- 在原生DOM事件处理函数中调用setState
- Promise等异步回调函数中调用setState

2. 异步

- 在React合成事件中调用setState
- 在React的生命周期内调用setState
- 自定义Hooks中调用setState

## 扩展知识

1. React引入了批量更新的机制，即当多个setState被调用时，React会将它们合并成一个批量更新，从而减少不必要的Dom操作。这种批量更新的机制可以提高性能，避免频繁的Dom操作。

2. React的批量更新机制是基于事件循环的机制实现的。当React检测到有多个setState被调用时，它会将这些setState放入一个队列中，然后在下一个事件循环中，React会一次性处理这些setState，从而实现批量更新。

3. React的批量更新机制可以提高性能，避免频繁的Dom操作。但是，在某些情况下，我们可能需要立即获取到最新的状态。为了实现这种需求，React提供了一个flushSync方法，它可以强制React立即更新组件。

## 相关文档

- State更新机制: [State更新机制](https://zh-hans.react.dev/learn/state-as-a-snapshot)
- 批处理: [批处理](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)
- flushSync : [flushSync](https://zh-hans.react.dev/reference/react-dom/flushSync)
