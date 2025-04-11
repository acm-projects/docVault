import React from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

const success = () => {
    return (
        <div className="text-darkblue text-lg py-4 flex flex-col justify-center items-center text-center">
            <div className="text-2xl font-semibold py-4">
            Saved!
            </div>
                Your document has been successfully saved and categorized. You can view it below.
            <div className="flex justify-center px-8 py-8 space-x-4">
                    <CustomBtn 
                        type="submit"
                        title="View File"
                        variant="btn_red"
                    />
            </div>
        </div>
    )
}

export default success