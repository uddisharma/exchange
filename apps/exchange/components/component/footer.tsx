
import Link from "next/link"

export function Footer() {
  return (
    <footer className=" p-6 md:p-8 w-full bg-[#0e0f14] text-white">
      <div className="container max-w-7xl flex items-center justify-between">
        <p className="text-sm text-muted-foreground">&copy; 2024 Acme Inc. All rights reserved.</p>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          acme.com
        </Link>
      </div>
    </footer>
  )
}
