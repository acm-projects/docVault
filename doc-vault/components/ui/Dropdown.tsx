import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Dropdown() {
  return (
    <Select>
      <SelectTrigger className="w-full bg-white text-gray-400">
        <SelectValue placeholder="Select from below" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="personal">Personal</SelectItem>
        <SelectItem value="education">Education</SelectItem>
        <SelectItem value="business">Business</SelectItem>
      </SelectContent>
    </Select>
  )
}
