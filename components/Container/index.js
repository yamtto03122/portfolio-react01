
export default function Container({ children, rest }) {
    return (
        <div className={` w-full `} {...rest}>
            {children}
        </div>
    )
}
