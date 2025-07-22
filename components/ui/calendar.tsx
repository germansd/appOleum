"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = {
  className?: string
  selected?: Date
  onSelect?: (date: Date) => void
  mode?: "single"
}

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

function Calendar({ className, selected, onSelect, ...props }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const selectDate = (day: number) => {
    const selectedDate = new Date(year, month, day)
    onSelect?.(selectedDate)
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    return selected.getDate() === day && selected.getMonth() === month && selected.getFullYear() === year
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  // Generar días del calendario
  const calendarDays = []

  // Días vacíos del mes anterior
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null)
  }

  // Días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className={cn("p-3 bg-white border rounded-lg shadow-sm", className)}>
      {/* Header con navegación */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={previousMonth} className="h-7 w-7 p-0 bg-transparent">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-sm font-medium">
          {MONTHS[month]} {year}
        </h2>

        <Button variant="outline" size="sm" onClick={nextMonth} className="h-7 w-7 p-0 bg-transparent">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Días del calendario */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div key={index} className="h-8 flex items-center justify-center">
            {day && (
              <button
                onClick={() => selectDate(day)}
                className={cn(
                  "h-8 w-8 rounded-md text-sm font-normal transition-colors hover:bg-gray-100",
                  isSelected(day) && "bg-[#708238] text-white hover:bg-[#5a6b2d]",
                  isToday(day) && !isSelected(day) && "bg-gray-100 font-medium",
                )}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
