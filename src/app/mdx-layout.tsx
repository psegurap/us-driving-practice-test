export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return <div className="prose max-w-none dark:prose-invert">{children}</div>
}