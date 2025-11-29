import { useForm } from "react-hook-form"

export default function Updateproductconfig() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    return (
        <>
            <form name="updateproductconfig">
                <input type="text" placeholder="bank account number" />
                <input type="text" placeholder="bank accountholder name" />
                <input type="text" placeholder="bank ifsc code" />

                <select>
                    <option value="upi">upi</option>
                    <option value="card">card</option>
                    <option value="net banking">net banking</option>
                </select>
                <button role="button" type="submit">submit</button>
            </form>
        </>
    )
};