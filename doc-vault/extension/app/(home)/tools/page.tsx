import React from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

const success = () => {
    return (
        <div className="text-darkblue text-lg p-4 flex flex-col justify-center items-center space-y-2">
            <div className="text-lg font-semibold py-4">
                Tools
            </div>
            <CustomBtn 
                        type="submit"
                        title="Settings"
                        variant="btn_gray"
                    />
            <CustomBtn 
                        type="submit"
                        title="Translate"
                        variant="btn_gray"
                    />
            <CustomBtn 
                        type="submit"
                        title="Summarize"
                        variant="btn_gray"
                    />
            <div className='py-3'>
            <Link href='index.html'>
            <CustomBtn 
                        type="submit"
                        title="Back"
                        variant="btn_red"
                    />
            </Link>
            </div>
        </div>
    )
}

export default success