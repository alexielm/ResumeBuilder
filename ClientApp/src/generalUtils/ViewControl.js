export function ViewControl(props) {

    if (!props.visible) {
        return null;
    }

    return <>{props.children}</>;
}