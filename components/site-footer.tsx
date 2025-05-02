export function SiteFooter() {
  return (
    <footer className="border-t py-4">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Miles Network Monitor. All rights reserved.
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">Version 1.0.0</p>
      </div>
    </footer>
  )
}
