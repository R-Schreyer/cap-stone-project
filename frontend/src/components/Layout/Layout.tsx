import Navigation from "../Navigation/Navigation.tsx";
import Header from "../Header/Header.tsx";
import {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode
}
export default function Layout(props: Readonly<LayoutProps>) {
    return(
        <>
            <Header/>
            <Navigation/>
            <div className="container">
                <main>
                    {props.children}
                </main>

            </div>

        </>
    )
}