export default function MessagesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-12 text-center">
        <p className="text-[var(--text-muted)] font-medium">No messages yet</p>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Messages with referrers will appear here once your requests are accepted.
        </p>
      </div>
    </div>
  );
}
