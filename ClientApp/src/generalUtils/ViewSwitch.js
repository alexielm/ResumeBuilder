export function ViewSwitch({ value, children }) {

    return <>{
        children.filter(child => {
            switch (child.type.prototype) {
                case ViewCase.prototype: return child.props.case === value;
                case Then.prototype: return value;
                case Else.prototype: return !value;
                default: return false;
            }
        })
    }</>;
}

export function ViewCase({ children }) { return children; }

export function Then({ children }) { return children; }

export function Else({ children }) { return children; }