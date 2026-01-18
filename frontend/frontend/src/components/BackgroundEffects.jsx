const BackgroundEffects = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

            {/* 🌞 LIGHT MODE BACKGROUND */}
            <div className="absolute inset-0 dark:hidden
        bg-gradient-to-br from-white via-purple-50 to-pink-50" />

            {/* 🌙 DARK MODE BACKGROUND */}
            <div className="hidden dark:block">

                {/* Top-left glow */}
                <div className="absolute -top-40 -left-40 w-[700px] h-[700px]
          bg-purple-600/20 rounded-full blur-[180px]" />

                {/* Right glow */}
                <div className="absolute top-1/3 right-0 w-[600px] h-[600px]
          bg-pink-500/20 rounded-full blur-[160px]" />

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2
          w-[900px] h-[360px] bg-purple-500/10 blur-[160px]" />

                {/* Vignette */}
                <div className="absolute inset-0
          bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

        </div>
    )
}

export default BackgroundEffects;
