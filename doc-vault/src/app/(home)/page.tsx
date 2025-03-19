import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-darkblue max-container padding-container mt-8">
      <div className="p-4">
        <h1 className="pb-5 w-1/2 text-6xl font-bold text-lighterred">A Secure Digital Document Management Solution</h1>
        <p className="py-5 w-5/12">
          Chrome extension that centralizes critical files like IDs, financial statements, contracts, 
          and medical records. Ensures secure storage, efficient organization, and easy accessibility.
        </p>
        <div className="py-5">
          <Link href="/features">
            <Button className="px-8 py-8 text-md bg-lighterred hover:bg-red hover:font-bold transition-all">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
)
}
