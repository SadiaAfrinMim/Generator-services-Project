import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  color: "sky" | "cyan" | "blue" | "purple"
}

const colorMap = {
  sky: "from-sky-600 to-sky-500 text-sky-600 bg-sky-100",
  cyan: "from-cyan-600 to-cyan-500 text-cyan-600 bg-cyan-100",
  blue: "from-blue-600 to-blue-500 text-blue-600 bg-blue-100",
  purple: "from-purple-600 to-purple-500 text-purple-600 bg-purple-100",
}

export default function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  const [bgColor, textColor] = colorMap[color].split(" ")

  return (
    <Card className="border-sky-100 shadow-lg shadow-sky-100/20 hover:shadow-sky-100/30 transition-all hover:scale-105">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold text-foreground mb-4">{value}</p>
            <div className="flex items-center gap-1">
              {trend === "up" ? (
                <>
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-sm font-semibold text-green-600">{change}</span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} className="text-red-600" />
                  <span className="text-sm font-semibold text-red-600">{change}</span>
                </>
              )}
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </div>
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-2xl", colorMap[color])}>
            <Icon size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
