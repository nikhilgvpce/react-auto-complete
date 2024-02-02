1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

Ans: In general, a Component in React accepts props from its Parent and use those props to do some operations or validations to render output conditoinally. 

There is concept of "state" that a Component can maintain but it is local or specific to that Component. Either the change in props or state makes a Component re-render and also when a prop or state in Parent Compoent changes then Parent Component re-renders and this makes all the Children components present in that Parent component re-render irrespective whether the child components use the parent props or not.

Thus to prevent this issue of re-rendering of Children components we make use of PureComponents. Components that extend PureComponent, implement shouldComponentUpdate, and re-render only when the shallow comparison of prevProps and nextProps is false and re-render is skipped when the shallow comparison is true.

A function or Component is said to be "Pure" if it doesnt interfer with or modify outside contents and for the same inputs it should return the same outputs when called any number of times.

If the PureComponent is implemented unintentionally by the Child component and then Parent component expects an updated value from the call back of Child component then there will be outdated or stale data inside the Parent component.

An example where it might break an app is since Pure components implement shouldComponentUpdate, which does the shallow comparision of nextProps, nextState. If either of nextProps or nextState is a non-primitive then the shallow comparision would always return false and may cause infinite rendering resulting in breaking of application.


1. Context + ShouldComponentUpdate might be dangerous. Why is that?

Ans: When a component, which might be child to a Parent Component, is deeply nested down and there is a need to pass in a prop that should be consumed only by few of such couple of Children components that can achieved by :
  a. Pass the prop to every child of the parent component till it reachees the desired component and this creates an issue called "Prop Drilling"
  b. Create a context that acts a Provider of the prop to the Child component and enclose the Children with this Context Provider. Now, only those Child components that need that prop can Consume the prop value which is passed as a Context value. This avoids unnecessary passage of props across all the child components.

  While using Context helps in preventing Prop Drilling, the Consumers of the context value re-render everytime the Context value change even if they are Pure components, ie., the context values by-pass the ShouldComponentUpdate check. This is why context + ShouldComponent might be dangerous. And if the context value is a complex data structure or non-primitive like objects, arrays or functions which are recreated (thus changing their reference for every render and object.is() comparision fails) even if values in them don't change cause the rerender.

  So it is better to lift the state up inside the Parent component where the Context Provider  and value are created in.

  1. Describe 3 ways to pass information from a component to its PARENT.

  Ans: Below are the ways to pass information from a component to its PARENT:

  (a): Pass a callback function from Parent to Child and call that callback fuction in child which a value that we want to pass to Parent component

  (b): Use of global state manager like Redux where every component can be connected to a gloabl store that stores the state of entire application. A Child component can dispatch an action using "useDispatch" that inturn calls the reducer with the action type and payload to set or modify a state variable inside the store. Now, parent component can access the state using "useSelector" and then access the required state from it.

  (c): Using Context API where we can pass a callback function or update function along with the context value to the "value" prop of Provider and now Child components consuming the context can call that callback as (context.callback("someValue")) which eventually call the function that can modify or set a value in Parent Context.

  4. Give 2 ways to prevent components from re-rendering.

  Ans: Re-rendering of Components can be prevented by following ways:

  (a): Prevent unneccesary setting of states and maintain state for only those varaibles that are meant to be shown on the UI, otherwise we can make use of refs which can still store the changes but donot cause the re-render. Also pass only necessary props from Parent to Child components, as change in one of the props could also trigger the render even if Child components dont use it . If an application uses the Context API prevent complex values being passed to Consumer components and prevent frequent updates to the context value. Prevent the usage of Context API as an alternative to a state management library. Context API will bypass the shouldComponent checks and renders all the components that consume the context.

  (b): Make use of depencies array in the hooks provided by React. useEffect, useMemo, useCallback are the hooks help in prevent in the unnecessary component re-rendering. There is ceveat of using arrays, objects, functions as dependencies of these hooks, as they are recreated every tmime component renders and change their reference and these hooks make use of Object.is() comparision whether to render or not.

  (c): Create the state or make the state updates as low as possible in the component tree because when the Parent component renders all the Child components will be rendered and this can be prevented by wrapping the functional components with useMemo or useCallBack with empty depencies making them to be created only once and wont be called if their Parent Component rerender. Remove expensive calculations and business logic as much as possible and make the components presentational.

  1. What is a fragment and why do we need it? Give an example where it might break my app.

  Ans: React allows only one element to be returned from a component at a time. There can be instances where a component needs to return multiple sibling components without a need of Parent component. React Fragments provide a way to group or wrap multiple sibling components into one without need of creating or adding an extra unnecessary parent or node to the DOM. This React.Fragment (or <></>) doesn't create an extra html tag but acts a wrapper to multiple sibling components.

  When <></> is used we wont be able to provide them keys if we try to map an array inside return of a component and keys are a way react uses to detect whenther there is a change in the component and should it re-render it or not.

 Eg: const Component () => {
    
    const cars = ['ford', 'ferrari', 'toyota', 'nissan']

    return (
        cars.map((car) => {
            <>
                <p>{car}</p>
            </>
        })
    )
 }

 In the above example when fragment is used and keys are not provided and there is a deletion in array it is hard for react to identitfy which element is deleted and there could be chance of breakage in the app when the array is quite large and subject to change quite frequently like in the case of ecommerce app where there can be millions of items in the display array and based on the user behaviour we might want to remove some items and replace them with the other.

 6. Give 3 examples of the HOC pattern.

 Ans: Higher order components are those which can accept components as their prop. Below are the examples of the HOC pattern:

 (a): When multiple components needs to be passed to another component and need to be implemented generically we can make use of the HOC pattern as below 

 Ex: const Header = () => {
    return (
        <>
            <h4> Welcome to my e-cart! </h1>
            <p>Buy, Sell anything</p>
            <p>Get items at your finger tips</p>
        </>
    )

    const Layout = ({children}) => {
        return (
            <div>
                {children}
                <Left/>
                <Right/>
            </div>
        )
    }

    const App = () => {
        return (
            <Layout>
                <Header/>
                <PaymentInfo/>
                <UserAnalytics>
            </Layout>
        )
    }
 }

 In the above example, Layout follows HOC pattern as it accepts components, so it can not only render Header component but also other components like PaymentInfo, UserAnalytics.

 (b): The "connect" in react-redux library also follows HOC pattern as it accepts a Component
 as an input and passes in the updated props from parent, state from the store.

 (c): The Styled component library also follows HOC pattern where in the ThemeProvider, passes the theme prop to all its children inside it by creating a context which is achieved by following this HOC pattern.

