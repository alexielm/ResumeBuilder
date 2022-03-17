export function ViewSwitch(props) {

    //console.log(props.children);

    return <>{
        props.children.filter(child => {
            return child.props.case === props.value;
        //    switch (child.type.name) {
        //        case "ViewCase": return child.props.case === props.value;
        //        case "Then": return props.value;
        //        case "Else": return !props.value;
        //        default: return false;
        //    }
        })
    }</>;
}

export function ViewCase(props) {
    return props.children;
}

export function Then(props) {
    return props.children;
}

export function Else(props) {
    return props.children;
}