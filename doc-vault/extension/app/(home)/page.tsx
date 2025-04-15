import CustomBtn from '@/components/ui/customBtn'
import Link from 'next/link'
import React from 'react'

const main = () => {
    return (
        <div className="text-darkblue text-lg p-4 flex flex-col justify-center items-center space-y-2">
            <div className="text-lg font-semibold py-4">
                Welcome to docVault!
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
        </div>
    )
}

export default main