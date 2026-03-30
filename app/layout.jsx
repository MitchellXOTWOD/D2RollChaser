import '@styles/globals.css';
import Navbar from '@components/navbar/Navbar';

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className='html'>
            <head>
                <title>D2 Roll Chaser</title>
            </head>
            <body className='text-center'>
                <main className='app'>
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    )
}

export default RootLayout;