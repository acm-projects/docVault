import React from 'react'
import CustomBtnId from "@/components/ui/customBtnId";
import Link from "next/link";

const detect = () => {
    return (
        <div className="text-darkblue text-lg p-4 flex flex-col justify-center items-center space-y-4 text-center">
            <div className="text-lg font-semibold py-4">
                File Detected
            </div>
            <p className='text-md'>We detected you downloaded a file. Do you want to save it in docVault?</p>
            <div className="flex justify-center px-8 py-8 space-x-4">
                    <CustomBtnId
                        type="submit"
                        title="Yes"
                        variant="btn_red"
                        id = "yes"
                    />
                <Link href = "index.html">
                    <CustomBtnId
                        type="submit"
                        title="No"
                        variant="btn_red"
                        id = "no"
                    />
                </Link>
            </div>
            <script src="detect.js"></script>
        </div>
    )
}

export default detect