const Wrapper = ({ children, className, ...props }) => {
    return (
        <div className={`wrapper ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Wrapper;
