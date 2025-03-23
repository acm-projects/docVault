import React from 'react'
import CustomBtnId from "@/components/ui/customBtnId";
import Link from "next/link";
import Script from 'next/script'

const detect = () => {
    const handle = () => {
        console.log("hello");
    };
    return (
        <div className="text-darkblue text-lg py-4 flex flex-col justify-center items-center space-y-4">
            <div className="text-2xl font-semibold py-4">
                File Detected
            </div>
            We detected you downloaded a file. Do you want to save it in docVault?
            <div className="flex justify-center px-8 py-8 space-x-4">
                <Link href="success.html">
                    <CustomBtnId
                        type="submit"
                        title="Yes"
                        variant="btn_red"
                        id = "yes"
                    />
                </Link>
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