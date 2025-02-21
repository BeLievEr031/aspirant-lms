import { useUser } from "@clerk/clerk-react"
import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function RootLayout() {
    const { isSignedIn, isLoaded } = useUser()
    const navigate = useNavigate();
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/auth")
        } else {
            navigate("/dashboard")
        }

    }, [isLoaded])

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    )
}

export default RootLayout