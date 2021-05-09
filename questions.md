**1 What is the difference between Component and PureComponent? give an example where it might break my app.**
Pure component has just predefined lifecycle function componentShouldUpdate
Inside Pure component, in lifecycle function componentShouldUpdate react check if props or state changed (no deep changes)
Problem: when you have for ex. array or object in props and change object field or array el react will not render
You need to change the whole object or array to rerender it

**2 Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**
You can achieve infinite render. 
ShouldComponentUpdate set something into context-> context changed -> render parent and children elements => ShouldComponentUpdate set something in context...

**3 Describe 3 ways to pass information from a component to its PARENT.**
- context. cover with contextProvider parent component. In any child component set context data and read it in parent
- set callback into props and call it inside child component
- parent subscribe to global Event. child emit to this Event

**4 Give 2 ways to prevent components from re-rendering.**
- describe function componentShouldUpdate
- use PureComponent

**5 What is a fragment and why do we need it? Give an example where it might break my app.**

**6 Give 3 examples of the HOC pattern.**
- High Order Component very useful when you connect redux things to the container component `connect()`
- `withStyles(Component)`
- any Wrapper of component

**7 what's the difference in handling exceptions in promises, callbacks, and async...await.**
- promises. You need to use catch `.catch(e=>..)`
- callbacks. You need to check if an error exists - do something `if (error)`
- async await. You need to cover you await with `try{ }catch(e){}`

**8 How many arguments do setState take and why is it async.**
- You can pass an object into first argument `setState({...})`
- You can pass function into first argument `setState((state,props)=>{})`
- And also you can use callback as second argument  `setState({...},()=>{})`
  setState async because it calls asynchronous flow by updating state. It should be async to prevent stuck ui if you have a lot of setStates at the same time

**9 List the steps needed to migrate a Class to Function Component.**
- replace with function
- migrate all functions to hooks
- check and write correct hooks for lifecycle functions

**10 List a few ways styles can be used with components.**
- plain object styles (not recommended)
- css class as className props
- withStyles hoc
- styled components

**11 How to render an HTML string coming from the server.**
- dangerouslySetInnerHTML (not recommended)
- you can use an external html parser or write your own which convert html to react components
- if u need just show string. replace all `<` and `>` with another text symbols (&lt, &rt)