(d): the component withRouter in react-router (version 5) is a higher component and takes in a component and passes the location, history data as props to it.

7. What's the difference in handling exceptions in promises, callbacks and async…await?

Ans: callbacks, promises and asyn&await are used to deal with the asynchronous code in Javascript. Callbacks are used to enable the asynchronous behaviour and try catch blocks can be used to handle the execeptions

Ex: function getCartInfo(paymentInfo, cb) {
    const cartItems = {
        [
            itemId: 'd44fiui90a3',
            price: '$45'
        ],
        [
            itemId: 'i90dhuf89ae',
            price: '$15'
        ]
    }
    if(!paymentInfo) throw new Error('payment info not found')
    cb(paymentInfo, cartItems);
}

function getPaymentInfo() {
    const paymentInfo = {
        [
            payment_info: 'credit card',
            address: 'San Jose, California
        ]
    }
    return paymentInfo;
}

function purchaseItemsInCart(() => {
        getCartInfo(getPaymentInfo(), makePayment);
})

function makePayment (cartItems, paymentInfo) => {
    //// some code here...
}

try {
    purchaseItemsInCart()
}
catch(err) {
    console.error('function call failed due to', err)
}

Promises make use of catch and fianlly block
    let response = null;
    fetch(url)
    .then((res) => res.json()) // if error thrown here then catch block will be executed
    .then((res) => response = res) // will be skipped if an error is throw in above then block
    .catch(err => {
        console.log(err) // will be executed if json parse is failed
    }).finally {
        console.log('fetch completed') // will be excuted irrespective fetch success / failure.
    }

