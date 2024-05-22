
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

function Select(props: SelectProps) {
    return (
        <select {...props} className="bg-gray-300 w-full rounded-md placeholder-black py-2 px-4">
            <option value="__Select-Category__" disabled> __Select-Category__</option>
            <option value="no fiction">no fiction</option>
            <option value="fiction">fiction</option>
            <option value="drama">drama</option>
        </select>
    );
}

export default Select;