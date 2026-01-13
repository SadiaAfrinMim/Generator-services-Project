interface ActivityCardProps {
  name: string
  description: string
  time: string
  avatar: string
}

export default function ActivityCard({ name, description, time, avatar }: ActivityCardProps) {
  return (
    <div className="flex gap-4 p-3 rounded-lg hover:bg-sky-50 transition-colors">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}
