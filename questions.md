1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

Ans: In general, a Component in React accpets props from its Parent and use those props to do some operations or validations or checkings to render output conditoinally. 

There is concept of "state" that a Component can maintain but it is local or specific to that Component. Either the change in props or state makes a Component re-render and also when a prop or state in Parent Compoent changes then Parent Component re-renders and then this makes all the Children components present in that Parent component re-render irrespective whether the child components use the parent props or not. 

Thus to prevent this issue of re-rendering of Children components we make use of PureComponents. Compoents that extend PureComponent, implement shoudlComponentUpdate, and re-redner only when the shallow comparison of prevProps and nextProps is false and re-render is skipped when the shallow comparison is true.

A function or Component is said to be "Pure" if it doesnt interfer with or modify outside contents and for the same inputs it should return the same outputs when called any number of times.

An example where it might break an app :


2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Ans: When a component, which is child to a Parent Component, is deeply nested down and we need to pass in a prop that should be consumed only by such couple of Children components then we can achieve this by :
  a. Pass the prop to every child of the parent component till it reachees the desired component and this creates an issue called "Prop Drilling"
  b. Create a context that acts a Provider of the prop to the Child component and enclose the Children with this Context Provider. Now, only those Child components can Consume the prop value which is passed as a Context value. This avoids unnecessary passage of props across all the child components.

  While using Context helps in preventing Prop Drilling, the Consumers of the context value re-render everytime the Context value change even if they are Pure components, ie., the context values by pass the ShouldComponentUpdate check. This is why context + ShouldComponent might be dangerous. And if the context value is a complex data structure or non primitvie like objects, arrays or functions which are recreated (thus changing their reference for every render and object.is() comparision fails) even if values in them don't change.

  So it is better to lift the state up inside the parent component where the Context Provider  and value are created in.

  3. Describe 3 ways to pass information from a component to its PARENT.

  Ans: Below are the ways to pass information from a component to its PARENT:

  (a): Pass a callback function from Parent to Child and call that callback fuction in child which a value that we want to pass to Parent component

  (b): Use of global state manager like Redux where every component can be connected to a gloabl store that stores the state of entire application. A Child component can dispatch an action using "useDispatch" that inturn calls the reducer with the action type and payload to set or modify a state variable inside the store. Now, parent component can access the state using "useSelector" and then access the required state from it.

  (c): Using Context API where we can pass a callback function or update function along with the context value to the "value" prop of Provider and now Child components consuming the context can call that callback as (context.callback("someValue")) which eventually call the function that can modify or set a value in Parent Context.

  4. Give 2 ways to prevent components from re-rendering.

  Ans: Re-rendering of Components can be prevented by following ways:

  (a): Prevent unneccesary setting of states and maintain state for only those varaibles that are meant to be shown on the UI, otherwise we can make use of refs which can still store the changes but donot cause the re-render. Also pass only necessary props from Parent to Child components, as change in one of the props could also trigger the render even if Child components dont use it . If an application uses the Context API prevent complex values being passed to Consumer components and prevent frequent updates to the context value . Donot use Context API as an alternative to a state management library. Context API will bypass the shouldComponent checks and renders all the components that consume the context.

  (b): Make use of depencies array in the hooks provided by React. useEffect, useMemo, useCallback are the hooks help in prevent in the unnecessary component re-rendering. There is ceveat of using arrays, objects, functions as dependencies of these hooks, as they are recreated every tmime  component renders and change their reference and these hooks make use of Object.is() comparision whether to render or not.

  (c): Create the state as low as possible in the component tree because when the Parent component renders all the Child components will be rendered and this can be prevented by wrapping the pure functional components with useMemo or useCallBack with empty depencies making them to be called and created only once. Remove expensive calculations and business logic as much as possible and make the components presentational.

  5. What is a fragment and why do we need it? Give an example where it might break my app.

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

 


