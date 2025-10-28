export default function Loader() {
    return (
        <>
            <div className="animate-spin inline-block size-4 border-3 font-light border-current border-t-transparent text-black rounded-full " role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </>
    )
}