interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border-border rounded-xl border border-dashed p-8 text-center">
      <p className="text-h3">{title}</p>
      {description && (
        <p className="text-small text-muted mx-auto mt-2 max-w-md">
          {description}
        </p>
      )}
    </div>
  )
}
