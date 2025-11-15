import { ReactElement } from "react";
import { Route, RouteProps } from "react-router-dom";
import Loader from "./Loader/Loader";

// FIXME: Currently does not function as intended - if there is no idiomatic way to check a componenent's current content state, revert to only using loader conditionals within layout components

const ComponentWithLoader = (props: { component: ReactElement | null }): ReactElement => {
    return (
            props.component !== null ? <>{props.component.props}</> : <Loader/>
    )
}

export default ComponentWithLoader;