async function callAPI(url, method, body) {
    let res = '';
    if(method === 'POST') {
        res = await fetch(url, {
            method: method,
            body: JSON.stringify(body)
        })
    } else {
        res = await fetch(url);
    }
    res = await res.json();
    return res;
}

try {
    const postCall = await callAPI('https://gmaps.apis.com', 'POST', {long: 11.21.21});
} catch(err) {
    console.error('api failed due to', err)
}

8. How many arguments does setState take and why is it async.

Ans: setState takes 2 arguments:
 1. nextState: this can be a value (primitive or non-primitive) or a function
    1. when passed a function it as an updater function that takes existing state, props as arguments, and shallowly merges the returned object with the current state.
    2. when passed a object, it will be shallowly merged to current state
 2. an `optional` callback which will be called after the state update is commited

setState is async because React queues all the state update calls and these states are commited to DOM at a time. If there are mutliple setState calls sequentially in each component then updating the DOM immediately with the each call of setState will be costly and will hinder the page the rendering performance. That is the reason React batches the setDtate calls and won't call them as and when setState is called.

9. List the steps needed to migrate a Class to Function Component.

Ans: To convert a Class component to a functional component we need to check for life cycle methods and state method used  and use respective hooks for functional components. Below is the way for converting life cycle methods to hooks:

(a)componentDidMount() {} --> called after a component mounts in mount phase and runs only once.

Below is the respective hook to be used to achieve the same in an functional component.

```
useEffect(() => {

}, [])
```

(b): componentDidUpdate() {} --> called when a component gets updated in update phase

Below is the respective hook to be used to achieve the same in an functional component. 
The call back function is run for every change in deps array.

```
useEffect(() => {
    // runs only when atleast one of dependencies change.
}, [deps])
```
```
useEffect(() => {
// this will run for every render
}) 
```
(c): componentWillUnmount() {} --> called when a component gets unmounted in unmount phase.

Below is the respective hook to be used to achieve the same in an functional component. 

```
useEffect(() => {
    return () => {
        // this is run during component unmount
    }
}, [])
```
(d): Identify areas where "this" keyword is used and convert them to variables and make use of arrow functions in the functional components to lexically resolve their context. Also remove this for event handlers and convert them to methods or functions without this keyword.

(e): If a class component has more than 3 state variables use "useReducer" to manage the state
so that it clears the code clutter and we can dispatch the actions for state updates

(f): To convert a Pure Class component to Functional component, wrap the component inside React.memo to achieve the same.

10. List a few ways styles can be used with components.

Ans: We can style a component using below ways

(a): import css file into the component file and use classNames, html tags, selectors, ids

to style the components

```
import "./Home.css"
// Details.jsx
const Details = () => {
    return (
        <details className='details'>
            <summary className='summary'>This is summary </summary>
            <p>Buy now and pay later without credit limitations</p>
        </details>
    )
}
```

```
// Home.css

.details {
    width: 10vw;
    color: grey
}

.summary {
    font-family: Sans-Serif
    font-size: 12px;
}

p {
    color: gold;
    font-size: 14px;
}
```

(b): We can use CSS-in-JS styled-components.

```
const Button = styled.button`
    background-color: skyblue;
    width: 10vw;
    padding: 16px;
`
```

(c) We can use inline styling where we can directly pass styles to components

```
const Input = () => {
    return (
        <input style={{color: 'red', padding: '16px', width: '10vw'}}>
    )
}
```

11. How to render an HTML string coming from the server.

Ans: React provides a property `dangerouslySetInnerHTML` to pass in the html tags 


```
const Component = (htmlString) => {
    return (
        <div dangerouslySetInnerHTML={{__html: htmlString}} />
    )
}
```

(b): Another way is use ref and assign ref.current to html string that we get from server

```
const Component = (html) => {
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current) {
            ref.current.innerHTML = html
        }
    }, [html])
}
return (
    <div ref={ref}>
    </div>
)
```