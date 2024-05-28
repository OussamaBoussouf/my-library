import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function(props: SelectProps, ref) {
    return (
        <select  ref={ref} {...props} className="bg-gray-300 w-full rounded-md placeholder-black py-2 px-4">
            <option value="" disabled> __Select-Category__</option>
            <option value="non-fiction">non-fiction</option>
            <option value="fiction">fiction</option>
            <option value="drama">drama</option>
        </select>
    );
})

export default Select;