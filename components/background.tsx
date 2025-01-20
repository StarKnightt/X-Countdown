export function Background() {
    return (
      <>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px)] bg-[size:60px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:60px] dark:bg-[linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-20 blur-3xl dark:opacity-30" />
      </>
    )
  }