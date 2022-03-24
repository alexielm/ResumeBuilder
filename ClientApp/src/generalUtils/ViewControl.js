const ViewerControl = ({ visible, children }) => {

    if (!visible) {
        return null;
    }

    return <>{children}</>;
}

export default ViewerControl;
