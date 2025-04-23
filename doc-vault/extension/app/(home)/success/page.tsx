import React from 'react'
import CustomBtn from "@/components/ui/customBtn";
import Link from 'next/link';

const success = () => {
    return (
        <div className="text-darkblue text-lg p-4 flex flex-col justify-center items-center text-center">
            <div className="text-lg font-semibold py-4">
                Saved!
            </div>
            <p className='text-md'>Your document has been successfully saved and categorized. You can view it below.</p>
            <div className="flex flex-col py-10 justify-center items-center gap-y-2">
                <Link href="localhost:3000/account">
                    <CustomBtn 
                        type="submit"
                        title="View File"
                        variant="btn_gray"
                    />
                </Link>

                <p>--------- OR ---------</p>
                <Link href="translateSuccess.html">
                    <CustomBtn 
                        type="submit"
                        title="Translate"
                        variant="btn_gray"
                    />
                </Link>
            </div>
        </div>
    )
}

export default success