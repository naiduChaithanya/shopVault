export default function Loader({text="Loading..."}){
    return(
        <div className="flec flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-#f2d9b0 border-t-#c9841e rounded-full animate-spin"/>
            <p className="text-sm text-#dc9f42 font-medium">{text}</p>
        </div>
    )
}