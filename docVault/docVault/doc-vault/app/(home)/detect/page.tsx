import React from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

const detect = () => {
    return (
        <div className="text-darkblue text-lg py-4 flex flex-col justify-center items-center space-y-4">
            <div className="text-2xl font-semibold py-4">
                File Detected
            </div>
            We detected you downloaded a file. Do you want to save it in docVault?
            <div className="flex justify-center px-8 py-8 space-x-4">
                <Link href = "success.html">
                    <CustomBtn 
                        type="submit"
                        title="Yes"
                        variant="btn_red"
                    />
                </Link>
                <Link href = "index.html">
                    <CustomBtn 
                        type="submit"
                        title="No"
                        variant="btn_red"
                    />
                </Link>
            </div>
        </div>
    )
}

export default detect