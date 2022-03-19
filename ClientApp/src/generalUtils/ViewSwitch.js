export function ViewSwitch({ value, children }) {

    return <>{
        children.filter(child => {
            switch (child.type.name) {
                case ViewCase.prototype.constructor.name: return child.props.case === value;
                case Then.prototype.constructor.name: return value;
                case Else.prototype.constructor.name: return !value;
                default: return false;
            }
        })
    }</>;
}

export function ViewCase({ children }) { return children; }

export function Then({ children }) { return children; }

export function Else({ children }) { return children; }