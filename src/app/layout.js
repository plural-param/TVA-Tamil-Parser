import {Roboto} from 'next/font/google'
import Sidebar from "@/app/components/Sidebar";
import {Toaster} from "react-hot-toast";

const inter = Roboto({weight: '400', subsets: ['latin']})

export const metadata = {
    title: 'Tamil Syntactic Parser',
    description: 'Tamil Parser | Parts of Speech | Morphological Analyzer |Syntactic Parser',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Toaster/>
        <Sidebar>{children}</Sidebar>
        </body>
        </html>
    )
}
