import { CircularProgress } from "@mui/joy";

export default function LoadingProfile() {
    return <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Loading Profile...</h1>
        <CircularProgress variant={"plain"} color="neutral" size={"md"} />
    </div>
}