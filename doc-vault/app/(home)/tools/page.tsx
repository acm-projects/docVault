import React from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

const success = () => {
    return (
        <div className="text-darkblue text-lg py-4 flex flex-col justify-center items-center space-y-2">
            <div className="text-2xl font-semibold py-4">
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
            <CustomBtn 
                        type="submit"
                        title="Settings"
                        variant="btn_red"
                    />
            </div>
        </div>
    )
}

export default success