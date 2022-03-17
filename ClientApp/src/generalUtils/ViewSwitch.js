export function ViewSwitch(props) {

    return <>{
        props.children.filter(child => {
            switch (child.type.name) {
                case ViewCase.prototype.constructor.name: return child.props.case === props.value;
                case Then.prototype.constructor.name: return props.value;
                case Else.prototype.constructor.name: return !props.value;
                default: return false;
            }
        })
    }</>;
}

export function ViewCase(props) { return props.children; }

export function Then(props) { return props.children; }

export function Else(props) { return props.children; }